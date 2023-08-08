/* eslint-disable react/prop-types */
import {Box, Grid, useMediaQuery} from "@mui/material";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import {IconButton} from "@mui/material";
// import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Main Carousel component
export default function ProductCardCarousel({products, isUser, load}) {
	const [randomProducts, setRandomProducts] = useState([]);
	const isMobileView = useMediaQuery("(max-width:959px)");

	// Function to shuffle an array
	const shuffleArray = array => {
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}
		return array;
	};

	useEffect(() => {
		// Shuffle the products array and select the first 6 items
		const shuffledProducts = shuffleArray(products);
		const selectedProducts = shuffledProducts.slice(0, 6);
		setRandomProducts(selectedProducts);
	}, [products]);
	// Custom arrow component for the previous button
const PrevArrow = props => {
	const {onClick} = props;
	return (
		<IconButton
			onClick={onClick}
			style={{position: "absolute", left: '-20px', top: "50%", zIndex: 1, display: isMobileView ? 'none': 'flex'}}
		>
			{/* <ChevronLeft /> */}
			<img src="src/assets/icons8-previous-96.png" alt="previous-icon" width="30" height="30"/>
		</IconButton>
	);
};

// Custom arrow component for the next button
const NextArrow = props => {
	const {onClick} = props;
	return (
		<IconButton
			onClick={onClick}
			style={{position: "absolute", right: '-2px', top: "50%", zIndex: 1,display: isMobileView ? 'none': 'flex' }}
		>
			{/* <ChevronRight /> */}
			<img src="src/assets/icons8-next-96.png" alt="next-icon" width="30" height="30"/>
		</IconButton>
	);
};

	const settings = {
		dots: isMobileView ? true : false, // Uncomment this line to display dots for navigation
		infinite: true,
		speed: 500,
		slidesToShow: isMobileView ? 1 : 4, // Number of slides to show at a time (adjust as needed)
		slidesToScroll: 1, // Number of slides to scroll at a time (adjust as needed)
		prevArrow: <PrevArrow />, // Custom previous button
		nextArrow: <NextArrow />, // Custom next button
		
	};

	return (
		<>
			<Box sx={{padding: "15px 40px"}}>
				{/* The Slider component with custom settings */}
				<Slider {...settings}>
					{/* Mapping through the randomly selected products */}
					{randomProducts.map(product => (
						<Grid item xs={4} md={4} key={product.id}>
							{/* Displaying the ProductCard component for each product */}
							<ProductCard product={product} isUser={isUser} load={load} />
						</Grid>
					))}
				</Slider>
			</Box>
		</>
	);
}