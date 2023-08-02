import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import RecipesList from "@/components/RecipesList.jsx";
import "../components/styles/RecipesList.css";
import {
	Box,
	Container,
	Grid,
	TextField,
	IconButton,
	InputAdornment,
	Typography,
	Menu,
	MenuItem,
	Tooltip,
	useMediaQuery,
	// FormControl,
	// Select,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import api from "@/api/index.js";

const types = [
	"All",
	"Breakfast",
	"Lunch",
	"Dinner",
	"Desserts",
	"Salad",
	"Snack",
	"Side Dishes",
	"Soup",
];

const Recipes = () => {
	const [products, setProducts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filterType, setFilterType] = useState("All");
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		//Get the latest recipe list
		api.getAllRecipe().then(res => {
			setProducts(res.latestRecipes);
		});
	}, []);

	// Call the custom hook to update the page title
	useEffect(() => {
		document.title = "Recipes";
	}, []);

	// Handle the search box text change event
	const handleSearchTextChange = event => {
		setSearchText(event.target.value);
	};

	const handleFilterClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseFilter = () => {
		setAnchorEl(null);
	};
	// Handle filter type change event
	const handleFilterTypeChange = filter => {
		setFilterType(filter);
		handleCloseFilter();
		// Add any additional logic here if you want to perform filtering based on the selected value.
	};

	// Filter based on search text and filter type
	const filteredProducts = products.filter(product => {
		return filterType === "All" || product.type === filterType;
	});

	// Handle the search button click event
	const handleSearchButtonClick = () => {
		// search bar not working for search by type
		api.search({keyword: searchText, filterType: filterType}).then(res => {
			setProducts(res);
		});
	};

	// Handles keyboard key events, and if the "Enter" key is pressed, perform a search operation
	const handleKeyPress = event => {
		if (event.key === "Enter") {
			handleSearchButtonClick();
		}
	};

	// Use the useMediaQuery hook to detect mobile view
	const isMobileView = useMediaQuery("(max-width:959px)");

	return (
		<>
			<Navbar />

			<Container maxWidth="xl">
				{/* Search bar and filter for desktop view */}
				{!isMobileView && (
					<Box sx={{padding: "45px 0px 0px 30px"}}>
						<Grid>
							<Grid item xs={6} sm={3} md={11}>
								<Grid container spacing={2} alignItems="center">
									<Grid
										item
										xs={4}
										sm={6}
										md={6}
										className="filter-icon-container"
									>
										<TextField
											label="Search"
											variant="outlined"
											value={searchText}
											onChange={handleSearchTextChange}
											onKeyPress={handleKeyPress}
											sx={{width: 550}}
											InputProps={{
												sx: {borderRadius: "20px", height: 55},
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="Search"
															onClick={handleSearchButtonClick}
														>
															<SearchIcon />
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{/* filter dropdown list V2 */}
										<Box>
											<Tooltip title="Find tags">
												<IconButton
													aria-label="Filter"
													onClick={handleFilterClick}
													classes={{root: "custom-icon-button"}}
													disableRipple
												>
													<img
														src="src/assets/icons8-filter-96 (2).png"
														alt=""
														style={{width: "35px", height: "35px"}}
													/>
												</IconButton>
											</Tooltip>
											<Box sx={{flexGrow: 0}}>
												<Menu
													sx={{mt: "5px"}}
													id="menu-appbar"
													anchorEl={anchorEl}
													open={Boolean(anchorEl)}
													onClose={handleCloseFilter}
												>
													{types.map(filter => (
														<MenuItem
															key={filter}
															onClick={() => handleFilterTypeChange(filter)}
															className="filter-icon"
															value={filter}
														>
															<Typography textAlign="center">
																{filter}
															</Typography>
														</MenuItem>
													))}
												</Menu>
											</Box>
										</Box>
										{/* End of filter dropdown list V2 */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				)}

				{/* Search bar and filter for mobile view */}
				{isMobileView && (
					<Box sx={{padding: "20px 10px 20px 15px"}}>
						<Grid>
							<Grid item xs={8} sm={3}>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={12} className="filter-icon-container">
										<TextField
											label="Search"
											variant="outlined"
											value={searchText}
											onChange={handleSearchTextChange}
											onKeyPress={handleKeyPress}
											sx={{width: "500px"}}
											InputProps={{
												sx: {borderRadius: "20px", height: 55},
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="Search"
															onClick={handleSearchButtonClick}
														>
															<SearchIcon />
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{/* filter dropdown list V2 */}
										<Box>
											<Tooltip title="Find tags">
												<IconButton
													aria-label="Filter"
													onClick={handleFilterClick}
													classes={{root: "custom-icon-button"}}
													disableRipple
												>
													<img
														src="src/assets/icons8-filter-96 (2).png"
														alt=""
														style={{width: "35px", height: "35px"}}
													/>
												</IconButton>
											</Tooltip>
											<Box sx={{flexGrow: 0}}>
												<Menu
													sx={{mt: "5px"}}
													id="menu-appbar"
													anchorEl={anchorEl}
													open={Boolean(anchorEl)}
													onClose={handleCloseFilter}
												>
													{types.map(filter => (
														<MenuItem
															key={filter}
															onClick={() => handleFilterTypeChange(filter)}
															className="filter-icon"
															value={filter}
														>
															<Typography textAlign="center">
																{filter}
															</Typography>
														</MenuItem>
													))}
												</Menu>
											</Box>
										</Box>
										{/* End of filter dropdown list V2 */}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				)}
				<Grid container>
					<RecipesList products={filteredProducts} />
				</Grid>
			</Container>
		</>
	);
};

export default Recipes;
