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
} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import "../components/styles/ListCard.css";

export default function ListCard({product, isUser, load}) {
	const [user, setUser] = useLocalStorage("user", null);

	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");

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
	const handleFavorite = () => {
		if (!user) {
			navigate("/signin");
		}
		api
			.checkFavorite({
				userId: user.id,
				recipeId: product.id,
			})
			.then(async res => {
				if (res.isFavorite) {
					await api.removeFavorite(product.id, user.id);
				} else {
					setOpenModal(true);
				}
			});
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
		navigate(`/createRecipe?id=${product.id}`);
	};

	return (
		<>
			<Card
				sx={{
					display: "flex",
					width: 600,
					background: "rgba(255, 217, 102, 0.5)",
				}}
			>
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
						sx={{width: 250, height: 250, flexShrink: 0}}
						src={product.image}
						alt={product.name}
					/>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
					<CardContent sx={{flex: "1 0 auto"}}>
						<Box className="card-save-container">
							<IconButton
								onClick={handleFavorite}
								sx={{position: "absolute", top: "0px", right: "10px"}}
							>
								<img
									src="/src/assets/icons8-save-96.png"
									alt=""
									className="card-icon"
								/>
							</IconButton>
						</Box>
						<Typography component="div" variant="h5">
							{product.recipeName}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
						>
							{product.user?.username}
						</Typography>
						<Typography sx={{fontSize: "16px"}} className="card-desc">
							{product.instructions}
						</Typography>
					</CardContent>
					{isUser && (
						<Box>
							<IconButton
								color="primary"
								onClick={handleDeleteRecipe}
								style={{position: "absolute", bottom: "10px", right: "50px"}}
							>
								<DeleteIcon />
							</IconButton>
							<IconButton
								color="primary"
								onClick={handleEditRecipe}
								style={{position: "absolute", bottom: "10px", right: "10px"}}
							>
								<EditIcon />
							</IconButton>
						</Box>
					)}
					<Box sx={{textAlign: "center", position: "relative", top: "-20px"}}>
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
