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
													src="./src/assets/icons8-add.png"
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
																"url('./src/assets/icons8-add-96.png') center/contain no-repeat",
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
												src="./src/assets/icons8-save-96 (5).png"
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
												src="./src/assets/icons8-cancel-96.png"
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
