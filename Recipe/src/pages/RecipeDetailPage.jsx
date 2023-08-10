import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
	Box,
	Button,
	Grid,
	IconButton,
	Paper,
	Rating,
	TextField,
	Typography,
} from "@mui/material";
import api from "@/api/index.js";
import RecipeDetailTable from "@/components/RecipeDetailTable.jsx";
import FavoriteModal from "@/components/FavoriteModa.jsx";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Comment from "@/components/Comment.jsx";
import "../components/styles/RecipeDetailsPage.css";

const RecipeDetailPage = () => {
	const {recipeId} = useParams();
	const [recipeData, setRecipeData] = useState({});
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState(false);
	const [collections, setCollections] = useState([]);
	const [selectedCollection, setSelectedCollection] = useState("");
	const [userRating, setUserRating] = useState(0);
	const [userComment, setUserComment] = useState("");
	const [comments, setComments] = useState([]);
	const [replyToCommentId, setReplyToCommentId] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false); // New state for favorite status
	const [favoriteIcon, setFavoriteIcon] = useState(
		"https://lh3.googleusercontent.com/pw/AIL4fc8vHHgXkUoga4RrDgLdA9JfiP2u3xMAK4_xx3P319ExCw-ZaX_Vo4odCowBdFG7OmGtDvq-UEwc2YVQHqQBQb6tIEgVkWoQyOsTswHJgtG-D2zK0Tv28XHC-z5oeUxUksAsmuMdOGORyxpQFb-0dXJu2KLJjiUCyGYh06KNN7rFPkn-FGQ-RnXgamQ8TY3jCzgG34iR9UbYSNiViZcZLt2TbcM_F1Fe4COOuEN4-ejEQRV4Xy3SXBv_8C3RpOW47bzKR2--TKRDanvjHNSZEADwH5oeb8975hLGeGpp5uwD_Yd_aAgt_de22XuOVFLFaqiWT_qFKAa-rGMfUadaC2u8G4mPSDapRJQie5OfMJY0hJr50ia7k00UP2pCn7D3YPnaR_ARHchcMBn4PnBtLMb7Oge6YAlQudNo-vQWvxjxSRznBjQ8L2sHR50NuZOopkrQgP270uFewoO-xDiBiXHULhM1VYe4hdNKZVY9lMrmdlsLD3Ves4bJuJhayhg_mj1TRBfvwF9xTda_dP6zMAKzmA1NhITZKkLJbx7jd1wixIp3evl236i_G3YOXwjvHZCd27Akb0MWEPvSKeVI_zPURs5Qx3kGIaqZ1I84XEtax7fWOoq5XUIAOcGQAmRuE0Jd_mYJnndOA2zzZIilLrFQICg_6hEnB1M6OOc_mFxr_LvJU26vqQEzscYDUU-9gNCctr5FiYwnt3R5Nj9Y4MszTkS7nLkvwhLrMS_g1d2xRN-81w1l7bvhSrIHZhAxu6qSIvXK233bugZrBauhAYIEL3l8sj4aDuNs4nXxz6cN1vtbmXveQ20FhDmdaOjxKgLGNc-bodN3Qui3wc2htWKOPimJmtJH64HZ8FyMJH5oNWHqVGZmfVCXizULSw8ccKXJez8vwViQ6PNru57ZyB7G1RuWNhrfDmFkMI-0L4Fpiq9tnfg3-lQ5-PBz=w96-h96-s-no?authuser=1"
	);

	const [averageRating, setAverageRating] = useState(0);

	useEffect(() => {
		load();
	}, [recipeId]);

	const load = () => {
		Promise.all([
			api.getRecipesById(recipeId),
			api.getCommentsByRecipeId(recipeId),
			api.getUserRatingByRecipeId(recipeId, user?.id),
		]).then(([recipeRes, commentsRes, ratingRes]) => {
			setRecipeData(recipeRes.recipe);
			setComments(commentsRes.comments);
			setUserRating(ratingRes.userRating.rating);
			setAverageRating(recipeRes.recipe.averageRating);
		});
	};
	// console.log("recipe data:", recipeData);
	// console.log("avg rating: ", averageRating);

	useEffect(() => {
		fetchCollections();
		checkInitialFavoriteStatus();
	}, []);

	const handleRatingChange = (event, newValue) => {
		setUserRating(newValue);
	};
	const handleReply = commentId => {
		setReplyToCommentId(commentId);
	};
	const handleCommentChange = event => {
		setUserComment(event.target.value);
	};

	const handleRatingSubmit = async () => {
		if (!user) {
			navigate("/signin");
		}
		try {
			await api.addRating({
				userId: user.id,
				recipeId: recipeData.id,
				rating: userRating,
			});
			alert("success!");
		} catch (error) {
			console.error("Failed to submit rating:", error);
			alert("Failed to submit rating. Please try again later.");
		}
	};

	const handleCommentSubmit = async (
		parentId = null,
		users = null,
		userReply = null
	) => {
		if (!user) {
			navigate("/signin");
		}
		try {
			const newComment = {
				userId: user.id,
				recipeId: recipeData.id,
				content: userReply ? userReply : userComment,
				parentCommentId: parentId, // Add parentCommentId field if it exists
				target: users,
			};

			await api.addComment(newComment);

			alert("success!");
			load();
			setUserComment("");
		} catch (error) {
			console.error("Failed to submit comment:", error);
			alert("Failed to submit comment. Please try again later.");
		}
	};

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

	// New function to check the initial favorite status from localStorage
	const checkInitialFavoriteStatus = () => {
		const favoriteStatusFromLocalStorage = localStorage.getItem(
			`favorite_${recipeData.id}`
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

	//Function that handles confirming favorites
	const handleConfirmFavorite = async () => {
		try {
			// Add recipe to favorites
			let {message} = await api.addFavorite({
				userId: user.id,
				collectionId: selectedCollection,
				recipeId: recipeData.id,
			});
			// close the popup
			handleCloseModal();
			//Prompt the user to save successfully
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
				//After the creation is successful, reacquire the user's favorites list and refresh the favorites list
				fetchCollections();
			})
			.catch(error => {
				console.error("Error creating collection:", error);
			});
	};

	const handleFavoriteClick = async () => {
		if (!user) {
			navigate("/signin");
		} else {
			try {
				const res = await api.checkFavorite({
					userId: user.id,
					recipeId: recipeData.id,
				});
				if (res.isFavorite) {
					// If the recipe is a favorite, remove it from favorites
					await api.removeFavorite(recipeData.id, user.id);
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
				localStorage.setItem(`favorite_${recipeData.id}`, !res.isFavorite);
			} catch (error) {
				console.error("Failed to add favorite:", error);
				alert("Failed to add favorite. Please try again later.");
			}
		}
	};

	if (!recipeData) {
		return <Typography>Loading...</Typography>;
	}

	const {
		image,
		recipeName,
		type,
		cookingTime,
		servings,
		cuisine,
		ingredients,
		instructions,
	} = recipeData;
	// console.log('rating: ', averageRating)

	return (
		<>
			<div className="detail-structure-resize" style={{width: "100%"}}>
				<div className="recipe-pic-resize">
					<IconButton
						onClick={() => navigate(-1)}
						sx={{"&:hover": {borderRadius: "50%"}}}
						style={{
							position: "absolute",
							margin: "10px 20px 0px 20px",
							backgroundColor: "#FBCF5F",
						}}
						disableRipple
					>
						<img
							src="https://lh3.googleusercontent.com/pw/AIL4fc8OCu8zc_A-99TxrnhAEZClu1zh0Wo5tVND45TWUw75_SNwh8GE5gavY_EfQ6CdlolFZAEb-W_-wrfloYlJMjx9ucoHw3Ul_o0DLwAC6Xt1Z5dMFcCru24Ge4p-X0P2q-Oepl_4u2tpWiKlkiidr5ZXmqmLCPnn2c3fIQZW_5dU4rRwJFbPYo1qxhIueJtSQeH16Rl2Nh6HJLunzK1VxBZup9vd1i-Id22DIcFiM4r-OYIQYVrsK798aeXr9e4qqWt-xWx4ubXWlViB5ZwzO-wog8ccOVLCHFPJstyy4o7hxfg8MIkoAw5kiEf5ZBxzIEhmmfEHO9yvBk0dabh-BTIIeAFojjfr-mV6565MRre54fXkAe7u35qJST0wO-x3L974vgYnDcLH6NFSuZ6h30pd7c4t7cEkBgZII0KQrXGvoA-Jj9x9qUQr1Rnk-c_LtZvbya1gXZS_qVChT48BbAEkKr7hma_dSTdvkG4lLuu73mekGkFaliZRQ0YhKbAx1k-lTBYcZgjE3A2oxB9iVcrRdTBV-_TRsedFwPqwQ6Z7sr8mqynqvMiC_thgm-mffEuXFGQzC9a9AGoUhtWzJn4RMEhpEAldUWeZ5yUi_bRFR9wPbDfiHAYxSsfiBjkIV-wQvA29EPnaZOIFBSGWoPrZMsjoaSjazjQozOser0RNdUMTeba8q136G83D03GW_TRRPamGT3KEBTYVZOGA9EJOpB-OzPewn2DVOIDthsFq-6TOdQPfYHnv0DlXoZYvOXJxd3CB_-ZBCsoH6IDK-CWlrIOewc4WJhj7LSJ9QMsCOqsKK6gA8XNd7iR6h3NtapnOUDxYls5R83dDruJ22BMEu_y07zFDutclwMO1Rq08Ifnx0FK7Fa878PoF2GBtFkkH4tTErn5W-FKZ0fRYL4ceevlZBL-6Qsk3ZcaHAZTK1WUXufzLkOu-XJg5=w96-h96-s-no?authuser=1"
							alt="Back btn"
							style={{width: "50px", height: "50px", borderRadius: "50%"}}
						/>
					</IconButton>
					{/* <Link to={'/recipes'}>
                        <img src="../src/assets/icons8-back-96 (1).png" alt="Back btn" style={{width: '50px', height: '50px', position: 'absolute', margin: '10px 20px 0px 20px'}}/>
                    </Link> */}
					<img
						src={image}
						alt={recipeName}
						style={{width: "100%", height: "100%", objectFit: "cover"}}
					/>
				</div>

				<div
					className="recipe-info-resize scroll-side"
					style={{display: "flex", flexDirection: "column"}}
				>
					<div
						className="poppins-font avatar-position-change"
						style={{paddingTop: "20px"}}
					>
						<div className="recipe-name-edit">
							{/* <h3 className='recipe-txt'>Recipe Name</h3> */}
							<h2 className="poppins-font txt-center">{recipeName}</h2>
						</div>

						<Box
							sx={{display: "flex", alignItems: "center", paddingRight: "30px"}}
							onClick={() => {
								navigate("/history?id=" + recipeData.user.id);
							}}
						>
							<img
								src={recipeData.user?.avatar}
								alt={recipeData.user?.username}
								style={{
									width: "40px",
									height: "40px",
									borderRadius: "50%",
									marginRight: "10px",
								}}
							/>
							<Typography variant="h5" style={{fontSize: "1.25rem"}}>
								{recipeData.user?.username}
							</Typography>
						</Box>
					</div>

					<div
						className="average-rate-position"
						style={{
							display: "flex",
							alignItems: "center",
							marginLeft: "30px",
							paddingTop: "5px",
						}}
					>
						<Rating
							name="user-rating"
							value={averageRating}
							// onChange={handleRatingChange}
							readOnly
						/>
					</div>

					<div
						className="poppins-font recipe-info-position"
						style={{
							display: "flex",
							fontSize: "14px",
							justifyContent: "center",
							paddingTop: "20px",
						}}
					>
						<div className="preparation-style">
							<h3 className="txt-center">Servings</h3>
							<h4 className="body-font txt-center">{servings}</h4>
						</div>

						<div className="preparation-style">
							<h3 className="txt-center">Cooking time</h3>
							<h4 className="body-font txt-center">{cookingTime} minutes</h4>
						</div>

						<div className="preparation-style">
							<h3 className="txt-center">Cuisine</h3>
							<h4 className="body-font txt-center">
								{cuisine} {type}
							</h4>
						</div>
					</div>

					<div
						className="ingredient-table-position"
						style={{paddingTop: "20px"}}
					>
						<h3 className="poppins-font">INGREDIENTS</h3>
						<RecipeDetailTable ingredients={ingredients} />
					</div>

					<div className="instructions-position" style={{paddingTop: "20px"}}>
						<h3 className="poppins-font">INSTRUCTIONS</h3>
						<h4 className="body-font instructions-body-position">
							{instructions}
						</h4>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginLeft: "20px",
							paddingTop: "20px",
							justifyContent: "space-between",
						}}
					>
						<div className="rate-recipe-resize" style={{alignItems: "center"}}>
							<Typography
								variant="h6"
								className="poppins-font"
								style={{
									fontSize: "18px",
									marginRight: "10px",
									fontWeight: "700",
								}}
							>
								Rate the recipe:
							</Typography>

							<Rating
								name="user-rating"
								value={userRating}
								onChange={handleRatingChange}
							/>
							<Button
								variant="outlined"
								onClick={handleRatingSubmit}
								className="recipe-save-btn"
								style={{border: "2px solid #064635"}}
							>
								<h3 className="poppins-font">Save</h3>
							</Button>
						</div>

						<div
							style={{
								marginLeft: "30px",
								display: "flex",
								justifyContent: "flex-end",
								marginRight: "20px",
							}}
						>
							<Button
								onClick={handleFavoriteClick}
								sx={{"&:hover": {backgroundColor: "transparent"}}}
								disableRipple
							>
								<img
									src={favoriteIcon}
									alt="Save icon"
									style={{width: "40px", height: "40px", borderRadius: "15px"}}
								/>
							</Button>
						</div>
					</div>
					<div style={{paddingTop: "20px"}}>
						<div className="comments-position-change">
							<Typography
								variant="h6"
								className="poppins-font"
								style={{fontWeight: "800"}}
							>
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
								style={{width: "90%"}}
								InputProps={{
									style: {border: "2px solid #064635", borderRadius: "10px"},
								}}
							/>

							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									width: "90%",
								}}
							>
								<Button
									variant="contained"
									onClick={() => handleCommentSubmit()}
									style={{backgroundColor: "#FF7F3F", borderRadius: "10px"}}
								>
									submit Comment
								</Button>
							</div>
						</div>

						{comments.map(comment => (
							<Comment
								key={comment.id}
								comment={comment}
								onReply={handleReply}
								onConfirmReply={handleCommentSubmit}
							/>
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
