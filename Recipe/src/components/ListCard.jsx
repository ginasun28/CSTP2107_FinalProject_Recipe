/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import api from "@/api/index.js";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	Button,
	IconButton,
	Rating,
	Grid,
} from "@mui/material";
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	Star,
	StarBorder,
} from "@mui/icons-material";
import "../components/styles/ListCard.css";

// Import the truncateTextAfterWords function or define it here
// function truncateTextAfterWords(text, numWords) {
// 	const words = text.split(" ");
// 	if (words.length > numWords) {
// 		return words.slice(0, numWords).join(" ") + "....";
// 	}
// 	return text;
// }

// Function to truncate the text after 26 characters
function truncateTextAfterCharacters(text, numCharacters) {
	if (text.length > numCharacters) {
		return text.slice(0, numCharacters) + "....";
	}
	return text;
}

export default function ListCard({product, isUser, load, mobileView}) {
	const [user, setUser] = useLocalStorage("user", null);

	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");
	// State to manage the IconButton image URL based on favorite status
	const [favoriteIcon, setFavoriteIcon] = useState(
		product.isFavorite
			? "/src/assets/icons8-bookmark-96.png"
			: "/src/assets/icons8-save-96.png"
	);

	useEffect(() => {
		fetchCollections();
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

	// Function to handle closing the popup window
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	// Function to handle selecting favorites
	const handleSelectCollection = collectionId => {
		setSelectedCollection(collectionId);
	};

	// Function that handles confirming favorites and saving the recipe to the selected collection
	const handleConfirmFavorite = async () => {
		// try {
		// 	// Add recipe to favorites
		// 	let {message} = await api.addFavorite({
		// 		userId: user.id,
		// 		collectionId: selectedCollection,
		// 		recipeId: product.id,
		// 	});
		// 	// close the popup
		// 	handleCloseModal();
		// 	// Prompt the user to save successfully
		// 	alert(message);
		// } catch (error) {
		// 	console.error("Failed to add favorite:", error);
		// 	alert("Failed to add favorite. Please try again later.");
		// }
		try {
			// Add recipe to favorites
			let {message} = await api.addFavorite({
				userId: user.id,
				collectionId: selectedCollection,
				recipeId: product.id,
			});
			// Update the IconButton image to display bookmark icon
			setFavoriteIcon("/src/assets/icons8-bookmark-96.png");
			// Close the FavoriteModal
			handleCloseModal();
			// Prompt the user with a success message
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

	// Function to handle clicking the favorite icon
	const handleFavorite = () => {
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
			// If user is not logged in, navigate to the sign-in page
			navigate("/signin");
		} else {
			// If user is logged in, check if the recipe is already a favorite
			api
				.checkFavorite({
					userId: user.id,
					recipeId: product.id,
				})
				.then(async res => {
					if (res.isFavorite) {
						// If the recipe is a favorite, remove it from favorites
						await api.removeFavorite(product.id, user.id);
						// Update the IconButton image to display the save icon
						setFavoriteIcon("/src/assets/icons8-save-96.png");
					} else {
						// If the recipe is not a favorite, open the FavoriteModal for selecting the collection to save
						setOpenModal(true);
					}
				});
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
		//The logic of editing recipes, jumping to the page of editing recipes, needs to be implemented according to specific routes
		navigate(`/createRecipe?id=${product.id}`);
	};

	// Function to check if the screen is small (mobile view)
	// const isMobileView = () => window.innerWidth <= 599;

	// // Call the isMobileView() function and store the result in a variable
	// const mobileView = isMobileView();

	return (
		<>
			{/* Desktop view */}
			{!mobileView && (
				<Card
					sx={{
						display: "flex",
						background: "rgba(255, 217, 102, 0.5)",
						borderRadius: "20px",
					}}
				>
					<Grid container>
						<Grid item xs={12} sm={12} md={6}>
							<Box sx={{position: "relative"}}>
								<Typography
									component="div"
									variant="h5"
									sx={{
										position: "absolute",
										top: 0,
										left: 0,
										zIndex: 1,
										padding: "10px",
										color: "#E38B29",
										background:
											"linear-gradient(to left, rgba(253, 245, 202, 0.5), rgba(253, 245, 202, 4), rgba(253, 245, 202, 1))",
									}}
								>
									{product.type}
								</Typography>
								<CardMedia
									component="img"
									sx={{
										width: "100%",
										height: "250px", // Set a fixed height or adjust as needed
									}}
									src={product.image}
									alt={product.name}
								/>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									height: "100%",
									justifyContent: "space-between",
								}}
							>
								<CardContent>
									<Box className="card-save-container">
										<IconButton
											onClick={handleFavorite}
											sx={{position: "absolute", top: "0px", right: "10px"}}
											disableRipple
										>
											{/* <img
												src="/src/assets/icons8-save-96.png"
												alt=""
												className="card-icon"
											/> */}
											<img src={favoriteIcon} alt="" className="card-icon" />
										</IconButton>
									</Box>
									<Typography
										component="div"
										variant="h5"
										className="recipe-name"
									>
										{/* {truncateTextAfterWords(product.recipeName, 3)} */}
										{truncateTextAfterCharacters(product.recipeName, 20)}
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div"
									>
										{product.user?.username}
									</Typography>
									<Typography
										sx={{fontSize: "13px", margin: "5px", width: "250px"}}
										className="card-desc"
									>
										{product.instructions}
									</Typography>
									<Typography
										variant="subtitle1"
										color="textSecondary"
										sx={{padding: "10px 5px"}}
									>
										{" "}
										<Rating
											name="user-rating"
											readOnly
											value={product.averageRating}
											emptyIcon={<StarBorder sx={{color: "#E38B29"}} />}
											icon={<Star sx={{color: "#E38B29"}} />}
										/>
									</Typography>
								</CardContent>
								{isUser && (
									<Box>
										<IconButton
											color="primary"
											onClick={handleDeleteRecipe}
											style={{
												position: "absolute",
												bottom: "10px",
												right: "50px",
											}}
										>
											<DeleteIcon />
										</IconButton>
										<IconButton
											color="primary"
											onClick={handleEditRecipe}
											style={{
												position: "absolute",
												bottom: "10px",
												right: "10px",
											}}
										>
											<EditIcon />
										</IconButton>
									</Box>
								)}
								<Box
									sx={{
										textAlign: "right",
										position: "relative",
										padding: "5px 10px",
									}}
								>
									<Button
										onClick={() => {
											navigate(`/recipes/${product.id}`);
										}}
										className="read-more"
									>
										Read More
									</Button>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Card>
			)}
			{/* Mobile view */}
			{mobileView && (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Card>
							<Box sx={{position: "relative"}}>
								<Typography
									component="div"
									variant="h5"
									sx={{
										position: "absolute",
										top: 0,
										left: 0,
										zIndex: 1,
										padding: "10px",
										color: "#E38B29",
										background:
											"linear-gradient(to left, rgba(253, 245, 202, 0.5), rgba(253, 245, 202, 4), rgba(253, 245, 202, 1))",
									}}
								>
									{product.type}
								</Typography>
								<CardMedia
									component="img"
									sx={{
										width: "100%",
										height: "200px", // Set a fixed height or adjust as needed
									}}
									src={product.image}
									alt={product.name}
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									height: "100%",
									justifyContent: "space-between",
								}}
							>
								<CardContent>
									<Box className="card-save-container">
										<IconButton
											onClick={handleFavorite}
											sx={{position: "absolute", top: "0px", right: "10px"}}
										>
											{/* <img
												src="/src/assets/icons8-save-96.png"
												alt=""
												className="card-icon"
											/> */}
											<img src={favoriteIcon} alt="" className="card-icon" />
										</IconButton>
									</Box>
									<Typography
										component="div"
										variant="h5"
										className="recipe-name"
									>
										{/* {truncateTextAfterWords(product.recipeName, 3)} */}
										{truncateTextAfterCharacters(product.recipeName, 20)}
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div"
									>
										{product.user?.username}
									</Typography>
									<Typography
										sx={{fontSize: "13px", margin: "5px", width: "250px"}}
										className="card-desc"
									>
										{product.instructions}
									</Typography>
									<Typography
										variant="subtitle1"
										color="textSecondary"
										sx={{padding: "10px 5px"}}
									>
										{" "}
										<Rating
											name="user-rating"
											readOnly
											value={product.averageRating}
											emptyIcon={<StarBorder sx={{color: "#E38B29"}} />}
											icon={<Star sx={{color: "#E38B29"}} />}
										/>
									</Typography>
								</CardContent>
								{isUser && (
									<Box>
										<IconButton
											color="primary"
											onClick={handleDeleteRecipe}
											style={{
												position: "absolute",
												bottom: "10px",
												right: "50px",
											}}
										>
											<DeleteIcon />
										</IconButton>
										<IconButton
											color="primary"
											onClick={handleEditRecipe}
											style={{
												position: "absolute",
												bottom: "10px",
												right: "10px",
											}}
										>
											<EditIcon />
										</IconButton>
									</Box>
								)}
								<Box
									sx={{
										textAlign: "right",
										position: "relative",
										padding: "5px 10px",
									}}
								>
									<Button
										onClick={() => {
											navigate(`/recipes/${product.id}`);
										}}
										className="read-more"
									>
										Read More
									</Button>
								</Box>
							</Box>
						</Card>
					</Grid>
				</Grid>
			)}
			{/* Render the FavoriteModal component */}
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
}
