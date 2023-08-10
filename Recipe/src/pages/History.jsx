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
								src="https://lh3.googleusercontent.com/pw/AIL4fc-c7jqzAzpGDhUVlxRsv4KOFHwE0oQHqfZki6ul3rbyPrYNvklULCu9zOlq-kAH4ubYB6Dj7lSSKj1BNh2t9XzqjeQzckJaREARILizEzVu3qN2_UWlMpQB-GaIVNq70beezAroPOQ1QBQrck8AZ7bvJKJeFnKHrOWormsIKhzW4688K0CfHeKUftw2EPrvolPSLtbYohAkbWGkJSLNU2VZoErLVEAVo-1fHyp3K5SlgHFYSGQHLMRhFgnBiyyuSc8ARqrjOYYrD-vtRMy0UAUe0jbIDyPr349HiydCSo237ii-a8-H-nmT0-x1uixg0yD4drlW0621a8ECdoTiQKkibw6y8_dgVHuZeuJmYjxEeOXNwIlp8kmZ-Iwkc_jQ8Y4s5nFiBda2Y5m3YGNn_PYtqWtYmGKcVdIqVXNRmgwqmCymzSVMWeap-3hhhlDHLU4P_qYS9jjr_nmrM9L0bHfvaTV1kZYxdhHA1cG6wWKZRLSno8rMM5rc1zsEyEzhPJC8W1y9qkINWpTuq_D9rESAgzWLcKI9u7uFIxzsjcSOxEnsEdbJdaiKC71-ASBCoYAX38B8I4o7CJh_ZH7xHsyBV8BQYGeL-9i_57GDDnOEqrc70QwUDSD6PAuCZVsw2Xb2qydwKSNofnxfBBTc9fKBqwjOGQtYE4cEMwwmG1DrMp5ENupk1USOX_tBDu3jCVQhjS03u4x7N4FOQoEL9OCc7cuY29gadsmLveeNMD01IxhPvcDFnLCQRgqaPP5kjGcDraEj7rjBQ5lfZa9ja4G9JAJyHIXiVE7kFAqltCbOKT9uPspmrWT7_0ryX6qKF3kEhyeMhLWusMH1zkQjwlGGRo9f0lYUgIMROH-RnfuIj4-tEFIdwnbkB4jPEVPWYUMzuShoTB3KROUMviUXB15RVxfxkSevGUQ3iLFoB5Z-pA1ut8Nwtd8VkE0B=w96-h96-s-no?authuser=1"
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
