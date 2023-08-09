import {Box, Grid, Typography, Paper} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import '../components/styles/NotFound.css';

const NotFound = () => {
	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
                margin="auto"
			>
				<Grid
					container
					justify="center"
					alignItems="center"
					spacing={4}
					className="not-found"
				>
					<Grid item xs={12} sm={8} md={6}>
						<Paper elevation={3} className="not-found-paper">
							<ErrorOutlineIcon className="not-found-icon" />
							<Typography variant="h4" component="h1" gutterBottom>
								Oops! Page Not Found
							</Typography>
							<Typography variant="body1" component="p">
								The page you are looking for does not exist.
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default NotFound;
