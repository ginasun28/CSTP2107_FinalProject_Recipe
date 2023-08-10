import {useEffect, useRef, useState} from "react";
import {
	Button,
	Divider,
	ListSubheader,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Notification from "@/components/Notification.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import "../components/styles/CreateRecipe.css";

const PublishProductPage = () => {
	const [productInfo, setProductInfo] = useState({
		recipeName: "",
		type: "",
		cookingTime: "",
		servings: "",
		cuisine: "",
		ingredients: [],
		instructions: "",
		image: "",
		user: {},
	});
	const [user, setUser] = useLocalStorage("user", null);
	const [notificationMessage, setNotificationMessage] = useState("");
	const location = useLocation();
	const id = new URLSearchParams(location.search).get("id");
	const inputRef = useRef(null);
	const navigate = useNavigate();

	// Call the custom hook to update the page title
	useEffect(() => {
		document.title = "Create Recipe";
	}, []);

	useEffect(() => {
		if (!user) {
			navigate("/signin");
		}
		if (id) {
			api.getRecipesById(id).then(res => {
				setProductInfo(res.recipe);
			});
		}
	}, [id]);

	const handleInputChange = e => {
		const {name, value} = e.target;
		setProductInfo(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleIngredientChange = (index, field, value) => {
		setProductInfo(prevState => {
			const ingredients = [...prevState.ingredients];
			ingredients[index][field] = value;
			return {
				...prevState,
				ingredients,
			};
		});
	};

	const handleAddIngredient = () => {
		setProductInfo(prevState => ({
			...prevState,
			ingredients: [
				...prevState.ingredients,
				{qt: "", measurement: "", ingredient: ""},
			],
		}));
	};

	const handleRemoveIngredient = index => {
		setProductInfo(prevState => {
			const ingredients = [...prevState.ingredients];
			ingredients.splice(index, 1);
			return {
				...prevState,
				ingredients,
			};
		});
	};

	const handlePublishProduct = e => {
		e.preventDefault();
		//Handle publish recipe logic
		console.log(productInfo);
		productInfo.user.username = user.username;
		productInfo.user.id = user.id;
		productInfo.user.avatar = user.avatar;
		api.addRecipes(productInfo).then(() => {
			setProductInfo({
				recipeName: "",
				type: "",
				cookingTime: "",
				servings: "",
				cuisine: "",
				ingredients: [],
				instructions: "",
				image: "",
				user: {},
			});
			setNotificationMessage("Release success");
			navigate("/history");
		});
	};

	const handleImageClick = () => {
		inputRef.current.click();
	};
	const handleAvatarChange = e => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		api
			.upload(formData)
			.then(data => {
				// Handle the logic after the upload is successful
				const imageURL = data.imageURL;
				setProductInfo(prevState => ({
					...prevState,
					image: imageURL,
				}));
				console.log("Avatar uploaded:", imageURL);
			})
			.catch(error => {
				// Logic to handle upload failures or errors
				console.error("Error uploading avatar:", error);
			});
	};

	const tableHeader = [
		{
			id: "quantity",
			label: "QT",
			minWidth: 50,
		},
		{
			id: "measurement",
			label: "Measurement",
			minWidth: 100,
		},
		{
			id: "ingredient",
			label: "Ingredient",
			minWidth: 160,
		},
		{
			id: "remove",
			label: "",
			minWidth: 40,
		},
	];

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			},
		},
	};

	return (
		<>
			<div style={{width: "100%", paddingBottom: "5%"}}>
				<div
					style={{marginLeft: "30px", marginRight: "30px", marginTop: "20px"}}
				>
					<h3 className="recipe-title">Create Recipe</h3>
					<Divider
						sx={{
							height: "0.5px",
							background:
								"linear-gradient(90deg, rgba(229,171,107,1) 35%, rgba(249,248,247,1) 69%)",
						}}
					/>
					<form onSubmit={handlePublishProduct} style={{marginTop: "20px"}}>
						<div className="form-font form-resize">
							<div
								className="first-part-resize"
								style={{display: "flex", flexDirection: "column"}}
							>
								<div style={{display: "flex", flexDirection: "column"}}>
									<label htmlFor="">Recipe Name</label>
									<TextField
										id=""
										name="recipeName"
										className="recipe-txt"
										value={productInfo.recipeName}
										onChange={handleInputChange}
										variant="standard"
										required
									/>
								</div>

								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "20px",
									}}
								>
									<label htmlFor="">Servings</label>
									<TextField
										id=""
										name="servings"
										className="recipe-txt"
										value={productInfo.servings}
										onChange={handleInputChange}
										variant="standard"
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "20px",
									}}
								>
									<label htmlFor="">Cooking Time (in minutes)</label>
									<TextField
										id=""
										name="cookingTime"
										className="recipe-txt"
										value={productInfo.cookingTime}
										onChange={handleInputChange}
										variant="standard"
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "20px",
									}}
								>
									<label htmlFor="">Cuisine</label>
									<TextField
										id=""
										name="cuisine"
										className="recipe-txt"
										value={productInfo.cuisine}
										onChange={handleInputChange}
										variant="outlined"
										size="small"
										style={{backgroundColor: "white"}}
									/>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "20px",
									}}
								>
									<label htmlFor="">Type</label>
									<Select
										name="type"
										value={productInfo.type}
										className="recipe-txt"
										onChange={handleInputChange}
										sx={{mb: 2, backgroundColor: "white"}}
										size="small"
									>
										<MenuItem value="Appetizers">Appetizers</MenuItem>
										<MenuItem value="Mains">Mains</MenuItem>
										<MenuItem value="Side Dishes">Side Dishes</MenuItem>
										<MenuItem value="Desserts">Desserts</MenuItem>
										<MenuItem value="Beverages">Beverages</MenuItem>
									</Select>
								</div>

								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginTop: "20px",
									}}
								>
									<label htmlFor="">Instructions</label>
									<TextField
										id=""
										name="instructions"
										className="recipe-txt"
										value={productInfo.instructions}
										onChange={handleInputChange}
										variant="outlined"
										multiline
										rows={10}
										style={{backgroundColor: "#F9F3DF"}}
									/>
								</div>
							</div>
							<div
								className="second-part-resize"
								style={{display: "flex", flexDirection: "column"}}
							>
								<div style={{display: "flex", flexDirection: "column"}}>
									<label htmlFor="">Ingredients</label>
									<Paper
										sx={{
											width: "100%",
											overflow: "hidden",
											backgroundColor: "#F9F3DF",
										}}
									>
										<TableContainer sx={{maxHeight: 350}}>
											<Table stickyHeader aria-label="sticky table">
												<TableHead>
													{tableHeader.map(header => (
														<TableCell
															key={header.id}
															style={{
																minWidth: header.minWidth,
																backgroundColor: "#FFD8A9",
															}}
														>
															<p className="header-label">{header.label}</p>
														</TableCell>
													))}
												</TableHead>
												<TableBody>
													{productInfo.ingredients.map((ingredient, index) => (
														<TableRow key={index}>
															<TableCell>
																<TextField
																	value={ingredient.qt}
																	onChange={e =>
																		handleIngredientChange(
																			index,
																			"qt",
																			e.target.value
																		)
																	}
																	fullWidth
																	size="small"
																	InputProps={{
																		style: {
																			borderRadius: "10px",
																			backgroundColor: "white",
																		},
																	}}
																/>
															</TableCell>
															<TableCell>
																<FormControl fullWidth>
																	<Select
																		value={ingredient.measurement}
																		onChange={e =>
																			handleIngredientChange(
																				index,
																				"measurement",
																				e.target.value
																			)
																		}
																		MenuProps={MenuProps}
																		size="small"
																		sx={{
																			backgroundColor: "white",
																			borderRadius: "10px",
																		}}
																	>
																		<ListSubheader>Dry or Liquid</ListSubheader>
																		<MenuItem value="cup">Cup</MenuItem>
																		<MenuItem value="teaspoon">
																			Teaspoon
																		</MenuItem>
																		<MenuItem value="tablespoon">
																			Tablespoon
																		</MenuItem>
																		<MenuItem value="">Ounces</MenuItem>

																		<ListSubheader>Dry</ListSubheader>
																		<MenuItem value="dashes">Dashes</MenuItem>
																		<MenuItem value="pinches">Pinches</MenuItem>
																		<MenuItem value="pounds">Pounds</MenuItem>
																		<MenuItem value="pieces">
																			Pieces of
																		</MenuItem>

																		<ListSubheader>Liquids</ListSubheader>
																		<MenuItem value="gallon">Gallons</MenuItem>
																		<MenuItem value="pint">Pints</MenuItem>
																		<MenuItem value="quart">Quarts</MenuItem>

																		<ListSubheader>Units</ListSubheader>
																		<MenuItem value="milligrams">
																			Milligram
																		</MenuItem>
																		<MenuItem value="gram">Gram</MenuItem>
																		<MenuItem value="kilogram">
																			Kilogram
																		</MenuItem>
																		<MenuItem value="milliliter">
																			Milliliter
																		</MenuItem>
																		<MenuItem value="liter">Liter</MenuItem>
																		<MenuItem value="kiloliter">
																			Kiloliter
																		</MenuItem>
																	</Select>
																</FormControl>
															</TableCell>
															<TableCell>
																<TextField
																	value={ingredient.ingredient}
																	onChange={e =>
																		handleIngredientChange(
																			index,
																			"ingredient",
																			e.target.value
																		)
																	}
																	fullWidth
																	size="small"
																	InputProps={{
																		style: {
																			borderRadius: "10px",
																			backgroundColor: "white",
																		},
																	}}
																/>
															</TableCell>
															<TableCell>
																<Button
																	variant="outlined"
																	onClick={() => handleRemoveIngredient(index)}
																>
																	Remove
																</Button>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</Paper>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "flex-end",
										}}
									>
										<Button
											variant="text"
											onClick={handleAddIngredient}
											sx={{"&:hover": {backgroundColor: "transparent"}}}
											disableRipple
										>
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
												}}
											>
												<img
													src="https://lh3.googleusercontent.com/pw/AIL4fc_yu4-GBwKlAnhsjLraJ_0qfncGbYKH1o3z5PmJcEYGlfMZlstzycopwYnpVcLliPGsCwByLYKR5ZFuKvdY714UnVdRrUGtOKJEaxrjrMNTb9IiJc9Fu0LJ1vsdQtoGDE9wBPeREeoMo8tabLZ1zHB1dRR7CznBPQu6xTVnTbXW4bCZsH_xtXX7buIns5eZL5-y06bHxLEu-JduWtCLt69uOviq6QESMwkJ1D6zchnN2BFUCx9zjmCcfbNo2Czoqqbh5Dod9xH0x048JxmHUMqTe90S7FIsbmz0aVQIr-WO44vtFCuLA0f85-KZAcrSVZVDls4EsMf2WZx3lY5caMUYb9YdizfBwKNCxrh8z0P1y6n7JLPOiD_oaY9w_4ruRoCj-ubV5mAx81uzEhqiQvEZfg4AWuC11sRaqKL_GCJWuQaGKNzeTfz2JxuX8OFCnzwPzjqPNy-6Mf26Z-hR5UJXe3DpVBBkPxFzx3ojIj5g9HBOWzzY1Fc7D-J5rAzXy0g84MInrQLy30MI2HYXL_Gk-esJMi0RvJbsa69m35sZzIphGfjoGUH0tM11BhtXn7M74yeBGNsCFF1rBH1UOKxLow5rNGkGpkD8T1pLydIhzznxhK15-4J8LHq9pVpsH3i-Pgc9eFTAC7DljJc0-hQp3CS0EFkm6f7dqDdw8uZEosvD18ZkKyRftMV2Kpfv3fBtihmT8R0hzTjVcv3sSTx1YnY7gN7mdrTdInMQI3731fOvq92EiQP6IESm2bCDvYIrIIvp7t2UQTUJt7kpHzRtS-GTJ-3eG4g2X3wzjUvwhA-aFNQYVgBQPLtp9zB1zNqVRMA_xOSFBCP_1HV6KuB9C13WNeyf5IoFfque0m-9KsdQryWcNmzZnspp57bUmMK9A4KWzAVftQGijjeQBaIhol-NOGjkKGMGiCoPqlc3TNI9XI_G7pOCAw-D=w96-h96-s-no?authuser=1"
													alt="Add Icon"
													style={{
														width: "20px",
														height: "20px",
														marginRight: "5px",
													}}
												/>
												<p className="ingredient-title"> Add Ingredient </p>
											</div>
										</Button>
									</div>
								</div>

								<div className="photo-btn-resize">
									<div
										className="photo-resize"
										style={{
											width: "50%",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<label htmlFor="">Photo</label>

										<div
											style={{marginTop: 20, width: "200px", height: "200px"}}
										>
											{productInfo.image ? (
												<div
													style={{
														width: "200px",
														height: "200px",
														border: "3px solid #064635",
														overflow: "hidden",
													}}
												>
													<img
														src={productInfo.image}
														loading="lazy"
														alt=""
														onClick={handleImageClick}
														style={{
															objectFit: "cover",
															width: "100%",
															height: "100%",
														}}
													/>
												</div>
											) : (
												<div
													style={{
														width: "200px",
														height: "200px",
														border: "3px solid #064635",
													}}
												>
													<div
														style={{
															background:
																"url('https://lh3.googleusercontent.com/pw/AIL4fc9aXOb2Xdv93HwOB5hUgXUHdxTkvf4_JHqtd2ZGC7bm83VL2iGP7PzHt1aJlzAmgTzUnAZimE4ZeabqcZWAEoWsBwihlVwQmDFOAAPhj4zKxjqIXdkzPHKoq2Fiq94-8ujTa78qNT9ZYbYCNLnziOrLP64YL2wVWkOo2jBBFakXkDIjh0Lh3wDST2xzZLpC9POd4-efVt7Ji5tBmQaxHicBG26tztcPl4cMlh3Bee7-ZohOB-e_11sVicPjZD5the9MI9cak6B6AjxBnzeGog_m7qqvOCO180iRnQNkkGZs5DIhN-ZMDsUHBxvWUJsHZG6WdM5UzMwILGOo9uSbBycR4qIJ89g5IJ6E05TNSUL127hyqjzAsO7dUQEZ8YINXsCzAVqGqHPGIqms7moP4QnmT6yDzoT9rgbRCgiSIo-tuFuYT-PQUteQXHsBBCsWpYeYy1IAZ0g0wx-SUbMA8rkk6Rtt_tVotdgg0m1kpD55SVYmY0wD9P3v_d_x6-6WJZc1BQfi7au-Stn9wUsMlJ2xu-edWzPD3Z09sms83IOOywRFBcDMU7RbsFbgLJ9Inhh_4lMcmtjRFq1g2eccBVUz6tMTejlxV8_R2pMRmUjfnJzmnc0sS6Gis7ScJkLPXprpYxFj17wr_e3PXcyv_CJd8hI-XUBtKRJ4vuZpqiahGRhnFWGwjpiiz2YwY8OW6bVlVQCzwyFPtb8m-84oBy_K8qbGdIyMxq7rokX3NCprGeNpn3z_dbH2SwIDs8pT9iuuailRba8d6ioMAG34bTAmWoiNpVNwO7gyQfWAs0QS_Y9WOcjZTFYaBWQ0c3DVFsIxRVuZNNmLTrnkkVVKPoT-FGc6nPWpD2CxiGdpsyiO0AR-SrHGcTRqkTp7GCtPDDhJdWqElLDDEEVw38OFCub3BJ5_zWU9eAlOsKtxHCxw3dp593ZADSoKORHi=w96-h96-s-no?authuser=1') center/contain no-repeat",
															width: "50px",
															height: "50px",
															margin: "75px",
														}}
														onClick={handleImageClick}
													/>
												</div>
											)}
											<input
												type="file"
												accept="image/*"
												onChange={handleAvatarChange}
												style={{display: "none"}}
												ref={inputRef}
											/>
										</div>
									</div>
									<div className="submit-btns" style={{width: "50%"}}>
										<Button
											type="submit"
											sx={{
												"&:hover": {
													backgroundColor: "#C4DFAA",
													borderRadius: "50%",
												},
											}}
											style={{borderRadius: "50%", marginRight: "20px"}}
										>
											<img
												src="https://lh3.googleusercontent.com/pw/AIL4fc-3xQpJiaZjBqO_XVRbXL72fmvD2CFWD6RyH_eSf9QjQLW-goh1xgmQiOBi_PLzdnobv9_23suCZ9bCNuMP7t0mBpaJgOe3DYJTscILKoc-V_L0Um_zT0bDTUAl2bv7akoVD-prWiHDI0sE9XvW1mVc_OhEXPOXKydftpt6nZMMrqrG9NBJncNKd0WS7APhdjtpr1ymy8MoL7CPxhlPXWkw9wsgeHLBMXmvSNuUNmW6YmaE97v-ty22A1Ew9hBCGxiWvIe3rsTdtLgYSuaPFFn-FTVNSgAS8hm-PK9o7mb8sFasi4G5AJkH-KW4yNespD0t5CfBFTA6EQhNFWwwo3eIqktR3Ety8T0_4Ins-znu7wrwKdmGZLWYFqEV4HSqOlITF1xcHmDAYvyrpVbPJcchQIH7pZaE64SSqFkrcqtQPuZ-6Xajgdlo7EENbLn8nEgg3cG8Djw7LudC9hnegDMU3CQJ543ir0C7bRbafOFAbfWYvmxY9zz-y8H6TNEG0OqxglyGvaz11qXEhFvusshPCftQnC4z7DQ0eCpUKK57mZg49fuQsSRV_Grlzx9mGMadkEHNeYMo2rocZLYVvcuWhyM_W6n8J_qdUlMKz-jWdAmSUgUYMZsJBI8Y6RrtSVS66iEKxrpcBD9onHHN2RRZx6mF2m1geoBMTCYg6TKfzDtcd4yJdlXc7Q-CFqEJ82TiE_TshWVNbnAPklzkC735AVfu4Rqhd8ldUzB1yfGWRZ85Ns_Xryu5AfwAjcsTFuD_W5wqmfBzvNidXS3SCfCgr6-wYvflcZSfmNSI5TN-b7ML0cYfruvhsJpNARI7VP4YIjdeNWN6pLmPsFxrIWuEtnT7VYyYbqagC4A-FyKVd45TWNDGWOn4UcpJzKY-9kEmxDF0Z6fV1N97cbQfVnIB8IxgvQrYlOuD-GaOKaS6LWD7em1SvDtJoqxg=w96-h96-s-no?authuser=1"
												alt="Save icon"
												style={{
													width: "40px",
													height: "40px",
													backgroundColor: "#C4DFAA",
													padding: "10px",
													borderRadius: "50%",
												}}
											/>
										</Button>
										<Button
											onClick={() => navigate(-1)}
											sx={{
												"&:hover": {
													backgroundColor: "#FFBFA9",
													borderRadius: "50%",
												},
											}}
											style={{borderRadius: "50%"}}
										>
											<img
												src="https://lh3.googleusercontent.com/pw/AIL4fc-zTSvqbWAzESddOkvSXjPoyvO6TzozWVGnprdeZMcYwIINDKVUvgicP3Ka-QqP8wjkIRFRTj_wSg7jSdbJsZKRcxZdV4ztfOeqgDRcNjFpEW2R0Z9J7PUOwcE1v5nrfSJJoOiyWe7PdMHYnCaC2RHMn1QhQI3toUyVY4CNORs4HVqeDLriP6bgyExh35k112l1JVMxJaeX0obxlbnnaCcekA7R26U9m6TQIjhdPiokHSLXZBSG7J8U_nYQILw6deQzqKF_ByqX-rz5fRJ1A-hxDtG1nRnRizP3DlKpysyPh-gF6QdVG7mWTxx24zIdgO4mi_5HG0J-SKjMFZ8NkV8HubgvWrn0WLQSX3MLQ6n3Zs2PA8NGBJMT3LEzpdhQIzkUMU4uUPPed5UWD1MfjCH4czjKKrJvGxm7GLpKRXsckMzQvf-XuPFsQnOCv869Ph-DmOIgSkgRMXFEmCFQ-_57ohE2Ns2PjaRhIgbiLb5XF868-QNPFkBXKapr-3o_XQQxlFyYBtOYs7EPTY1uZidHs8Sabm_O9V6BQ4rIlmTEeCuEez_97mDqh_qnF6bu3ZWxJb_iSXZgmYUYo-4O4Si80sWqj7xqKMPd08jvHdXPyuIWrUJviHvE7OeCml-TMTWIqsd9DFiLxOPsKYm4w9qlk5L_RAEwz_NzIzCB8ygo6U6kKQ2pfmSCNeKMVeWUc5RbCyMCwrGRPmSRbLcd7hAYZEIDkRaGB8x2xSFQmBU5QRSMOuZl2ukMkqd9Rh7zG9cdBt__nDLamiYBbelBchE4rKT7bfz_fxs4HKliQoK69BdfsVUPPHgBz1-szVZ5YdZvhqd3lYHPKHdz-PJcj36PYPV97Q1howK-yEaDvBEUxcmCJlSX2K68iAat-i3xFhdYuMGAHYCjOi7EG9rPCK3RQGh8bNpetVp4gGSIFVzPX82JG_OHrcLWLfBb=w96-h96-s-no?authuser=1"
												alt="Cancel icon"
												style={{
													width: "40px",
													height: "40px",
													backgroundColor: "#FFBFA9",
													padding: "10px",
													borderRadius: "50%",
												}}
											/>
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
					<Notification message={notificationMessage} />
				</div>
			</div>
		</>
	);
};

export default PublishProductPage;
