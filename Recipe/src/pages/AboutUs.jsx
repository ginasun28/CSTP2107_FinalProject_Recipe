import NavBar from "../components/Navbar";
import {Container, Typography, Box, Grid, useMediaQuery} from "@mui/material";
import AboutInfo from "../components/AboutInfo";
import Footer from "../components/Footer";
import "../components/styles/AboutUs.css";
import {v4 as uuidv4} from "uuid";
import {useEffect, useState} from "react";
import {informations} from "../data/teamData"; // Import the informations array from teamData.js

const AboutUs = () => {
	const [infoData, setInfoData] = useState([]);
	const isMobileView = useMediaQuery("(max-width:959px)");

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
	return (
		<>
			<NavBar />
			{!isMobileView && (
				<Container maxWidth="xl" className="about-container">
					<Box>
						<Typography className="about-title">About Us</Typography>
						<Box className="content-trapezoid">
							<Typography
								sx={{
									color: "#E86A33",
									padding: "80px 80px 40px 80px",
									fontSize: "22px",
									textIndent: "2em",
									textAlign: "justify",
									fontFamily: "Roboto",
								}}
							>
								Our group project revolves around creating a recipe website that
								aims to inspire and guide individuals in their culinary
								adventures. With a shared passion for cooking and a desire to
								share our favourite recipes with others, we joined forces to
								develop a platform that celebrates the joy of preparing
								delicious meals. Our website will serve as a one-stop
								destination for food enthusiasts, offering a diverse collection
								of recipes ranging from quick and easy weeknight dinners to
								gourmet dishes for special occasions. We believe in promoting a
								healthy and balanced approach to cooking, ensuring that our
								recipes cater to various dietary preferences and restrictions.
								Through this project, we hope to ignite a love for cooking in
								our audience and foster a vibrant community where people can
								connect, learn, and share their own culinary creations.
							</Typography>
						</Box>
					</Box>
					<Typography className="about-title" id="ourteam" name="ourteam">
						Our Team
					</Typography>
					<Grid item xs={6} sm={3} md={11} className="content">
						<Grid container spacing={2}>
							<Grid container spacing={2}>
								{infoData.map(info => (
									<Grid item key={info.id}>
										<AboutInfo info={info} />
									</Grid>
								))}
							</Grid>
						</Grid>
					</Grid>
				</Container>
			)}
			{isMobileView && (
				<Container maxWidth="xl" className="about-container">
					<Box sx={{padding: "0px 0px 25px 0px"}}>
						<Grid item xs={8}>
							<Typography className="about-title">About Us</Typography>
							<Box>
								<Typography
									sx={{
										color: "#E86A33",
										// padding: "80px 80px 40px 80px",
										fontSize: "15px",
										textIndent: "2em",
										textAlign: "justify",
										fontFamily: "Roboto",
										fontWeight: 500,
									}}
									className="about-content"
								>
									Our group project revolves around creating a recipe website
									that aims to inspire and guide individuals in their culinary
									adventures. With a shared passion for cooking and a desire to
									share our favourite recipes with others, we joined forces to
									develop a platform that celebrates the joy of preparing
									delicious meals. Our website will serve as a one-stop
									destination for food enthusiasts, offering a diverse
									collection of recipes ranging from quick and easy weeknight
									dinners to gourmet dishes for special occasions. We believe in
									promoting a healthy and balanced approach to cooking, ensuring
									that our recipes cater to various dietary preferences and
									restrictions. Through this project, we hope to ignite a love
									for cooking in our audience and foster a vibrant community
									where people can connect, learn, and share their own culinary
									creations.
								</Typography>
							</Box>
						</Grid>
						<Typography className="about-title" id="ourteam" name="ourteam">
							Our Team
						</Typography>
						<Grid item xs={6}>
							<Grid container spacing={2}>
								{infoData.map(info => (
									<Grid item key={info.id}>
										<AboutInfo info={info} isMobileView={isMobileView} />
									</Grid>
								))}
							</Grid>
						</Grid>
					</Box>
				</Container>
			)}
			<Footer />
		</>
	);
};

export default AboutUs;
