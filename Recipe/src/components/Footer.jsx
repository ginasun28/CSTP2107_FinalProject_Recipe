import {Link as RouterLink} from "react-router-dom";
import {Box, Typography, Link, IconButton} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "../components/styles/Footer.css";

const Footer = () => {
	function Copyright() {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{color: "#FDF5CA", padding: "10px 0px 5px 0px"}}
			>
				{"Copyright © "}
				{new Date().getFullYear()}{" "}
				<Link color="inherit" href="/">
					Epicurean Eats
				</Link>
				{"."}
			</Typography>
		);
	}
	return (
		<>
			<Box>
				<Box
					component="footer"
					sx={{
						bgcolor: "#F1A661",
						padding: "20px 0",
						textAlign: "center",
						// position: "fixed",
						// bottom: 0,
						// left: 0,
						// width: "100%",
					}}
				>
					<Typography
						variant="body2"
						color="text.primary"
						className="link-page-container"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<RouterLink
							to="/recipes"
							color="inherit"
							sx={{mx: 2}}
							className="footer-link"
						>
							Recipes
						</RouterLink>
						<Typography
							variant="body2"
							color="text.primary"
							sx={{color: "#FDF5CA"}}
						>
							{" | "}
						</Typography>
						<RouterLink
							to="/about_us"
							color="inherit"
							sx={{mx: 2}}
							className="footer-link"
						>
							About Us
						</RouterLink>
						<Typography
							variant="body2"
							color="text.primary"
							sx={{color: "#FDF5CA"}}
						>
							{" | "}
						</Typography>
						<RouterLink
							to="/about_us#ourteam"
							color="inherit"
							sx={{mx: 2}}
							className="footer-link"
						>
							Our Team
						</RouterLink>
					</Typography>

					{/* Copyright text */}
					<Copyright />

					{/* Social Media Icons */}
					<Box sx={{display: "flex", justifyContent: "center"}}>
						<IconButton
							component="a"
							href="https://www.facebook.com/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							color="inherit"
							sx={{color: "#FDF5CA", "&:hover": {color: "#FFDEDE"}}}
							disableRipple
						>
							<FacebookIcon />
						</IconButton>
						<IconButton
							component="a"
							href="https://www.twitter.com/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							color="inherit"
							sx={{color: "#FDF5CA", "&:hover": {color: "#FFDEDE"}}}
							disableRipple
						>
							<TwitterIcon />
						</IconButton>
						<IconButton
							component="a"
							href="https://www.instagram.com/yourcompany"
							target="_blank"
							rel="noopener noreferrer"
							color="inherit"
							sx={{color: "#FDF5CA", "&:hover": {color: "#FFDEDE"}}}
							disableRipple
						>
							<InstagramIcon />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Footer;
