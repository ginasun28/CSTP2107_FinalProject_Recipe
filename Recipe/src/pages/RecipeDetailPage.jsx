import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Grid, IconButton, Paper, Rating, TextField, Typography} from '@mui/material';
import api from "@/api/index.js";
import RecipeDetailTable from "@/components/RecipeDetailTable.jsx";
import Navbar from "@/components/Navbar";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Comment from "@/components/Comment.jsx"
import '../components/styles/RecipeDetailsPage.css'

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

    const [averageRating, setAverageRating] = useState(0);

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
            setAverageRating(recipeRes.recipe.averageRating)
        });
    }
    console.log('recipe data:', recipeData)
    console.log('avg rating: ', averageRating)


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

    const {image, recipeName, type, cookingTime, servings, cuisine, ingredients, instructions} = recipeData;
    // console.log('rating: ', averageRating)

    return (<>
            <Navbar/>
            <div className='detail-structure-resize' style={{width: '100%'}}>
                <div className='recipe-pic-resize'>
                    <IconButton onClick={() => navigate(-1)} 
                            sx={{'&:hover': { borderRadius: '50%'}}} 
                            style={{ position: 'absolute', margin: '10px 20px 0px 20px', backgroundColor: '#FBCF5F'}}
                            disableRipple
                    >
                        <img src="../src/assets/icons8-back-96 (1).png" alt="Back btn" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                    </IconButton>
                    {/* <Link to={'/recipes'}>
                        <img src="../src/assets/icons8-back-96 (1).png" alt="Back btn" style={{width: '50px', height: '50px', position: 'absolute', margin: '10px 20px 0px 20px'}}/>
                    </Link> */}
                    <img src={image} alt={recipeName} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                    
                </div>
                
                <div className='recipe-info-resize scroll-side' style={{display: 'flex', flexDirection: 'column'}}>

                    <div className='poppins-font avatar-position-change' style={{ paddingTop: '20px'}}>
                            <div className='recipe-name-edit'>
                                {/* <h3 className='recipe-txt'>Recipe Name</h3> */}
                                <h2 className='poppins-font txt-center'>{recipeName}</h2>
                            </div>

                            <Box sx={{display: 'flex', alignItems: 'center', paddingRight: '30px'}}
                                 onClick={() => {
                                     navigate('/history?id=' + recipeData.user.id)
                                 }}>
                                <img src={recipeData.user?.avatar} alt={recipeData.user?.username}
                                     style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}}/>
                                <Typography variant="h5" style={{fontSize: '1.25rem'}}>{recipeData.user?.username}</Typography>
                            </Box>
                            
                    </div>

                    <div className='average-rate-position' style={{display: 'flex', alignItems: 'center', marginLeft: '30px', paddingTop: '5px'}}>
                        {/* <Typography variant="h6" className='poppins-font' style={{fontSize: '18px', marginRight: '10px', fontWeight: '700'}}>
                            Average rate 
                        </Typography> */}

                        <Rating
                            name="user-rating"
                            value={averageRating}
                            // onChange={handleRatingChange}
                            readOnly
                        />
                        {/* <Button variant="outlined" onClick={handleRatingSubmit} style={{marginLeft: '10px', border: '2px solid #064635'}}>
                            <h3 className='poppins-font'>Save</h3>
                        </Button> */}
                    </div>

                    <div className='poppins-font recipe-info-position' style={{display: 'flex', fontSize: '14px', justifyContent: 'center', paddingTop: '20px'}}>
                        

                        <div className='preparation-style'>
                            <h3 className='txt-center'>Servings</h3>
                            <h4 className='body-font txt-center'>{servings}</h4>
                        </div>

                        <div className='preparation-style'>
                            <h3 className='txt-center'>Cooking time</h3>
                            <h4 className='body-font txt-center'>{cookingTime} minutes</h4>
                        </div>

                        <div className='preparation-style'>
                            <h3 className='txt-center'>Cuisine</h3>
                            <h4 className='body-font txt-center'>{cuisine} {type}</h4>
                        </div>
                    </div>

                    <div className='ingredient-table-position' style={{ paddingTop: '20px'}}>
                        <h3 className='poppins-font'>INGREDIENTS</h3>
                        <RecipeDetailTable ingredients={ingredients}/>
                    </div>
                    
                    <div className='instructions-position' style={{ paddingTop: '20px'}}>
                        <h3 className='poppins-font'>INSTRUCTIONS</h3>
                        <h4 className='body-font instructions-body-position'>
                            {instructions}
                        </h4>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '20px', paddingTop: '20px', justifyContent: 'space-between'}}>
                        <div className='rate-recipe-resize' style={{ alignItems: 'center'}}>
                            <Typography variant="h6" className='poppins-font' style={{fontSize: '18px', marginRight: '10px', fontWeight: '700'}}>
                                Rate the recipe: 
                            </Typography>

                            <Rating
                                name="user-rating"
                                value={userRating}
                                onChange={handleRatingChange}
                            />
                            <Button variant="outlined" onClick={handleRatingSubmit} className='recipe-save-btn' style={{ border: '2px solid #064635'}}>
                                <h3 className='poppins-font'>Save</h3>
                            </Button>
                        </div>
                        
                        <div style={{marginLeft: '30px', display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                            <Button onClick={handleFavoriteClick} sx={{'&:hover': {backgroundColor: 'transparent'}}} disableRipple>
                                <img src="../src/assets/icons8-save-96.png" alt="Save icon" style={{width: '40px', height: '40px', borderRadius: '15px'}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{ paddingTop: '20px'}}>
                        <div className='comments-position-change'> 
                            <Typography variant="h6" className='poppins-font' style={{fontWeight: '800'}}>
                                COMMENTS
                            </Typography>

                            <TextField
                                label="Your comment"
                                multiline
                                rows={4}
                                value={userComment}
                                onChange={handleCommentChange}
                                // fullWidth
                                margin="normal"
                                variant="outlined"
                                style={{width: '90%'}}
                                InputProps={{style: {border: '2px solid #064635', borderRadius: '10px'}}}
                            />

                            <div style={{display: 'flex', justifyContent: 'flex-end', width: '90%'}}>
                                <Button variant="contained" onClick={() => handleCommentSubmit()} style={{backgroundColor: '#FF7F3F', borderRadius: '10px'}}>
                                    submit Comment
                                </Button>
                            </div>
                        </div>

                        {comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} onReply={handleReply}
                                    onConfirmReply={handleCommentSubmit}/>
                        ))}
                    </div>
                        
                    <FavoriteModal
                        open={openModal}
                        onClose={handleCloseModal}
                        collections={collections}
                        selectedCollection={selectedCollection}
                        onCollectionSelect={handleSelectCollection}
                        onConfirmFavorite={handleConfirmFavorite}
                        onCreateCollection={handleCreateCollection}
                    />
                </div>
            </div>
        </>
    );
};

export default RecipeDetailPage;