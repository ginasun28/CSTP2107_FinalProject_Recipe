import {useEffect, useState} from "react";
import api from "@/api/index.js";
import {
	Box,
	Button,
	Divider,
	Modal,
	Paper,
	TextField,
	Typography,
	Grid,
} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import "../components/styles/MyCollectionsPage.css";

const MyCollectionsPage = () => {
	const [collections, setCollections] = useState([]);
	const [user, setUser] = useLocalStorage("user", null);
	const [newCollectionName, setNewCollectionName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Favorite";
	}, []);

	useEffect(() => {
		if (!user) {
			navigate("/signin");
		}

		// Fetch user's collections from the server
		// Replace 'userId' with the actual user ID or fetch it from the authentication state
		api.getUserCollections(user.id).then(res => {
			setCollections(res.collections);
		});
	}, [user]);

	// Handler for creating a new collection
	const handleCreateCollection = () => {
		setIsModalOpen(true);
	};

	// Handler for confirming the new collection creation
	const handleConfirmCollectionCreation = () => {
		if (newCollectionName.trim() === "") {
			return;
		}

		api
			.createCollection({userId: user.id, name: newCollectionName})
			.then(res => {
				// Handle success or error
				console.log("New collection created successfully:", res);
				// Refresh collections after creating a new one
				api.getUserCollections(user.id).then(res => {
					setCollections(res.collections);
				});
			})
			.catch(error => {
				// Handle error
				console.error("Failed to create new collection:", error);
			});

		setNewCollectionName("");
		setIsModalOpen(false);
	};

	// Handler for closing the modal
	const handleCloseModal = () => {
		setNewCollectionName("");
		setIsModalOpen(false);
	};

	// Handler for deleting a collection
	const handleDeleteCollection = collectionId => {
		// Implement the logic to delete the collection with the provided collectionId
		console.log("Delete collection:", collectionId);
		api
			.deleteCollection(collectionId)
			.then(res => {
				// Handle success or error
				console.log("Collection deleted successfully:", res);
				// Refresh collections after deleting
				api.getUserCollections(user.id).then(res => {
					setCollections(res.collections);
				});
			})
			.catch(error => {
				// Handle error
				console.error("Failed to delete collection:", error);
			});
	};

	return (
		<>
			<Box m={3}>
				<Typography
					variant="h5"
					sx={{
						color: "#EA5C2B",
						fontSize: "25px",
						fontFamily: "Poppins",
						fontWeight: "700",
						padding: "5px 0px 10px 0px",
					}}
				>
					Create your favourite folder
				</Typography>
				<Divider
					className="folder-divider"
					sx={{
						height: "0.5px",
						background:
							"linear-gradient(90deg, rgba(229,171,107,1) 35%, rgba(249,248,247,1) 69%)",
					}}
				/>
				<Box sx={{padding: "20px 10px 30px 10px"}}>
					<Button
						variant="contained"
						onClick={handleCreateCollection}
						sx={{
							color: "#FF7F3F",
							fontFamily: "Poppins",
							fontWeight: "600",
							bgcolor: "#FFD8A9",
							"&:hover": {bgcolor: "#FF7F3F", color: "#FFD8A9"},
						}}
					>
						+ New Folder
					</Button>
				</Box>

				<Grid container spacing={2}>
					{/* Map over collections and render each one in a grid item */}
					{collections.map(collection => (
						<Grid item xs={4} sm={4} md={2} key={collection.id}>
							<Paper
								sx={{
									p: 2,
									mr: 2,
									bgcolor: "rgba(217, 217, 217, 0.34)",
									width: 150,
									height: 150,
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography
									variant="h6"
									onClick={() => {
										navigate("/collectionDetail/" + collection.id ,{state:{name: collection.name}});
									}}
									sx={{
										color: "#E38B29",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<img
										src="src/assets/icons8-cook-96.png"
										alt=""
										width="40"
										height="40"
									/>
									{collection.name}
								</Typography>
								<Box sx={{padding: "15px 10px 0px 10px"}}>
									<Button
										variant="contained"
										onClick={() => handleDeleteCollection(collection.id)}
										sx={{
											bgcolor: "#FFE6E6",
											color: "#EF4F4F",
											fontFamily: "Poppins",
											fontWeight: "600",
											fontSize: "13px",
											"&:hover": {bgcolor: "#EF4F4F", color: "#FFE6E6"},
										}}
									>
										Delete
									</Button>
								</Box>
							</Paper>
						</Grid>
					))}
				</Grid>

				<Modal open={isModalOpen} onClose={handleCloseModal}>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 300,
							p: 3,
							bgcolor: "background.paper",
							boxShadow: 24,
							borderRadius: "20px",
						}}
					>
						<Typography
							variant="h6"
							gutterBottom
							sx={{
								color: "#EA5C2B",
								fontSize: "18px",
								fontFamily: "Poppins",
								fontWeight: "600",
							}}
						>
							Enter Folder Name
						</Typography>
						<TextField
							label="Folder Name"
							value={newCollectionName}
							onChange={e => setNewCollectionName(e.target.value)}
							fullWidth
						/>
						<Box sx={{display: "flex", justifyContent: "flex-end", mt: 2}}>
							<Box sx={{padding: "0px 5px 0px 0px"}}>
								<Button
									variant="contained"
									onClick={handleCloseModal}
									sx={{
										mr: 1,
										bgcolor: "#FFE6E6",
										color: "#EF4F4F",
										fontFamily: "Poppins",
										fontWeight: "600",
										fontSize: "13px",
										"&:hover": {bgcolor: "#EF4F4F", color: "#FFE6E6"},
									}}
								>
									Cancel
								</Button>
							</Box>
							<Box>
								<Button
									variant="contained"
									onClick={handleConfirmCollectionCreation}
									sx={{
										color: "#FF7F3F",
										fontFamily: "Poppins",
										fontWeight: "600",
										bgcolor: "#FFD8A9",
										"&:hover": {bgcolor: "#FF7F3F", color: "#FFD8A9"},
									}}
								>
									Create
								</Button>
							</Box>
						</Box>
					</Box>
				</Modal>
			</Box>
		</>
	);
};

export default MyCollectionsPage;
