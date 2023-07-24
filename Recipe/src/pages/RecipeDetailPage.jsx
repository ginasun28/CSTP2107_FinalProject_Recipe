import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Grid, Paper, Rating, TextField, Typography} from '@mui/material';
import api from "@/api/index.js";
import RecipeDetailTable from "@/components/RecipeDetailTable.jsx";
import Navbar from "@/components/Navbar";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Comment from "@/components/Comment.jsx"

const RecipeDetailPage = () => {
    const {recipeId} = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    const [comments, setComments] = useState([]);
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    useEffect(() => {
        load()
    }, [recipeId]);

    const load = () => {
        Promise.all([
            api.getRecipesById(recipeId),
            api.getCommentsByRecipeId(recipeId),
            api.getUserRatingByRecipeId(recipeId, user?.id),
        ]).then(([recipeRes, commentsRes, ratingRes]) => {
            setRecipeData(recipeRes.recipe);
            setComments(commentsRes.comments);
            setUserRating(ratingRes.userRating.rating)
        });
    }
    const handleRatingChange = (event, newValue) => {
        setUserRating(newValue);
    };
    const handleReply = (commentId) => {
        setReplyToCommentId(commentId);
    };
    const handleCommentChange = (event) => {
        setUserComment(event.target.value);
    };

    const handleRatingSubmit = async () => {
        if (!user) {
            navigate("/signin")
        }
        try {
            await api.addRating({
                userId: user.id,
                recipeId: recipeData.id,
                rating: userRating,
            });
            alert("success!");
        } catch (error) {
            console.error('Failed to submit rating:', error);
            alert('Failed to submit rating. Please try again later.');
        }
    };

    const handleCommentSubmit = async (parentId = null, users = null, userReply = null) => {
        if (!user) {
            navigate("/signin")
        }
        try {
            const newComment = {
                userId: user.id,
                recipeId: recipeData.id,
                content: userReply ? userReply : userComment,
                parentCommentId: parentId, // Add parentCommentId field if it exists
                target: users
            };

            await api.addComment(newComment);

            alert("success!");
            load()
            setUserComment('');
        } catch (error) {
            console.error('Failed to submit comment:', error);
            alert('Failed to submit comment. Please try again later.');
        }
    };


    const fetchCollections = async () => {
        try {
            const res = await api.getUserCollections(user.id);
            setCollections(res.collections);
        } catch (error) {
            console.error('Failed to get user collections:', error);
        }
    };

    // Function to handle closing the popup window
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Function to handle selecting favorites
    const handleSelectCollection = (collectionId) => {
        setSelectedCollection(collectionId);
    };

    //Function that handles confirming favorites
    const handleConfirmFavorite = async () => {
        try {
            // Add recipe to favorites
            let {message} = await api.addFavorite({
                userId: user.id,
                collectionId: selectedCollection,
                recipeId: recipeData.id
            });
            // close the popup
            handleCloseModal();
            //Prompt the user to save successfully
            alert(message);
        } catch (error) {
            console.error('Failed to add favorite:', error);
            alert('Failed to add favorite. Please try again later.');
        }
    };
    const handleCreateCollection = (newCollectionName) => {
        // Submits the new favorite name to the backend for creation
        api.createCollection({userId: user.id, name: newCollectionName})
            .then(() => {
                //After the creation is successful, reacquire the user's favorites list and refresh the favorites list
                fetchCollections();
            })
            .catch((error) => {
                console.error('Error creating collection:', error);
            });
    };

    const handleFavoriteClick = () => {
        if (!user) {
            navigate("/signin")
        }
        api.checkFavorite({
            userId: user.id,
            recipeId: recipeData.id
        }).then(async res => {
            if (res.isFavorite) {
                await api.removeFavorite(recipeData.id, user.id)
            } else {
                setOpenModal(true);
            }
        })
        fetchCollections();
        setOpenModal(true);
    };

    if (!recipeData) {
        return <Typography>Loading...</Typography>;
    }

    const {image, recipeName, type, cookingTime, servings, cuisine, ingredients, instructions,} = recipeData;

    return (<>
            <Navbar/>
            <Box m={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <img src={image} alt={recipeName} style={{width: '100%', height: 'auto'}}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper>
                            <Box sx={{display: 'flex', alignItems: 'center'}}
                                 onClick={() => {
                                     navigate('/history?id=' + recipeData.user.id)
                                 }}>
                                <img src={recipeData.user?.avatar} alt={recipeData.user?.username}
                                     style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px'}}/>
                                <Typography variant="h5">{recipeData.user?.username}</Typography>
                            </Box>
                            <Typography variant="subtitle1">{recipeName}</Typography>
                            <Typography variant="subtitle1">Type: {type}</Typography>
                            <Typography variant="subtitle1">Cooking Time: {cookingTime} minutes</Typography>
                            <Typography variant="subtitle1">Servings: {servings}</Typography>
                            <Typography variant="subtitle1">Cuisine: {cuisine}</Typography>
                            <RecipeDetailTable ingredients={ingredients}/>
                            <Typography variant="h6">Instructions:</Typography>
                            <Typography>{instructions}</Typography>
                            <Button variant="contained" onClick={handleFavoriteClick}>Favorite</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant="h6">Rating：</Typography>
                    <Rating
                        name="user-rating"
                        value={userRating}
                        onChange={handleRatingChange}
                    />
                    <Button variant="contained" onClick={handleRatingSubmit}>
                        submit Rating
                    </Button>
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Comments:</Typography>
                    <TextField
                        label="Your comment"
                        multiline
                        rows={4}
                        value={userComment}
                        onChange={handleCommentChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={() => handleCommentSubmit()}>
                        submit Comment
                    </Button>

                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} onReply={handleReply}
                                 onConfirmReply={handleCommentSubmit}/>
                    ))}
                </Box>
            </Box>
            <FavoriteModal
                open={openModal}
                onClose={handleCloseModal}
                collections={collections}
                selectedCollection={selectedCollection}
                onCollectionSelect={handleSelectCollection}
                onConfirmFavorite={handleConfirmFavorite}
                onCreateCollection={handleCreateCollection}
            />
        </>
    );
};

export default RecipeDetailPage;
