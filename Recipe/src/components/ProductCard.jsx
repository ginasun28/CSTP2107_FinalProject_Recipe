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
	useMediaQuery,
} from "@mui/material";
import {Delete as DeleteIcon, Edit as EditIcon} from "@mui/icons-material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import api from "@/api/index.js";
import {useEffect, useState} from "react";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import Box from "@mui/material/Box";
import "./styles/RecentRecipe.css";

// Function to truncate the text after 26 characters
function truncateTextAfterCharacters(text, numCharacters) {
	if (text.length > numCharacters) {
		return text.slice(0, numCharacters) + "....";
	}
	return text;
}

const ProductCard = ({product, isUser, load}) => {
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");
	const [isFavorite, setIsFavorite] = useState(false); // New state for favorite status
	const [favoriteIcon, setFavoriteIcon] = useState(
		"https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
	); // New state for favorite icon
	const isMobileView = useMediaQuery("(max-width:959px)");

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
					? "https://lh3.googleusercontent.com/pw/AIL4fc-CBi9mWwsZl6ioNIH_CnPaHmKJm2zcuuwBlrFpvf60B1O0Z_zLn-b06ytiNHhgyAdyPVWP4pme4FEW-Rvy6fZnqVHALSZVEAl3puW48qso5Z4GDDKlXRgxEJJOHkTXoXpoBmmqbSW7gPAWkogAlRRZJNp1BUcA0GuuEEPdcaYhp40V77CmxeKDlucUbIet45MSXBFdbXE4KDFmCSJkdrzDECDiK9Qp47oOdovTY4cRVMN48nJ-gpETAAV0XXKvIXY54TC-oRDqOiKeoqJSHGItMU5czIrIbBvZdjVt-imuKKCtQyUU9usClECLF-7sK_acILxeui6130sDhay_mYG7rFQGpjYQcD_dS-L0oqJKk-nBZhe0xPspe5Y5VmR9Feg3VFmZ9Woi7W8X6j5mYmE_kIhe7KQDaQHBvZW7c2igfUZI9mCDSh8rss-tbbqphafRl9jMNzA2-7jYB6WGyZm7dNPhCJC0cw8pU4kcc_aQmigZ3Rgtr99VGf1S2EkCdNYANT8dsxBDdR5W-hdExOoaXwvQi3PVtbU-om7fIcz8CmPbOd59oNiX9j3xnsvU5nv6wEw0tSOHO5zffSduM3tp7YghU8qbLJj3ogi6W8d4FjvHrC1ww3OW68ubtccZdrihJbttbiUIp861mKYX2noylhqzpbZ0u95wLM1lyt7HKyvzL9ZQEL9MK8gi1RaZ5ledRIBDyOTojGJNhflXRXKXwL6IiO0Qmg-GyVnxQDm-T_vMdJdYffk2GwINkq7BBXiomFNNLgsiPpVYhmO8I2JwaXVY7diUDa6NoEkZefZv7tqr_iKkUwZkY5jfIgC3lEWURiLpMu7BlegDY4CI5vMZrq3hDv_4pFLPdZPXLhlORCqgW5TbI4t5wG0swZVGN8Fk5gak4dYIh9sQX55oZs6rFACFwWWY5tmoKKi6nlqEpZzRvFXAIA8bgWyP=w96-h96-s-no?authuser=1"
					: "https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
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
		if (!user) {
			navigate("/signin");
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
		// 编辑菜谱的逻辑，跳转到编辑菜谱的页面，需要根据具体的路由来实现
		//The logic of editing recipes, jumping to the page of editing recipes, needs to be implemented according to specific routes
		navigate(`/create_recipe?id=${product.id}`);
	};
	return (
		<>
			<Card
				sx={{
					maxWidth: 300,
					height: "100%",
					borderRadius: "15px",
					backgroundColor: "rgba(255, 217, 102, 0.50)",
				}}
			>
				<CardHeader
					title={
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<div
								className="opensans-font"
								style={{color: "#E38B29", fontSize: "1rem"}}
							>
								{isMobileView
									? truncateTextAfterCharacters(product.recipeName, 20)
									: product.recipeName}
							</div>
							{!isUser && (
								<IconButton
									onClick={handleFavorite}
									style={{color: "#E38B29", padding: "8px"}}
									sx={{
										"&:hover": {
											backgroundColor: "#FBCF5F",
											borderRadius: "50%",
										},
									}}
								>
									<img
										src={favoriteIcon}
										alt=""
										style={{width: "25px", height: "25px"}}
									/>
								</IconButton>
							)}
							{isUser && (
								<Box>
									<div style={{display: "flex", flexDirection: "row"}}>
										<IconButton
											color="primary"
											onClick={handleDeleteRecipe}
											style={{color: "#E38B29"}}
											sx={{
												"&:hover": {
													backgroundColor: "#FBCF5F",
													borderRadius: "50%",
												},
											}}
										>
											<DeleteIcon sx={{fontSize: 25}} />
										</IconButton>
										<IconButton
											color="primary"
											onClick={handleEditRecipe}
											style={{color: "#E38B29"}}
											sx={{
												"&:hover": {
													backgroundColor: "#FBCF5F",
													borderRadius: "50%",
												},
											}}
										>
											<EditIcon sx={{fontSize: 25}} />
										</IconButton>
										<IconButton
											onClick={handleFavorite}
											style={{color: "#E38B29", padding: "8px"}}
											sx={{
												"&:hover": {
													backgroundColor: "#FBCF5F",
													borderRadius: "50%",
												},
											}}
										>
											<img
												src={favoriteIcon}
												alt=""
												style={{width: "25px", height: "25px"}}
											/>
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
									style={{fontSize: "1.25rem"}}
								/>
							</Typography>
							<div style={{color: "#CCC7C7", fontWeight: "800"}}>
								{product.user?.username}
							</div>
						</>
					}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: "0px 15px",
					}}
				>
					<CardMedia
						component="img"
						alt={product.recipeName}
						image={product.image}
						style={{width: "100%", height: "170px", borderRadius: "20px"}}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<h3
							style={{
								position: "absolute",
								color: "#E38B29",
								boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
								padding: "8px 18px",
								borderRadius: "20px",
							}}
						>
							{product.type}
						</h3>
					</div>

					<CardContent style={{paddingBottom: "0px", marginTop: "10px"}}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<img
								src="https://lh3.googleusercontent.com/pw/AIL4fc-8NW0xmAufmzsuOEYPHO4r_6vTrK6lCKuuDyvc9FeyVw1rXf_yXJdh-g9Rl05wG1DT645pzbdOWdnspRpWqEz7BgA7Io4SNwvivnRRWZ76HMw-oE7EMOsZgQ7vgyRETwR5ms0Ly_4NS2K6wvaegIrDEWrQLY8hOMMcHQG7fUW25Ooz1_u2yD-sVac1AVf_qgi6-ISCuVYBkJsm1ilDBAscx4CTCD8GCH_b5YCKZCqhwa4brBvlZmz3IgKIzZcyu9H0KiWBYzL7jfejQtYVrdXBcejIScDcAzlvf4kqk0QdseGd-tv22yjNOghppL4Ni5C6EtoVXYkaY90qzjO0EfDEz74O85WnP15C_Qa4cQgKnm48LhhX226dtOcYZ26aC6tI0hWhuHxxq-s90XBuOXa9Ss0HJX5VVRUXKAd8Yjwq5MDyjudvGj3hmwbKTamP2xg2obhxxjtMMgkXnva1Ya4L6_9UkMfPYQHlvKT-105IH_N75uytbndouBQ3rbZwvrjCNFeXe-zh6p9hCXwXAgLypnoxewWAGBIE4FvAmcWeIpk15lo6Jx057poHY1SLzzq8ybgN35UPiP7qgRXKDtIyrMHhgVitfAxE_7ETgQYYnT8U3EBrhqkfsGQBIayy3yvzbbuzHVBIPJMvduA1b_lSQeLYMfSnFsqXrNilpOziZ7l-A43IxuqVItclsUlwlt0z5zbcZJkRQHeQRyqZxbFSfJXLZgZnWbuREzMnYgJa8TdEhpKhdJmu92VTXSg26PddTkEQddIG09GXp3oHdpsptfnTABSvk3josWBd9m_zDUw3e6Qk_lW2rWBYc15W5IkE5d_erxvJjrEz7qARkjVwk3Y3oqqJHVnWziyiu97kyWhWqYXGoL-e7NuMPSXnpIGIc81ltHa5x509aG6Du2L5h7Yr3yVLZr3RaaSq3JIinY_U5utwWj4PC0ei=w96-h96-s-no?authuser=1"
								alt="Time icon"
								style={{height: "20px", width: "20px"}}
							/>
							<Typography
								variant="subtitle2"
								style={{
									textAlign: "right",
									color: "lightgray",
									fontWeight: "800",
								}}
							>
								{product.cookingTime} minutes
							</Typography>
						</div>
						<Typography variant="body2" color="text.secondary">
							<div
								className="typhography-font"
								style={{
									width: "250px", // Set a fixed width container
									display: "-webkit-box",
									WebkitLineClamp: isMobileView ? 1 : 3, // Display up to four lines of text
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
								}}
							>
								{product.instructions}
							</div>
						</Typography>
					</CardContent>
					<CardActions>
						<Link
							onClick={() => {
								navigate(`/recipes/${product.id}`);
							}}
							style={{cursor: "pointer"}}
						>
							<Button
								variant="text"
								sx={{"&:hover": {backgroundColor: "#FBCF5F"}}}
								disableRipple
							>
								<div
									className="recipe-title"
									style={{fontSize: "0.938rem", fontWeight: "700"}}
								>
									Read More
								</div>
							</Button>
						</Link>
					</CardActions>
				</div>
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
