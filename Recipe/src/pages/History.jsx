import {useEffect, useState} from "react";
import ProductList from "@/components/ProductList.jsx";
import {
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Box,
} from "@mui/material";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useLocation} from "react-router-dom";

import "../components/styles/RecentRecipe.css";

const History = () => {
	const [products, setProducts] = useState([]);
	const [filterType, setFilterType] = useState("All");
	const [user, setUser] = useLocalStorage("user", null);
	const location = useLocation();
	const id = new URLSearchParams(location.search).get("id");
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		document.title = "History";
	}, []);

	useEffect(() => {
		document.title = "History";
	}, []);

	useEffect(() => {
		load();
	}, []);

	const load = () => {
		if (id) {
			api.getUserRecipes(id).then(res => {
				setProducts(res.userRecipes);
			});
		} else {
			// Get the latest recipe list
			api.getUserRecipes(user.id).then(res => {
				setProducts(res.userRecipes);
			});
		}
	};
	// Handle filter type change event
	const handleFilterTypeChange = filter => {
		setFilterType(filter);
		handleCloseFilter();
	};

	// Filter based on search text and filter type
	const filteredProducts = products.filter(product => {
		return filterType === "All" || product.type === filterType;
	});

	// Filter option
	const handleFilterClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseFilter = () => {
		setAnchorEl(null);
	};

	const types = [
		"All",
		"Appetizers",
		"Beverages",
		"Desserts",
		"Mains",
		"Side Dishes",
	];

	return (
		<Box m={2}>
			<div
				style={{padding: "0px 30px", display: "flex", flexDirection: "column"}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingRight: "50px",
					}}
				>
					{/* <h3 className='recipe-title' style={{margin: '0px 0px'}}>Recent</h3> */}
					<Typography
						variant="h5"
						className="recipe-title"
						sx={{
							fontSize: "25px",
							fontWeight: "700",
							padding: "0px 0px 10px 0px",
						}}
					>
						Recent
					</Typography>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						{/* Edited Filter version */}
						<IconButton onClick={handleFilterClick} disableRipple>
							<img
								src="src/assets/icons8-filter-96 (2).png"
								alt="Filter icon"
								style={{width: "35px", height: "35px"}}
							/>
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleCloseFilter}
						>
							{types.map(filter => {
								return (
									<MenuItem
										key={filter}
										onClick={() => handleFilterTypeChange(filter)}
										value={filter}
									>
										<Typography textAlign="center">{filter}</Typography>
									</MenuItem>
								);
							})}
						</Menu>
					</div>
				</div>
			</div>
			<Divider
				sx={{
					height: "0.5px",
					// width: "90%",
					marginLeft: "30px",
					// Error..might have to customize and change the inner props
					background:
						"linear-gradient(90deg, rgba(229,171,107,1) 35%, rgba(249,248,247,1) 69%)",
				}}
			/>

			<div style={{padding: "0px 30px"}}>
				{/* recipe list */}
				<ProductList
					products={filteredProducts}
					isUser={id === user?.id || !id}
					load={load}
				/>
			</div>
		</Box>
	);
};

export default History;
