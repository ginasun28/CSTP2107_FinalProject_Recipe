import "../components/styles/styles.css";
import "../components/styles/Home.css";
import {Button, Typography, Container, Box, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Banner from "../components/Banner";
import Carousel from "../components/ProductCardCarousel";
import OurTeamCarousel from "../components/OurTeamCarousel";
import api from "@/api/index.js";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [filterType] = useState("All");
	const [showFullText, setShowFullText] = useState(false);
	const navigate = useNavigate();
	// Use the useMediaQuery hook to detect mobile view
	const isMobileView = useMediaQuery("(max-width:959px)");

	const aboutUs =
		"Our group project revolves around creating a recipe website that aims to inspire and guide individuals in their culinary adventures. With a shared passion for cooking and a desire to share our favourite recipes with others, we joined forces to develop a platform that celebrates the joy of preparing delicious meals. Our website will serve as a one-stop destination for food enthusiasts, offering a diverse collection of recipes ranging from quick and easy weeknight dinners to gourmet dishes for special occasions. We believe in promoting a healthy and balanced approach to cooking, ensuring that our recipes cater to various dietary preferences and restrictions. Through this project, we hope to ignite a love for cooking in our audience and foster a vibrant community where people can connect, learn, and share their own culinary creations.";

	// Call the custom hook to update the page title
	useEffect(() => {
		document.title = "Epicurean Eats";
	}, []);

	useEffect(() => {
		//Get the latest recipe list
		api.getAllRecipe().then(res => {
			setProducts(res.latestRecipes);
		});
	}, []);

	// Filter based on search text and filter type
	const filteredProducts = products.filter(product => {
		return filterType === "All" || product.type === filterType;
	});

	const handleRecipeLinkClick = () => {
		navigate("/recipes"); // Path to jump to the recipes interface
	};

	const toggleShowFullText = () => {
		setShowFullText(!showFullText);
	};

	return (
		<>
			<Banner />
			<Container maxWidth="xl" className="home-container">
				<Box sx={{padding: "35px 0px 0px 0px"}}>
					<Typography
						sx={{
							color: "#F1A661",
							fontFamily: "Roboto",
							fontSize: "27px",
							fontWeight: 600,
							display: "flex",
							justifyContent: "center",
							padding: "0px 0px 10px 0px",
						}}
					>
						Recipes
					</Typography>
					<Box sx={{padding: isMobileView ? "20px 0px" : "0px 0px"}}>
						<Carousel products={filteredProducts} />
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						padding: "5px 0px 20px 0px",
					}}
				>
					<Button
						onClick={handleRecipeLinkClick}
						sx={{
							color: "#F0997D",
							bgcolor: "#FFD8A9",
							textTransform: "capitalize",
							fontFamily: "Poppins",
							fontWeight: 600,
							padding: "15px 18px",
							fontSize: "15px",
							borderRadius: "15px",
							"&:hover": {color: "#FFD8A9", bgcolor: "#F0997D"},
						}}
					>
						Find more recipes? Click me!
					</Button>
				</Box>
				<Box sx={{padding: isMobileView ? "15px 0px":"30px 0px"}}>
					<Box sx={{padding: isMobileView ? "15px 0px":"30px 0px", bgcolor: "#FDEEDC"}}>
						<Typography
							sx={{
								display: "flex",
								justifyContent: "center",
								color: "#E38B29",
								fontFamily: "Roboto",
								fontSize: "1.688rem",
								fontWeight: 600,
								padding: isMobileView ? "0px 0px 10px 0px":"0px 0px 20px 0px",
							}}
						>
							About Us
						</Typography>
						<Box className="aboutus-container">
							<Typography
								sx={{
									color: "#E86A33",
									padding: isMobileView
										? "0px 20px 0px 20px"
										: "0px 80px 40px 80px",
									fontSize: isMobileView ? "1.125rem" : "1.375rem",
									textIndent: "2em",
									textAlign: "justify",
									fontFamily: "Roboto",
									fontWeight: 400,
									display: "-webkit-box",
									WebkitLineClamp: showFullText ? "none" : 5,
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
								}}
							>
								{aboutUs}
							</Typography>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									padding: "10px 20px",
								}}
							>
								{isMobileView && (
									<Button
										onClick={toggleShowFullText}
										sx={{
											color: "#F0997D",
											bgcolor: "#FFD8A9",
											fontWeight: 600,
											fontFamily: "Poppins",
											textTransform: "capitalize",
										}}
									>
										{showFullText ? "View Less" : "View More"}
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
				<Box sx={{padding: isMobileView ? "10px 0px 15px 0px":"20px 0px 30px 0px"}}>
					<Typography
						sx={{
							display: "flex",
							justifyContent: "center",
							color: "#E38B29",
							fontFamily: "Roboto",
							fontSize: "1.688rem",
							fontWeight: 600,
						}}
					>
						Our Team
					</Typography>
					<OurTeamCarousel />
				</Box>
			</Container>
		</>
	);
}
