/* eslint-disable react/prop-types */
import {Box, Grid, useMediaQuery, IconButton} from "@mui/material";
import AboutInfo from "./AboutInfo";
import Slider from "react-slick";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {informations} from "../data/teamData"; // Import the informations array from teamData.js

const PrevArrow = props => {
	const {onClick} = props;
	return (
		<IconButton
			onClick={onClick}
			style={{position: "absolute", left: 0, top: "50%", zIndex: 1}}
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
			style={{position: "absolute", right: 0, top: "50%", zIndex: 1}}
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

export default function OurTeamCarousel() {
	const isMobileView = useMediaQuery("(max-width:959px)");
	const [infoData, setInfoData] = useState([]);

	useEffect(() => {
		getInfosData();
	}, []);

	const getInfosData = () => {
		const requiredData = informations.map(data => ({
			id: uuidv4(),
			avatar: data.avatar,
			firstname: data.firstname,
			lastname: data.lastname,
			responsible: data.responsible,
			intro: data.intro,
		}));
		setInfoData(requiredData);
	};

	const settings = {
		// dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1, // Number of slides to show at a time (adjust as needed)
		slidesToScroll: 1, // Number of slides to scroll at a time (adjust as needed)
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};
	return (
		<>
			<Box sx={{padding: "15px 40px 50px 40px"}}>
				<Box>
					<Slider {...settings}>
						{infoData.map(member => (
							<Grid item key={member.id}>
								<AboutInfo info={member} isMobileView={isMobileView} />
							</Grid>
						))}
					</Slider>
				</Box>
			</Box>
		</>
	);
}
