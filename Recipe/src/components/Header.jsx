import {
	Button,
	Menu,
	MenuItem,
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	Container,
	Box,
	Avatar,
	Tooltip,
	Divider,
} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {Link as RouterLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState, Fragment} from "react";
import "../components/styles/Header.css";


const pages = ["+Create Recipe", "Recipes", "About Us"];
const settings = ["Profile", "History", "Favorite", "Logout"];
const link = ["/create_recipe", "/recipes", "/about_us"];

function Header() {
	const [user, setUser] = useLocalStorage("user", null);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate();

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSettingClick = setting => {
		if (setting.toLowerCase() === "logout") {
			window.localStorage.clear();
			navigate(`/signin`);
			return;
		}
		navigate(`/${setting.toLowerCase()}`);
		handleCloseUserMenu();
	};

	return (
		<>
			<AppBar
				position="static"
				sx={{boxShadow: "none", bgcolor: "transparent"}}
			>
				<Container maxWidth="xl" className="home-header-container">
					{/* First Row: Logo and Login Button */}
					<Toolbar
						disableGutters
						sx={{display: "flex", justifyContent: "space-between"}}
					>
						{/* Logo and Mobile Menu */}
						<Box
							sx={{
								flexGrow: 1, // Add flexGrow property to center the logo
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
									// sx={{padding: "10px 12px 0px 12px"}}
								>
									<img
										src="src/assets/icons8-cook-96.png"
										alt=""
										width="50"
										height="50"
									/>
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: {xs: "block", md: "none"},
									}}
								>
									{pages.map((page, index) => (
										<MenuItem key={page} onClick={handleCloseNavMenu}>
											<RouterLink to={link[index]} className="nav-link">
												{page}
											</RouterLink>
										</MenuItem>
									))}
								</Menu>
								<Typography
									noWrap
									component={RouterLink}
									to={"/"}
									sx={{
										display: {xs: "none", md: "flex"},
										fontFamily: "poppins",
										fontWeight: 700,
										textDecoration: "none",
										color: "#F1A661",
										fontSize: "28px",
										// padding: "0px 0px 10px 0px",
									}}
								>
									Epicurean Eats
								</Typography>
							</Box>
						</Box>

						{/* User Menu */}
						<Box>
							{/* Your existing code for the user menu */}
							{!user ? (
								<Box
									sx={{
										flexGrow: 0,
										ml: 2,
									}}
									onClick={() => {
										handleSettingClick("logout");
									}}
								>
									<Typography
										sx={{
											fontFamily: "Poppins",
											fontWeight: "700",
											padding: "8px 20px",
											backgroundColor: "#FFD8A9",
											color: "#E38B29",
											borderRadius: "20px",
											"&:hover": {
												backgroundColor: "#E38B29",
												color: "#FFD8A9",
												borderRadius: "20px",
												padding: "8px 20px",
											},
										}}
									>
										Login
									</Typography>
								</Box>
							) : (
								<Box sx={{flexGrow: 0}}>
									<Tooltip title="Open settings">
										<IconButton
											onClick={handleOpenUserMenu}
											sx={{
												p: 0,
												"&:hover": {
													backgroundColor: "transparent",
												},
											}}
											disableRipple
										>
											<Avatar alt="Remy Sharp" src={user?.avatar} />
											<Typography
												sx={{
													padding: "10px",
													color: "#064635",
													fontFamily: "Montserrat",
													fontWeight: "700",
													fontSize: "13px",
												}}
											>
												{user?.username}
												<img
													src="src/assets/icons8-down-96.png"
													alt=""
													width="8"
													height="8"
													style={{padding: "0px 3px"}}
												/>
											</Typography>
										</IconButton>
									</Tooltip>
									<Menu
										sx={{mt: "45px"}}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										{settings.map((setting, index) => (
											<Fragment key={setting}>
												{index === settings.indexOf("Logout") && <Divider />}
												<MenuItem onClick={() => handleSettingClick(setting)}>
													<Typography textAlign="center">{setting}</Typography>
												</MenuItem>
											</Fragment>
										))}
									</Menu>
								</Box>
							)}
						</Box>
					</Toolbar>
				</Container>
				{/* Second Row: Navigation Buttons */}

				<Box
					sx={{
						justifyContent: "center",
						width: "100%", // Set width to 100% to fill the available space
						bgcolor: "#F1A661", // Set the background color here
						display: {xs: "none", md: "flex"},
					}}
				>
					<Container maxWidth="xl" sx={{padding: 0}}>
						{/* <Box
							sx={{
								flexGrow: 1,
								display: {xs: "none", md: "flex"},
								justifyContent: "flex-end",
							}}
						> */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
							}}
						>
							{pages.map((page, index = 1) => (
								<Button
									key={page}
									component={RouterLink}
									to={link[index]}
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										display: "flex",
										justifyContent: "center",
										width: `${38 / pages.length}%`, // Set width to evenly distribute buttons
										color: page === "+Create Recipe" ? "#FFDEDE" : "#FDF5CA",
										fontSize: "15px",
										fontFamily: "Poppins",
										fontWeight: 700,
										"&:hover": {
											backgroundColor: "transparent",
										},
									}}
									className="page-link"
								>
									{page}
								</Button>
							))}
						</Box>
						{/* </Box> */}
					</Container>
				</Box>
			</AppBar>
		</>
	);
}

export default Header;
