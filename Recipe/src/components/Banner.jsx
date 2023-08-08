import {
	Typography,
	Box,
	Avatar,
	useMediaQuery,
	ImageList,
	ImageListItem,
} from "@mui/material";
import "../components/styles/Banner.css";
import {useState, useEffect} from "react";

const images = [
	"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGZvb2R8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1560512823-829485b8bf24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
];

const slogans = [
	"Discover the art of delicious recipes",
	"Ignite your taste buds with our recipe collection",
	"Embark on a culinary journey like no other",
];

const Banner = () => {
	const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSloganIndex(prevIndex => (prevIndex + 1) % slogans.length);
		}, 8000);

		return () => clearInterval(timer);
	}, []);

	// Use the useMediaQuery hook to detect mobile view
	const isMobileView = useMediaQuery("(max-width:959px)");

	return (
		<>
			{/* desktop view */}
			{!isMobileView && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#FDEEDC",
						gap: "10px",
						padding: "30px 0px 100px 0px",
					}}
					className="banner-container"
				>
					<Box sx={{display: "flex", padding: "50px 0px"}}>
						{images.slice(0, 3).map((imageUrl, index) => (
							<Avatar
								key={index}
								src={imageUrl}
								sx={{
									width: "250px",
									height: "250px",
									borderRadius: "50%",
									overflow: "hidden",
								}}
								className={`avatar-${index}`} // Add the classname based on the index
							/>
						))}
					</Box>
					<Typography
						sx={{
							fontSize: "1.875rem",
							fontFamily: "Roboto",
							fontWeight: "600",
							color: "#E38B29",
							width: 300,
						}}
					>
						{slogans[currentSloganIndex]}
					</Typography>
				</Box>
			)}
			{/* mobile view */}
			{isMobileView && (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#FDEEDC",
						// gap: "10px",
						padding: "10px 0px 20px 0px",
						bgcolor: "#FDEEDC",
						position: "relative",
					}}
				>
					{/* <Grid container spacing={2}>
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									padding: "0px 20px",
									flexDirection: isMobileView ? "column" : "row",
								}}
							>
								<ImageList sx={{width: "100%", gap: 10}} cols={2}>
									{images.map((imageUrl, index) => (
										<ImageListItem key={index} sx={{borderRadius: "50%"}}>
											<img src={imageUrl} alt={`Image ${index}`} />
										</ImageListItem>
									))}
								</ImageList>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Typography
								sx={{
									fontSize: "1rem",
									fontFamily: "Roboto",
									fontWeight: "600",
									color: "#E38B29",
									textAlign: "center",
								}}
							>
								{slogans[currentSloganIndex]}
							</Typography>
						</Grid>
					</Grid> */}
					<Box
						sx={{
							display: "flex",
							padding: "0px 20px",
							flexDirection: isMobileView ? "column" : "row",
							position: "relative",
						}}
					>
						<ImageList sx={{width: "100%", gap: 10}} cols={2}>
							{images.map((imageUrl, index) => (
								<ImageListItem
									key={index}
									sx={{borderRadius: "50%", position: "relative"}}
								>
									<img src={imageUrl} alt={`Image ${index}`} />
								</ImageListItem>
							))}
						</ImageList>
						<Box
							sx={{
								zIndex: 1,
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -70%)",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								background: 'rgba(249, 243, 223, 0.8)',
								borderRadius: '10px',
							}}
						>
							<Typography
								sx={{
									fontSize: "0.938rem",
									fontFamily: "Roboto",
									fontWeight: "600",
									color: "#E38B29",
									padding: '20px 30px',
									width: 150,
									textAlign: "center",
									textJustify:'inter-word'
									
								}}
							>
								{slogans[currentSloganIndex]}
							</Typography>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Banner;
