import {useState} from "react";
import {
	Box,
	Container,
	Grid,
	TextField,
	IconButton,
	InputAdornment,
	Typography,
	Tooltip,
	Menu,
	MenuItem,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import NavBar from "../components/Navbar";
import "../components/styles/RecipesList.css";
// import ListCard from "../components/ListCard";
// import ReceipeContext from "../context/ReceipeContext";

const filters = [
	"Appetizers",
	"Beverages",
	"Desserts",
	"Salad",
	"Side Dishes",
  "Soup",
	"Mains",
];

export default function RecipesList() {
	// const { recipeData, setRecipeData } = useContext(ReceipeContext);

	// State to handle the filter dropdown menu
	const [anchorEl, setAnchorEl] = useState(null);

	// Function to open the filter dropdown menu
	const handleFilterClick = event => {
		setAnchorEl(event.currentTarget);
	};

	// Function to close the filter dropdown menu
	const handleCloseFilter = () => {
		setAnchorEl(null);
	};

	// Function to handle filter selection
	// const handleFilterSelection = () => {
	// 	// Here you can apply your filtering logic based on the selected filter.
	// 	// For example, you can update the `recipeData` state based on the selected filter.
	// 	// console.log("Selected filter:", filter);
	// 	setAnchorEl(null);
	// };

  const [selectedFilter, setSelectedFilter] = useState("");

  // Function to handle filter selection
  const handleFilterSelection = (filter) => {
    console.log("Selected filter:", filter);
    setSelectedFilter(filter); // Update the selected filter state with the selected value
    setAnchorEl(null);
  };

	return (
		<>
			<NavBar />
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
										sx={{width: 550}}
										InputProps={{
											sx: {borderRadius: "20px", height: 55},
											endAdornment: (
												<InputAdornment position="end">
													<IconButton aria-label="Search">
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
												{filters.map(filter => {
													// console.log("Filter:", filter);
													return (
														<MenuItem
															key={filter}
															onClick={() => handleFilterSelection(filter)}
															className="filter-icon"
														>
															<Typography textAlign="center" value={filter}>
																{filter}
															</Typography>
														</MenuItem>
													);
												})}
											</Menu>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Grid container>
					{/* <Grid item xs={6} sm={3} md={11} className="content">
              <Grid container spacing={2}>
                {recipeData.map(recipe => (
                  <Grid item xs={4} sm={6} md={6} key={recipe.id}>
                    <ListCard data={recipe} />
                  </Grid>
                ))}
              </Grid>
            </Grid> */}
					<Grid item xs={12} sm={6} className="half-trapezoid"></Grid>
				</Grid>
			</Container>
		</>
	);
}
