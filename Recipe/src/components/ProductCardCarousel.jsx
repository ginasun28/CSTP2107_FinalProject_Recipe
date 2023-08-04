/* eslint-disable react/prop-types */
import {Button, Typography, Container, Box, Grid} from "@mui/material";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import {IconButton} from "@mui/material";
// import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useEffect, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = props => {
	const {onClick} = props;
	return (
		<IconButton
			onClick={onClick}
			style={{position: "absolute", left: '-15px', top: "50%", zIndex: 1}}
		>
			{/* <ChevronLeft /> */}
			<img
				src="/src/assets/icons8-previous-96.png"
				alt="previous-icon"
				width="30"
				height="30"
			/>
		</IconButton>
	);
};

const NextArrow = props => {
	const {onClick} = props;
	return (
		<IconButton
			onClick={onClick}
			style={{position: "absolute", right: '-15px', top: "50%", zIndex: 1}}
		>
			{/* <ChevronRight /> */}
			<img
				src="/src/assets/icons8-next-96.png"
				alt="next-icon"
				width="30"
				height="30"
			/>
		</IconButton>
	);
};

export default function Carousel({products, isUser, load}) {
	const [randomProducts, setRandomProducts] = useState([]);

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

	const settings = {
		// dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4, // Number of slides to show at a time (adjust as needed)
		slidesToScroll: 1, // Number of slides to scroll at a time (adjust as needed)
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};
	return (
		<>
			<Box sx={{padding: '15px 40px'}}>
				<Slider {...settings}>
					{randomProducts.map(product => (
						<Grid item xs={4} md={4} key={product.id}>
							<ProductCard product={product} isUser={isUser} load={load} />
						</Grid>
					))}
				</Slider>
			</Box>
		</>
	);
}
