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
	useMediaQuery,
} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import "../components/styles/MyCollectionsPage.css";

const MyCollectionsPage = () => {
	const [collections, setCollections] = useState([]);
	const [user, setUser] = useLocalStorage("user", null);
	const [newCollectionName, setNewCollectionName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 3;

	const isMobileView = useMediaQuery("(max-width:959px)");
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
						fontSize: "1.25rem",
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
				{!isMobileView && (
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
											navigate("/collectionDetail/" + collection.id, {
												state: {name: collection.name},
											});
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
											src="https://lh3.googleusercontent.com/pw/AIL4fc94jtHZvKR5pb4FdIWCg78i3cA6Vi-TNP2-R0Q172VadskhkYBxUK4RsgPkWXvN5u6eOLritDck99iHbpL_kglcb7cN2mSlx9BJbNTvkAx2MPFIbhesQW2dVEp3__qq2yo1iVriLvkQrEIfbLn7a1COvI3UWFNcAyq0yDI0PejIzws-A4s3qdgmmc-9NbCxB_4rSfUskC_tQ2CgZn3Zia__6bYoAV9qCmKGfHOWjJBZQRdnFzxxSaRbUDJHMZI56LWxkyRWpM_VFQzgmBTQYIeXK4otPBv0G7laol28SKFnTyPUHvqNMfpWyTBvdoqqsBVN5jTQg9MkDI98S20wIVIqeulO25Kcm8H4ohQMro5YlqI5WWe_sR5GwYiXaAQqSk97Ks9kURUklt3K0FSrpIR-SQP3yTy9YDImdxklYfspGoKMVgqVZFWnXEAlpEN3-LJfzgxaMMc2kgEppBSBRLsH9NbJLzexBjrWro-uWmsF3-0Be7gh7zWK9TSDvztoLZZf_rgBcsji0fjjCLkmptSrBeXrygNtjer0oIPqy3MS0e-48G7t6Hh2T8ROwqLAZWE_Ksy35v4Zk15nswuGZ9thPYQsbTdOfzSza6oUtc8HNBnasdN_5tiQLI-L1L5KOk8Oifk8c7WpPss2d8-d_Di_5ZZ-K2qPx445y0ThDy2NalZNIlIYbAUPf266miH2g9yrJR54SyblGwitBXX0ogyntL-Vd80W_SxbU3hW8wGcpZD-BOWCHCVyvtqGJ0tO10NP-2brh_WY9xoCdVvqbdk57gBDyj8Sar1t0zEq2wg7eym6ZWMhvW_6iaNvjNp10nhmq_lPD7LJUtMkC_kDPIyBulSG6wXyx_0GGs2s8wiZB_K2zRMUMFI-zFdzUrSg5l148jYS_hs_zvmn7HqMJoGP_hNypdbdu7nC7sh0-rbZLGZ80OJc09L6xdfY=w96-h96-s-no?authuser=1"
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
				)}
				{/* Mobile view */}
				{isMobileView && (
					<>
						<Grid container spacing={2}>
							{/* Map over collections and render each one in a grid item */}
							{collections
								.slice(
									currentPage * itemsPerPage,
									(currentPage + 1) * itemsPerPage
								)
								.map(collection => (
									<Grid
										item
										xs={12}
										key={collection.id}
										sx={{
											justifyContent: "center",
											display: "flex",
											alignItems: "center",
										}}
									>
										<Paper
											sx={{
												p: 2,
												mr: 2,
												bgcolor: "rgba(217, 217, 217, 0.34)",
												width: 270,
												height: 45,
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Box
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<Typography
													variant="h6"
													onClick={() => {
														navigate("/collectionDetail/" + collection.id, {
															state: {name: collection.name},
														});
													}}
													sx={{
														color: "#E38B29",
														display: "flex",
														// flexDirection: "column",
														// justifyContent: "center",
														alignItems: "center",
														padding: "0px 0px",
													}}
												>
													<img
														src="https://lh3.googleusercontent.com/pw/AIL4fc94jtHZvKR5pb4FdIWCg78i3cA6Vi-TNP2-R0Q172VadskhkYBxUK4RsgPkWXvN5u6eOLritDck99iHbpL_kglcb7cN2mSlx9BJbNTvkAx2MPFIbhesQW2dVEp3__qq2yo1iVriLvkQrEIfbLn7a1COvI3UWFNcAyq0yDI0PejIzws-A4s3qdgmmc-9NbCxB_4rSfUskC_tQ2CgZn3Zia__6bYoAV9qCmKGfHOWjJBZQRdnFzxxSaRbUDJHMZI56LWxkyRWpM_VFQzgmBTQYIeXK4otPBv0G7laol28SKFnTyPUHvqNMfpWyTBvdoqqsBVN5jTQg9MkDI98S20wIVIqeulO25Kcm8H4ohQMro5YlqI5WWe_sR5GwYiXaAQqSk97Ks9kURUklt3K0FSrpIR-SQP3yTy9YDImdxklYfspGoKMVgqVZFWnXEAlpEN3-LJfzgxaMMc2kgEppBSBRLsH9NbJLzexBjrWro-uWmsF3-0Be7gh7zWK9TSDvztoLZZf_rgBcsji0fjjCLkmptSrBeXrygNtjer0oIPqy3MS0e-48G7t6Hh2T8ROwqLAZWE_Ksy35v4Zk15nswuGZ9thPYQsbTdOfzSza6oUtc8HNBnasdN_5tiQLI-L1L5KOk8Oifk8c7WpPss2d8-d_Di_5ZZ-K2qPx445y0ThDy2NalZNIlIYbAUPf266miH2g9yrJR54SyblGwitBXX0ogyntL-Vd80W_SxbU3hW8wGcpZD-BOWCHCVyvtqGJ0tO10NP-2brh_WY9xoCdVvqbdk57gBDyj8Sar1t0zEq2wg7eym6ZWMhvW_6iaNvjNp10nhmq_lPD7LJUtMkC_kDPIyBulSG6wXyx_0GGs2s8wiZB_K2zRMUMFI-zFdzUrSg5l148jYS_hs_zvmn7HqMJoGP_hNypdbdu7nC7sh0-rbZLGZ80OJc09L6xdfY=w96-h96-s-no?authuser=1"
														alt=""
														width="40"
														height="40"
														style={{padding: "0px 10px"}}
													/>
													{collection.name}
												</Typography>
												<Box
													sx={{
														padding: "0px 0px 0px 30px",
														justifyContent: "flex-end",
													}}
												>
													<Button
														variant="contained"
														onClick={() =>
															handleDeleteCollection(collection.id)
														}
														sx={{
															bgcolor: "#FFE6E6",
															color: "#EF4F4F",
															fontFamily: "Poppins",
															fontWeight: "600",
															fontSize: "0.813rem",
															"&:hover": {bgcolor: "#EF4F4F", color: "#FFE6E6"},
														}}
													>
														Delete
													</Button>
												</Box>
											</Box>
										</Paper>
									</Grid>
								))}
						</Grid>
						{/* Conditionally render pagination controls if there are more than two collections */}
						{collections.length > 2 && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									marginTop: "20px",
								}}
							>
								<Button
									variant="outlined"
									disabled={currentPage === 0}
									onClick={() => setCurrentPage(currentPage - 1)}
									sx={{color: '#F0997D' ,border: 'solid 1px #F0997D', fontWeight: '600', fontFamily: 'Poppins', "&:hover": {bgcolor: '#FFD8A9'}}}
								>
									Previous
								</Button>
								<Button
									variant="outlined"
									disabled={
										(currentPage + 1) * itemsPerPage >= collections.length
									}
									onClick={() => setCurrentPage(currentPage + 1)}
									sx={{marginLeft: "10px", color: '#F0997D' ,border: 'solid 1px #F0997D', fontWeight: '600', fontFamily: 'Poppins', "&:hover": {bgcolor: '#FFD8A9'}}}
								>
									Next
								</Button>
							</Box>
						)}
					</>
				)}

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
