/* eslint-disable react/prop-types */
import {
	Container,
	Typography,
	Box,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Button,
} from "@mui/material";
import { useState} from "react";
import "../components/styles/AboutUs.css";

const AboutInfo = ({info, isMobileView}) => {
	// console.log(info);
	const [showFullText, setShowFullText] = useState(false);
	const toggleShowFullText = () => {
		setShowFullText(!showFullText);
	};

	return (
		<>
			{/* Desktop View */}
			{!isMobileView && (
				<Container maxWidth="xl">
					<Box key={info.id}>
						<Grid sx={{position: "relative"}} spacing={2}>
							<CardMedia
								component="img"
								className={`card-media ${info.firstname.toLowerCase()}-avatar`}
								src={info.avatar}
								alt={info.firstName}
								sx={{
									width: 320,
									height: 320,
									position: "absolute",
									top: 0,
									left: 0,
									zIndex: 1,
									padding: "0px 50px 0px 50px",
								}}
							/>
							<Card
								className="info-grid flex-container box-shadow-card"
								sx={{
									position: "relative",
									display: "flex",
									height: 330,
								}}
							>
								<CardContent
									className="info-content"
									sx={{margin: "50px 40px 0px 400px"}}
								>
									<Typography
										variant="h5"
										component="h2"
										className="info-name info-item"
									>
										{info.firstname} {info.lastname}
									</Typography>
									<Typography
										variant="subtitle1"
										className="responsible info-item"
									>
										{info.responsible}
									</Typography>
									<Typography variant="body1" className="intro info-item">
										{info.intro}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Box>
				</Container>
			)}

			{/* Mobile View */}
			{isMobileView && (
				<Container maxWidth="xl">
					<Box key={info.id}>
						<Grid
							container
							spacing={3}
							display="flex"
							justifyContent="center"
							alignItems="center"
							sx={{padding: "20px 0px 0px 0px"}}
						>
							<Grid item xs={10} sm={8}>
								<Card>
									<CardMedia
										component="img"
										src={info.avatar}
										alt={info.firstName}
										sx={{height: 280}}
									/>
									<CardContent>
										<Typography
											variant="h5"
											component="div"
											className="mobile-name info-item"
										>
											{info.firstname} {info.lastname}
										</Typography>
										<Typography className="mobile-responsible info-item">
											{info.responsible}
										</Typography>
										<Typography
											variant="body2"
											className="mobile-intro info-item"
											sx={{
												display: "-webkit-box",
												WebkitLineClamp: showFullText ? "none" : 5, // Display up to four lines of text
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
											}}
										>
											{info.intro}
										</Typography>
									</CardContent>
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
								</Card>
							</Grid>
						</Grid>
					</Box>
				</Container>
			)}
		</>
	);
};

export default AboutInfo;
