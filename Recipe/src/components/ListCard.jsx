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
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");
	const [isFavorite, setIsFavorite] = useState(false);
	const [favoriteIcon, setFavoriteIcon] = useState(
		"https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
	);

	const navigate = useNavigate();

	// First useEffect hook to fetch collections when the component mounts
	useEffect(() => {
		fetchCollections();
	}, []);

	// Second useEffect hook to load the initial favorite status from localStorage
	useEffect(() => {
		const favoriteStatusFromLocalStorage = localStorage.getItem(
			`favorite_${product.id}`
		);
		if (favoriteStatusFromLocalStorage !== null) {
			setIsFavorite(favoriteStatusFromLocalStorage === "true");
			setFavoriteIcon(
				favoriteStatusFromLocalStorage === "true"
					? "https://lh3.googleusercontent.com/pw/AIL4fc-CBi9mWwsZl6ioNIH_CnPaHmKJm2zcuuwBlrFpvf60B1O0Z_zLn-b06ytiNHhgyAdyPVWP4pme4FEW-Rvy6fZnqVHALSZVEAl3puW48qso5Z4GDDKlXRgxEJJOHkTXoXpoBmmqbSW7gPAWkogAlRRZJNp1BUcA0GuuEEPdcaYhp40V77CmxeKDlucUbIet45MSXBFdbXE4KDFmCSJkdrzDECDiK9Qp47oOdovTY4cRVMN48nJ-gpETAAV0XXKvIXY54TC-oRDqOiKeoqJSHGItMU5czIrIbBvZdjVt-imuKKCtQyUU9usClECLF-7sK_acILxeui6130sDhay_mYG7rFQGpjYQcD_dS-L0oqJKk-nBZhe0xPspe5Y5VmR9Feg3VFmZ9Woi7W8X6j5mYmE_kIhe7KQDaQHBvZW7c2igfUZI9mCDSh8rss-tbbqphafRl9jMNzA2-7jYB6WGyZm7dNPhCJC0cw8pU4kcc_aQmigZ3Rgtr99VGf1S2EkCdNYANT8dsxBDdR5W-hdExOoaXwvQi3PVtbU-om7fIcz8CmPbOd59oNiX9j3xnsvU5nv6wEw0tSOHO5zffSduM3tp7YghU8qbLJj3ogi6W8d4FjvHrC1ww3OW68ubtccZdrihJbttbiUIp861mKYX2noylhqzpbZ0u95wLM1lyt7HKyvzL9ZQEL9MK8gi1RaZ5ledRIBDyOTojGJNhflXRXKXwL6IiO0Qmg-GyVnxQDm-T_vMdJdYffk2GwINkq7BBXiomFNNLgsiPpVYhmO8I2JwaXVY7diUDa6NoEkZefZv7tqr_iKkUwZkY5jfIgC3lEWURiLpMu7BlegDY4CI5vMZrq3hDv_4pFLPdZPXLhlORCqgW5TbI4t5wG0swZVGN8Fk5gak4dYIh9sQX55oZs6rFACFwWWY5tmoKKi6nlqEpZzRvFXAIA8bgWyP=w96-h96-s-no?authuser=1"
					: "https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
			);
		}
	}, [product.id]);

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
		try {
			// Add recipe to favorites
			let {message} = await api.addFavorite({
				userId: user.id,
				collectionId: selectedCollection,
				recipeId: product.id,
			});
			// Update the IconButton image to display bookmark icon
			setFavoriteIcon("https://lh3.googleusercontent.com/pw/AIL4fc-CBi9mWwsZl6ioNIH_CnPaHmKJm2zcuuwBlrFpvf60B1O0Z_zLn-b06ytiNHhgyAdyPVWP4pme4FEW-Rvy6fZnqVHALSZVEAl3puW48qso5Z4GDDKlXRgxEJJOHkTXoXpoBmmqbSW7gPAWkogAlRRZJNp1BUcA0GuuEEPdcaYhp40V77CmxeKDlucUbIet45MSXBFdbXE4KDFmCSJkdrzDECDiK9Qp47oOdovTY4cRVMN48nJ-gpETAAV0XXKvIXY54TC-oRDqOiKeoqJSHGItMU5czIrIbBvZdjVt-imuKKCtQyUU9usClECLF-7sK_acILxeui6130sDhay_mYG7rFQGpjYQcD_dS-L0oqJKk-nBZhe0xPspe5Y5VmR9Feg3VFmZ9Woi7W8X6j5mYmE_kIhe7KQDaQHBvZW7c2igfUZI9mCDSh8rss-tbbqphafRl9jMNzA2-7jYB6WGyZm7dNPhCJC0cw8pU4kcc_aQmigZ3Rgtr99VGf1S2EkCdNYANT8dsxBDdR5W-hdExOoaXwvQi3PVtbU-om7fIcz8CmPbOd59oNiX9j3xnsvU5nv6wEw0tSOHO5zffSduM3tp7YghU8qbLJj3ogi6W8d4FjvHrC1ww3OW68ubtccZdrihJbttbiUIp861mKYX2noylhqzpbZ0u95wLM1lyt7HKyvzL9ZQEL9MK8gi1RaZ5ledRIBDyOTojGJNhflXRXKXwL6IiO0Qmg-GyVnxQDm-T_vMdJdYffk2GwINkq7BBXiomFNNLgsiPpVYhmO8I2JwaXVY7diUDa6NoEkZefZv7tqr_iKkUwZkY5jfIgC3lEWURiLpMu7BlegDY4CI5vMZrq3hDv_4pFLPdZPXLhlORCqgW5TbI4t5wG0swZVGN8Fk5gak4dYIh9sQX55oZs6rFACFwWWY5tmoKKi6nlqEpZzRvFXAIA8bgWyP=w96-h96-s-no?authuser=1");
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
	const handleFavorite = async () => {
		if (!user) {
			// If user is not logged in, navigate to the sign-in page
			navigate("/signin");
		} else {
			// If user is logged in, check if the recipe is already a favorite
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
						? "https://lh3.googleusercontent.com/pw/AIL4fc-CBi9mWwsZl6ioNIH_CnPaHmKJm2zcuuwBlrFpvf60B1O0Z_zLn-b06ytiNHhgyAdyPVWP4pme4FEW-Rvy6fZnqVHALSZVEAl3puW48qso5Z4GDDKlXRgxEJJOHkTXoXpoBmmqbSW7gPAWkogAlRRZJNp1BUcA0GuuEEPdcaYhp40V77CmxeKDlucUbIet45MSXBFdbXE4KDFmCSJkdrzDECDiK9Qp47oOdovTY4cRVMN48nJ-gpETAAV0XXKvIXY54TC-oRDqOiKeoqJSHGItMU5czIrIbBvZdjVt-imuKKCtQyUU9usClECLF-7sK_acILxeui6130sDhay_mYG7rFQGpjYQcD_dS-L0oqJKk-nBZhe0xPspe5Y5VmR9Feg3VFmZ9Woi7W8X6j5mYmE_kIhe7KQDaQHBvZW7c2igfUZI9mCDSh8rss-tbbqphafRl9jMNzA2-7jYB6WGyZm7dNPhCJC0cw8pU4kcc_aQmigZ3Rgtr99VGf1S2EkCdNYANT8dsxBDdR5W-hdExOoaXwvQi3PVtbU-om7fIcz8CmPbOd59oNiX9j3xnsvU5nv6wEw0tSOHO5zffSduM3tp7YghU8qbLJj3ogi6W8d4FjvHrC1ww3OW68ubtccZdrihJbttbiUIp861mKYX2noylhqzpbZ0u95wLM1lyt7HKyvzL9ZQEL9MK8gi1RaZ5ledRIBDyOTojGJNhflXRXKXwL6IiO0Qmg-GyVnxQDm-T_vMdJdYffk2GwINkq7BBXiomFNNLgsiPpVYhmO8I2JwaXVY7diUDa6NoEkZefZv7tqr_iKkUwZkY5jfIgC3lEWURiLpMu7BlegDY4CI5vMZrq3hDv_4pFLPdZPXLhlORCqgW5TbI4t5wG0swZVGN8Fk5gak4dYIh9sQX55oZs6rFACFwWWY5tmoKKi6nlqEpZzRvFXAIA8bgWyP=w96-h96-s-no?authuser=1"
						: "https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
				);

				// Store the favorite status in localStorage
				localStorage.setItem(`favorite_${product.id}`, !res.isFavorite);
			} catch (error) {
				console.error("Failed to add favorite:", error);
				alert("Failed to add favorite. Please try again later.");
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
