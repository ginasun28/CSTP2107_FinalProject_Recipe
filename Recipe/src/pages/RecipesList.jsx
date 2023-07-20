import {useContext, useState} from "react";
import {
	Box,
	Container,
	Grid,
	TextField,
	IconButton,
	InputAdornment,
  Typography,
  Popover,
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import NavBar from '../components/Navbar'
import '../components/styles/RecipesList.css'
import ListCard from '../components/ListCard';
import ReceipeContext from "../context/ReceipeContext";

export default function RecipesList() {
	const {recipeData, setRecipeData} = useContext(ReceipeContext);
   // State to handle the filter dropdown menu
   const [anchorEl, setAnchorEl] = useState(null);

   // Function to open the filter dropdown menu
   const handleFilterClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   // Function to close the filter dropdown menu
   const handleCloseFilter = () => {
     setAnchorEl(null);
   };

	return (
		<>
			<NavBar />
			<Container maxWidth="xl">
				<Box sx={{padding: "45px 0px 0px 30px"}}>
        <Grid>
            <Grid item xs={6} sm={3} md={11}>
              <Grid container spacing={2} alignItems="center"> {/* Add alignItems="center" to align items vertically */}
                <Grid item xs={4} sm={6} md={6} className="filter-icon-container"> {/* Add the filter icon container class */}
                  <TextField
                    label="Search"
                    variant="outlined"
                    sx={{ width: 550 }}
                    InputProps={{
                      sx: { borderRadius: "20px", height: 55 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton aria-label="Search">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{}}>
                    <IconButton
                      aria-label="Filter"
                      onClick={handleFilterClick} // Open the dropdown menu on click
                    >
                      <img
                        src="src/assets/icons8-filter-96 (2).png"
                        alt=""
                        style={{ width: "24px", height: "24px" }} // Add appropriate width and height
                      />
                    </IconButton>
                    {/* Add the dropdown menu */}
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleCloseFilter} // Close the dropdown menu on click outside
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {/* Dropdown menu content */}
                      <Box sx={{ p: 2 }}>
                        <Typography>Appetizers</Typography>
                        <Typography>Beverages</Typography>
                        <Typography>Desserts</Typography>
                        <Typography>Salad</Typography>
                        <Typography>Side Dishes</Typography>
                        <Typography>Mains</Typography>
                        {/* Add more filter options here */}
                      </Box>
                    </Popover>
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
