/* eslint-disable react/prop-types */
import {
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	Button,
} from "@mui/material";
import '../components/styles/ListCard.css'

export default function LIstCard({data}) {
	return (
		<>
			<Card
				sx={{
					display: "flex",
					width: 600,
					background: "rgba(255, 217, 102, 0.5)",
				}}
			>
				<Box sx={{position: "relative"}}>
					<Typography
						component="div"
						variant="h5"
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							zIndex: 1,
							padding: "10px",
                            color:'#E38B29',
                            background: 'linear-gradient(to left, rgba(253, 245, 202, 0.5), rgba(253, 245, 202, 4), rgba(253, 245, 202, 1))',
						}}
					>
						{data.tag}
					</Typography>
					<CardMedia
						component="img"
						sx={{width: 250, height: 250, flexShrink: 0}}
						src={data.image}
						alt="Recipe image"
					/>
				</Box>
				<Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
					<CardContent sx={{flex: "1 0 auto"}}>
						<Box className="card-save-container">
							<img
								src="/src/assets/icons8-save-96.png"
								alt=""
								className="card-icon"
							/>
						</Box>
						<Typography component="div" variant="h5">
							{data.title}
						</Typography>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							component="div"
						>
							{data.user}
						</Typography>
						<Typography sx={{fontSize: "16px"}} className="card-desc">
							{data.description}
						</Typography>
					</CardContent>
					<Box sx={{textAlign: "center", position: "relative", top: "-20px"}}>
						<Button className="read-more">Read More</Button>
					</Box>
				</Box>
			</Card>
		</>
	);
}
