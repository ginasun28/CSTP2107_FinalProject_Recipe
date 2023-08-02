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
										src="/src/assets/icons8-add.png"
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
