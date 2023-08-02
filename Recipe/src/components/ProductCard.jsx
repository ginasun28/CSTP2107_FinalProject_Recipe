/* eslint-disable react/prop-types */
import {
    Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Link,
	Rating,
	Typography,
} from "@mui/material";
import {
	BookmarkBorder,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from "@mui/icons-material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import api from "@/api/index.js";
import {useEffect, useState} from "react";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import Box from "@mui/material/Box";

import './styles/RecentRecipe.css'

const ProductCard = ({product, isUser, load}) => {
	const [user, setUser] = useLocalStorage("user", null);

	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");
	const [isFavorite, setIsFavorite] = useState(false); // New state for favorite status
	const [favoriteIcon, setFavoriteIcon] = useState(
		"/src/assets/icons8-save-96.png"
	); // New state for favorite icon

	useEffect(() => {
		fetchCollections();
		checkInitialFavoriteStatus();
	}, []);

	const fetchCollections = async () => {
		if (user) {
			try {
				const res = await api.getUserCollections(user.id);
				setCollections(res.collections);
			} catch (error) {
				console.error("Failed to get user collections:", error);
			}
		}
	};

	// New function to check the initial favorite status from localStorage
	const checkInitialFavoriteStatus = () => {
		const favoriteStatusFromLocalStorage = localStorage.getItem(
			`favorite_${product.id}`
		);
		if (favoriteStatusFromLocalStorage !== null) {
			setIsFavorite(favoriteStatusFromLocalStorage === "true");
			setFavoriteIcon(
				favoriteStatusFromLocalStorage === "true"
					? "/src/assets/icons8-bookmark-96.png"
					: "/src/assets/icons8-save-96.png"
			);
		}
	};

	// Function to handle closing the popup window
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	// Function to handle selecting favorites
	const handleSelectCollection = collectionId => {
		setSelectedCollection(collectionId);
	};

	// Function that handles confirming favorites
	const handleConfirmFavorite = async () => {
		try {
			// Add recipe to favorites
			let {message} = await api.addFavorite({
				userId: user.id,
				collectionId: selectedCollection,
				recipeId: product.id,
			});
			// close the popup
			handleCloseModal();
			// Prompt the user to save successfully
			alert(message);
		} catch (error) {
			console.error("Failed to add favorite:", error);
			alert("Failed to add favorite. Please try again later.");
		}
	};
	const handleCreateCollection = newCollectionName => {
		// Submits the new favorite name to the backend for creation
		api
			.createCollection({userId: user.id, name: newCollectionName})
			.then(() => {
				// After the creation is successful, reacquire the user's favorites list and refresh the favorites list
				fetchCollections();
			})
			.catch(error => {
				console.error("Error creating collection:", error);
			});
	};
    
	const handleFavorite = async () => {
		// if (!user) {
		// 	navigate("/signin");
		// }
		// api
		// 	.checkFavorite({
		// 		userId: user.id,
		// 		recipeId: product.id,
		// 	})
		// 	.then(async res => {
		// 		if (res.isFavorite) {
		// 			await api.removeFavorite(product.id, user.id);
		// 		} else {
		// 			setOpenModal(true);
		// 		}
		// 	});
        if (!user) {
            navigate('/signin');
          } else {
            try {
              const res = await api.checkFavorite({
                userId: user.id,
                recipeId: product.id,
              });
              if (res.isFavorite) {
                // If the recipe is a favorite, remove it from favorites
                await api.removeFavorite(product.id, user.id);
              } else {
                // If the recipe is not a favorite, open the FavoriteModal for selecting the collection to save
                setOpenModal(true);
              }
      
              // Update the isFavorite status and favoriteIcon state
              setIsFavorite(!res.isFavorite);
      
              // Update the IconButton image based on the isFavorite status
              setFavoriteIcon(
                !res.isFavorite
                  ? '/src/assets/icons8-bookmark-96.png'
                  : '/src/assets/icons8-save-96.png'
              );
      
              // Store the favorite status in localStorage
              localStorage.setItem(`favorite_${product.id}`, !res.isFavorite);
            } catch (error) {
              console.error('Failed to add favorite:', error);
              alert('Failed to add favorite. Please try again later.');
            }
          }
	};
	const handleDeleteRecipe = async () => {
		try {
			// Call the api to delete the recipe
			await api.deleteRecipes(product.id);
			load();
		} catch (error) {
			console.error("Error deleting recipe:", error);
			alert("Failed to delete recipe. Please try again later.");
		}
	};

	const handleEditRecipe = () => {
		// 编辑菜谱的逻辑，跳转到编辑菜谱的页面，需要根据具体的路由来实现
		//The logic of editing recipes, jumping to the page of editing recipes, needs to be implemented according to specific routes
		navigate(`/create_recipe?id=${product.id}`);
	};

    return (<>
            <Card sx={{maxWidth: 300, height: '100%', borderRadius: '15px', backgroundColor: 'rgba(255, 217, 102, 0.50)'}}>
                <CardHeader
                    title={
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div className='opensans-font' style={{color: '#E38B29', fontSize: '16px'}}>
                                {product.recipeName}
                            </div>

                            {isUser && (
                                <Box>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <IconButton
                                            color="primary"
                                            onClick={handleDeleteRecipe}
                                            style={{color: '#EA5C2B'}}
                                            sx={{'&:hover': {backgroundColor: '#FBCF5F', borderRadius: '50%'}}}
                                        >
                                            <DeleteIcon sx={{fontSize: 25}}/>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={handleEditRecipe}
                                            style={{color: '#064635'}}
                                            sx={{'&:hover': {backgroundColor: '#FBCF5F', borderRadius: '50%'}}}
                                        >
                                            <EditIcon sx={{fontSize: 25}}/>
                                        </IconButton>
                                        <IconButton
                                            onClick={handleFavorite}
                                            style={{color: '#E38B29', padding: '8px'}}
                                            sx={{'&:hover': {backgroundColor: '#FBCF5F', borderRadius: '50%'}}}
                                        >
                                            <img src={favoriteIcon} alt="" style={{width: '25px', height: '25px'}}/>
                                            {/* <BookmarkBorder sx={{fontSize: 25}}/> */}
                                        </IconButton>
                                    </div>
                                </Box>
                            )}
                            
                        </div>
                    }
                    subheader={
                        <>
                            <Typography variant="subtitle1" color="textSecondary">
                                <Rating
                                name="user-rating"
                                readOnly
                                value={product.averageRating}
                                style={{fontSize: '1.25rem'}}
                            />
                            </Typography>
                            <div style={{color: '#CCC7C7', fontWeight: '800'}}>
                                {product.user?.username}
                            </div>
                        </>
                        
                    }
                />
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CardMedia
                        component="img"
                        alt={product.recipeName}
                        image={product.image}
                        style={{width: '280px', height: '170px', borderRadius: '20px'}}
                    />
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <h3 style={{
                            position: 'absolute', 
                            backgroundColor: '#FDF5CA', 
                            color: '#E38B29',
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                            padding: '8px 18px',
                            borderRadius: '20px'
                        }}>
                            {product.type}
                        </h3>
                    </div>

                    <CardContent style={{paddingBottom: '0px', marginTop: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <img src="src/assets/icons8-time-96.png" alt="Time icon" style={{height: '20px', width: '20px'}}/>
                            <Typography variant='subtitle2' style={{textAlign: 'right', color: 'lightgray', fontWeight: '800'}}>
                                {product.cookingTime} minutes
                            </Typography>
                        </div>

                        <Typography variant='body2' color="text.secondary">
                            <div 
                                className='typhography-font'
                                style={{
                                    width: '250px', // Set a fixed width container
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3, // Display up to four lines of text
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {product.instructions}
                            </div>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link onClick={() => {navigate(`/recipes/${product.id}`)}} style={{cursor: "pointer"}}>
                            <Button variant='text' sx={{"&:hover": {backgroundColor: '#FBCF5F'}}} disableRipple>
                                <div className='recipe-title' style={{fontSize: '15px', fontWeight: '700'}}>
                                    Read More
                                </div>
                            </Button>
                        </Link>
                    </CardActions>
                </div>

                {/* OG CODE */}
                {/* <CardMedia
                    component="img"
                    alt={product.recipeName}
                    height="200"
                    image={product.image}
                /> */}
                {/* <CardContent> */}
                    {/* <Typography variant="h6" component="div">
                        {product.recipeName}
                    </Typography> */}
                    {/* <Typography variant="subtitle1" color="textSecondary">
                        Type: {product.type}
                    </Typography> */}

                    {/* RATING */}
                    {/* <Typography variant="subtitle1" color="textSecondary">
                        Average Rating: <Rating
                        name="user-rating"
                        readOnly
                        value={product.averageRating}
                    />
                    </Typography> */}

                    {/* COOKING TIME */}
                    {/* <Typography variant="subtitle1" color="textSecondary">
                        Cooking Time: {product.cookingTime} minutes
                    </Typography> */}

                    {/* INSTRUCTIONS */}
                    {/* <div style={{
                        width: '200px', // Set a fixed width container
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Display up to four lines of text
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}>
                        <Typography variant="body2" color="textSecondary">
                            {product.instructions}
                        </Typography>
                    </div> */}

                    {/* AUTHOR */}
                    {/* <Typography variant="subtitle1" color="textSecondary">
                        Author: {product.user?.username}
                    </Typography> */}

                    {/* READ MORE */}
                    {/* <Link onClick={() => {
                        navigate(`/recipes/${product.id}`)
                    }} style={{cursor: "pointer"}}>
                        Read more
                    </Link> */}

                    {/* FAVOURITE BUTTON */}
                    {/* <IconButton
                        color="primary"
                        onClick={handleFavorite}
                        style={{position: 'absolute', top: '10px', right: '10px'}}
                    >
                        <BookmarkBorder/>
                    </IconButton> */}
                {/* </CardContent> */}

                {/* EDIT AND DELETE BTN */}
                {/* {isUser && (
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
                )} */}
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
