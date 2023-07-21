import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import "../components/styles/RecipesList.css";
import {
	// FormControl,
	// Select,
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
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import api from "@/api/index.js";
import ListCard from "../components/ListCard";

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
	const [anchorEl, setAnchorEl] = useState(null);
	const [products, setProducts] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("");
	const [filteredRecipes, setFilteredRecipes] = useState([]);

	useEffect(() => {
		//Get the latest recipe list
		api.getAllRecipe().then(res => {
			setProducts(res.latestRecipes);
		});
	}, []);

	// Handle the search box text change event
	const handleSearchTextChange = event => {
		setSearchText(event.target.value);
	};

	// Handle the search button click event
	const handleSearchButtonClick = () => {
		api.search({keyword: searchText, filterType: selectedFilter}).then(res => {
			setProducts(res);
            console.log(res);
		});
	};

	// Handles keyboard key events, and if the "Enter" key is pressed, perform a search operation
	const handleKeyPress = event => {
		if (event.key === "Enter") {
			handleSearchButtonClick();
		}
	};

    // filter icon function
	const handleFilterClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseFilter = () => {
		setAnchorEl(null);
	};

	const handleFilterSelection = filter => {
		setSelectedFilter(filter);

		// Filter the recipes based on the selected filter
		const filteredRecipes = products.filter(recipe =>
			filter === "All" ? true : recipe.type.includes(filter)
		);

		setFilteredRecipes(filteredRecipes);
		setAnchorEl(null);
	};
    // End of filter icon function

	return (
		<>
			<Navbar />
			{/* recipe list */}
			<Container maxWidth="xl">
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
														onClick={() => handleFilterSelection(filter)}
														className="filter-icon"
													>
														<Typography textAlign="center" value={filter}>
															{filter}
														</Typography>
													</MenuItem>
												))}
											</Menu>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Grid container>
					<Grid item xs={6} sm={3} md={11} className="content">
						<Grid container spacing={2}>
							{filteredRecipes.length > 0
								? filteredRecipes.map(recipe => (
										<Grid item xs={4} sm={6} md={6} key={recipe.id}>
											{/* Pass individual recipe as a prop to ListCard */}
											<ListCard product={recipe} />
										</Grid>
								))
								: products.map(recipe => (
										<Grid item xs={4} sm={6} md={6} key={recipe.id}>
											{/* Pass individual recipe as a prop to ListCard */}
											<ListCard product={recipe} />
										</Grid>
								))}
						</Grid>
					</Grid>
					<Grid item xs={12} sm={6} className="half-trapezoid"></Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Recipes;





