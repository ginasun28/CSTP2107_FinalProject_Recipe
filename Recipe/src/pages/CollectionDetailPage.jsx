import {useEffect, useState} from "react";
import ProductList from "@/components/ProductList.jsx";
import {Divider, IconButton, Menu, MenuItem, Typography, Box} from "@mui/material";
import api from "@/api/index.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const CollectionDetailPage = () => {
	const [products, setProducts] = useState([]);
	const [filterType, setFilterType] = useState("All");
	const {id} = useParams();
	const [anchorEl, setAnchorEl] = useState(null);
	const location = useLocation();
	const [folderName, setFolderName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Folder " + location.state.name + " content";

		// Get the latest recipe list
		api.getCollectionRecipes(id).then(res => {
			console.log("api.getCollectionRecipes:", res.recipes);
			setProducts(res.recipes);
		});

		const collectionName = location.state.name;
		setFolderName(collectionName);
		// console.log("name: ", collectionName)
	}, []);

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

	console.log("products:", products);
	console.log("Folder name: ", folderName);

	return (
		<Box m={1}>
			{/* Edited Filter */}
			<div
				style={{display: "flex", flexDirection: "row", alignItems: "center"}}
			>
				<IconButton onClick={() => navigate(-1)} disableRipple>
					<img
						src="https://lh3.googleusercontent.com/pw/AIL4fc8OCu8zc_A-99TxrnhAEZClu1zh0Wo5tVND45TWUw75_SNwh8GE5gavY_EfQ6CdlolFZAEb-W_-wrfloYlJMjx9ucoHw3Ul_o0DLwAC6Xt1Z5dMFcCru24Ge4p-X0P2q-Oepl_4u2tpWiKlkiidr5ZXmqmLCPnn2c3fIQZW_5dU4rRwJFbPYo1qxhIueJtSQeH16Rl2Nh6HJLunzK1VxBZup9vd1i-Id22DIcFiM4r-OYIQYVrsK798aeXr9e4qqWt-xWx4ubXWlViB5ZwzO-wog8ccOVLCHFPJstyy4o7hxfg8MIkoAw5kiEf5ZBxzIEhmmfEHO9yvBk0dabh-BTIIeAFojjfr-mV6565MRre54fXkAe7u35qJST0wO-x3L974vgYnDcLH6NFSuZ6h30pd7c4t7cEkBgZII0KQrXGvoA-Jj9x9qUQr1Rnk-c_LtZvbya1gXZS_qVChT48BbAEkKr7hma_dSTdvkG4lLuu73mekGkFaliZRQ0YhKbAx1k-lTBYcZgjE3A2oxB9iVcrRdTBV-_TRsedFwPqwQ6Z7sr8mqynqvMiC_thgm-mffEuXFGQzC9a9AGoUhtWzJn4RMEhpEAldUWeZ5yUi_bRFR9wPbDfiHAYxSsfiBjkIV-wQvA29EPnaZOIFBSGWoPrZMsjoaSjazjQozOser0RNdUMTeba8q136G83D03GW_TRRPamGT3KEBTYVZOGA9EJOpB-OzPewn2DVOIDthsFq-6TOdQPfYHnv0DlXoZYvOXJxd3CB_-ZBCsoH6IDK-CWlrIOewc4WJhj7LSJ9QMsCOqsKK6gA8XNd7iR6h3NtapnOUDxYls5R83dDruJ22BMEu_y07zFDutclwMO1Rq08Ifnx0FK7Fa878PoF2GBtFkkH4tTErn5W-FKZ0fRYL4ceevlZBL-6Qsk3ZcaHAZTK1WUXufzLkOu-XJg5=w96-h96-s-no?authuser=1"
						alt="Back btn"
						style={{width: "40px", height: "40px", borderRadius: "50%"}}
					/>
				</IconButton>

				<div style={{display: "flex", flexDirection: "column", width: "100%"}}>
					<Typography
						variant="h5"
						sx={{
							color: "#EA5C2B",
							fontSize: "1.25rem",
							fontFamily: "Poppins",
							fontWeight: "700",
							padding: "5px 0px 10px 0px",
						}}
					>
						{folderName}
					</Typography>
					<Divider
						sx={{
							height: "0.5px",
							background:
								"linear-gradient(90deg, rgba(229,171,107,1) 35%, rgba(249,248,247,1) 69%)",
						}}
					/>
				</div>

				<IconButton onClick={handleFilterClick}>
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
			{/* recipe list */}
			<div style={{padding: "0px 30px"}}>
				<ProductList products={filteredProducts} />
			</div>
		</Box>
	);
};

export default CollectionDetailPage;
