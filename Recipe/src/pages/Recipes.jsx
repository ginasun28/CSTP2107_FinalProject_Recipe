import {useEffect, useState} from "react";
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
	"Appetizers",
	"Beverages",
	"Desserts",
	"Mains",
	"Side Dishes",
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
														src="https://lh3.googleusercontent.com/pw/AIL4fc-c7jqzAzpGDhUVlxRsv4KOFHwE0oQHqfZki6ul3rbyPrYNvklULCu9zOlq-kAH4ubYB6Dj7lSSKj1BNh2t9XzqjeQzckJaREARILizEzVu3qN2_UWlMpQB-GaIVNq70beezAroPOQ1QBQrck8AZ7bvJKJeFnKHrOWormsIKhzW4688K0CfHeKUftw2EPrvolPSLtbYohAkbWGkJSLNU2VZoErLVEAVo-1fHyp3K5SlgHFYSGQHLMRhFgnBiyyuSc8ARqrjOYYrD-vtRMy0UAUe0jbIDyPr349HiydCSo237ii-a8-H-nmT0-x1uixg0yD4drlW0621a8ECdoTiQKkibw6y8_dgVHuZeuJmYjxEeOXNwIlp8kmZ-Iwkc_jQ8Y4s5nFiBda2Y5m3YGNn_PYtqWtYmGKcVdIqVXNRmgwqmCymzSVMWeap-3hhhlDHLU4P_qYS9jjr_nmrM9L0bHfvaTV1kZYxdhHA1cG6wWKZRLSno8rMM5rc1zsEyEzhPJC8W1y9qkINWpTuq_D9rESAgzWLcKI9u7uFIxzsjcSOxEnsEdbJdaiKC71-ASBCoYAX38B8I4o7CJh_ZH7xHsyBV8BQYGeL-9i_57GDDnOEqrc70QwUDSD6PAuCZVsw2Xb2qydwKSNofnxfBBTc9fKBqwjOGQtYE4cEMwwmG1DrMp5ENupk1USOX_tBDu3jCVQhjS03u4x7N4FOQoEL9OCc7cuY29gadsmLveeNMD01IxhPvcDFnLCQRgqaPP5kjGcDraEj7rjBQ5lfZa9ja4G9JAJyHIXiVE7kFAqltCbOKT9uPspmrWT7_0ryX6qKF3kEhyeMhLWusMH1zkQjwlGGRo9f0lYUgIMROH-RnfuIj4-tEFIdwnbkB4jPEVPWYUMzuShoTB3KROUMviUXB15RVxfxkSevGUQ3iLFoB5Z-pA1ut8Nwtd8VkE0B=w96-h96-s-no?authuser=1"
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
