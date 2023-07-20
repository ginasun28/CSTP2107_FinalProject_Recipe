import {Card, CardContent, CardMedia, IconButton, Link, Rating, Typography} from '@mui/material';
import {BookmarkBorder, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import api from "@/api/index.js";
import {useEffect, useState} from "react";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import Box from "@mui/material/Box";

const ProductCard = ({product, isUser, load}) => {

    const [user, setUser] = useLocalStorage('user', null);

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        if (user) {
            try {
                const res = await api.getUserCollections(user.id);
                setCollections(res.collections);
            } catch (error) {
                console.error('Failed to get user collections:', error);
            }
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

    // Function that handles confirming favorites
    const handleConfirmFavorite = async () => {
        try {
            // Add recipe to favorites
            let {message} = await api.addFavorite({
                userId: user.id,
                collectionId: selectedCollection,
                recipeId: product.id
            });
            // close the popup
            handleCloseModal();
            // Prompt the user to save successfully
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
                // After the creation is successful, reacquire the user's favorites list and refresh the favorites list
                fetchCollections();
            })
            .catch((error) => {
                console.error('Error creating collection:', error);
            });
    };
    const handleFavorite = () => {
        if (!user) {
            navigate("/signin")
        }
        api.checkFavorite({
            userId: user.id,
            recipeId: product.id
        }).then(async res => {
            if (res.isFavorite) {
                await api.removeFavorite(product.id, user.id)
            } else {
                setOpenModal(true);
            }
        })
    };
    const handleDeleteRecipe = async () => {
        try {
            // Call the api to delete the recipe
            await api.deleteRecipes(product.id);
            load()
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('Failed to delete recipe. Please try again later.');
        }
    };

    const handleEditRecipe = () => {
        // 编辑菜谱的逻辑，跳转到编辑菜谱的页面，需要根据具体的路由来实现
        //The logic of editing recipes, jumping to the page of editing recipes, needs to be implemented according to specific routes
        navigate(`/createRecipe?id=${product.id}`);
    };

    return (<>
            <Card style={{position: "relative", height: "420px"}}>
                <CardMedia
                    component="img"
                    alt={product.recipeName}
                    height="200"
                    image={product.image}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {product.recipeName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Type: {product.type}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Average Rating: <Rating
                        name="user-rating"
                        readOnly
                        value={product.averageRating}
                    />
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Cooking Time: {product.cookingTime} minutes
                    </Typography>
                    <div style={{
                        width: '200px', // Set a fixed width container
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Display up to four lines of text
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        <Typography variant="body2" color="textSecondary">
                            {product.instructions}
                        </Typography>
                    </div>
                    <Typography variant="subtitle1" color="textSecondary">
                        Author: {product.user?.username}
                    </Typography>
                    <Link onClick={() => {
                        navigate(`/recipes/${product.id}`)
                    }} style={{cursor: "pointer"}}>
                        Read more
                    </Link>
                    <IconButton
                        color="primary"
                        onClick={handleFavorite}
                        style={{position: 'absolute', top: '10px', right: '10px'}}
                    >
                        <BookmarkBorder/>
                    </IconButton>
                </CardContent>
                {isUser && (
                    <Box>
                        <IconButton
                            color="primary"
                            onClick={handleDeleteRecipe}
                            style={{position: 'absolute', bottom: '10px', right: '50px'}}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={handleEditRecipe}
                            style={{position: 'absolute', bottom: '10px', right: '10px'}}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Box>
                )}
            </Card>
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

export default ProductCard;
