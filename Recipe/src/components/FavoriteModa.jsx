/* eslint-disable react/prop-types */
import {useState} from "react";
import {
	Box,
	Button,
	IconButton,
	Modal,
	Typography,
	TextField,
	Divider,
	InputAdornment,
} from "@mui/material";
import {Close, Folder} from "@mui/icons-material";

const FavoriteModal = ({
	open,
	onClose,
	collections,
	selectedCollection,
	onCollectionSelect,
	onConfirmFavorite,
	onCreateCollection,
}) => {
	const [newCollectionName, setNewCollectionName] = useState(""); // Add the name of the favorite

	// Function to handle selecting favorites
	const handleSelectCollection = collectionId => {
		onCollectionSelect(collectionId);
	};

	// Function that handles confirming favorites
	const handleConfirmFavorite = () => {
		onConfirmFavorite(selectedCollection);
	};

	// Function to handle new favorites
	const handleCreateCollection = () => {
		onCreateCollection(newCollectionName);
		setNewCollectionName(""); // Clear the input box
	};

	// Render favorites list
	const renderCollections = () => {
		return collections.map(collection => (
			<Box
				key={collection.id}
				sx={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					py: 1,
					backgroundColor:
						collection.id === selectedCollection ? "lightgray" : "transparent",
				}}
				onClick={() => handleSelectCollection(collection.id)}
			>
				<Folder sx={{mr: 1, color: '#064635'}} />
				<Typography sx={{color:'#064635', fontWeight: '500'}}>{collection.name}</Typography>
			</Box>
		));
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					width: 300,
					padding: 2,
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					bgcolor: "background.paper",
					boxShadow: 24,
					borderRadius: 2,
				}}
			>
				<Typography
					variant="h6"
					component="div"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						color: "#EA5C2B",
						fontSize: "15px",
						fontFamily: "Poppins",
						fontWeight: "600",
					}}
				>
					Choose Folder
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
				</Typography>
				{renderCollections()}
				<Divider>
					<Typography
						variant="h6"
						sx={{
							color: "#A8A196",
							fontSize: "15px",
							fontWeight: "600",
						}}
					>
						Or
					</Typography>
				</Divider>
				<Typography
					sx={{
						color: "#EA5C2B",
						fontSize: "15px",
						fontFamily: "Poppins",
						fontWeight: "600",
					}}
				>
					Create New Folder
				</Typography>
				<TextField
					label="New Folder Name"
					value={newCollectionName}
					onChange={e => setNewCollectionName(e.target.value)}
					fullWidth
					sx={{mt: 2}}
					InputProps={{
						sx: {borderRadius: "20px", height: 55},
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="Search"
									onClick={handleCreateCollection}
									disableRipple
								>
									<img
										src="https://lh3.googleusercontent.com/pw/AIL4fc_yu4-GBwKlAnhsjLraJ_0qfncGbYKH1o3z5PmJcEYGlfMZlstzycopwYnpVcLliPGsCwByLYKR5ZFuKvdY714UnVdRrUGtOKJEaxrjrMNTb9IiJc9Fu0LJ1vsdQtoGDE9wBPeREeoMo8tabLZ1zHB1dRR7CznBPQu6xTVnTbXW4bCZsH_xtXX7buIns5eZL5-y06bHxLEu-JduWtCLt69uOviq6QESMwkJ1D6zchnN2BFUCx9zjmCcfbNo2Czoqqbh5Dod9xH0x048JxmHUMqTe90S7FIsbmz0aVQIr-WO44vtFCuLA0f85-KZAcrSVZVDls4EsMf2WZx3lY5caMUYb9YdizfBwKNCxrh8z0P1y6n7JLPOiD_oaY9w_4ruRoCj-ubV5mAx81uzEhqiQvEZfg4AWuC11sRaqKL_GCJWuQaGKNzeTfz2JxuX8OFCnzwPzjqPNy-6Mf26Z-hR5UJXe3DpVBBkPxFzx3ojIj5g9HBOWzzY1Fc7D-J5rAzXy0g84MInrQLy30MI2HYXL_Gk-esJMi0RvJbsa69m35sZzIphGfjoGUH0tM11BhtXn7M74yeBGNsCFF1rBH1UOKxLow5rNGkGpkD8T1pLydIhzznxhK15-4J8LHq9pVpsH3i-Pgc9eFTAC7DljJc0-hQp3CS0EFkm6f7dqDdw8uZEosvD18ZkKyRftMV2Kpfv3fBtihmT8R0hzTjVcv3sSTx1YnY7gN7mdrTdInMQI3731fOvq92EiQP6IESm2bCDvYIrIIvp7t2UQTUJt7kpHzRtS-GTJ-3eG4g2X3wzjUvwhA-aFNQYVgBQPLtp9zB1zNqVRMA_xOSFBCP_1HV6KuB9C13WNeyf5IoFfque0m-9KsdQryWcNmzZnspp57bUmMK9A4KWzAVftQGijjeQBaIhol-NOGjkKGMGiCoPqlc3TNI9XI_G7pOCAw-D=w96-h96-s-no?authuser=1"
										alt=""
										width="20"
										height="20"
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Box
					sx={{
						display: "flex",
						justifyContent: "right",
						alignItems: "right",
						mt: 2,
					}}
				>
					{/* <Button variant="contained" onClick={handleCreateCollection}>
						Create Folder
					</Button> */}
					<Button
						variant="contained"
						onClick={handleConfirmFavorite}
						disabled={!selectedCollection}
                        sx={{
							color: "#FF7F3F",
							fontFamily: "Poppins",
							fontWeight: "600",
							bgcolor: "#FFD8A9",
							"&:hover": {bgcolor: "#FF7F3F", color: "#FFD8A9"},
						}}
					>
						Confirm
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default FavoriteModal;
