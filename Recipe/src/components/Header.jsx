import {useState, Fragment} from "react";
import {Link as RouterLink} from "react-router-dom";
import {
	Box,
	Button,
	AppBar,
	Toolbar,
	Typography,
	MenuItem,
	IconButton,
	Menu,
	Divider,
	Tooltip,
	Avatar,
	useMediaQuery,
} from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";
import "./styles/Header.css";

const pages = ["+Create Recipe", "Recipes", "About Us"];
const settings = ["Profile", "History", "Favorite", "Logout"];
const link = ["/create_recipe", "/recipes", "/about_us"];

function Header() {
	const [user, setUser] = useLocalStorage("user", null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElNav, setAnchorElNav] = useState(null);
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

	const isMobileView = useMediaQuery("(max-width:959px)");

	return (
		<>
			<AppBar
				position="static"
				sx={{bgcolor: "transparent", boxShadow: "none"}}
			>
				<Toolbar>
					<Typography
						variant="h6"
						sx={{
							flexGrow: 1,
							textAlign: "center",
							fontFamily: "poppins",
							fontWeight: 700,
							textDecoration: "none",
							color: "#F1A661",
							fontSize: "1.563rem",
							justifyContent: "center",
							display: "flex",
							alignItems: "center",
						}}
					>
						{!isMobileView && (
							<img
								src="src/assets/icons8-cook-96.png"
								alt=""
								width="45"
								height="45"
								style={{padding: "0px 10px 0px 10px"}}
							/>
						)}
						Epicurean Eats
					</Typography>
					{!isMobileView && (
						<>
							<Box>
								{!user ? (
									<Box
										sx={{flexGrow: 0}}
										onClick={() => {
											handleSettingClick("logout");
										}}
									>
										<Typography
											sx={{
												fontFamily: "Poppins",
												fontWeight: "700",
												padding: "8px 15px",
												bgcolor: "#FFD8A9",
												color: "#E38B29",
												borderRadius: "10px",
												width: "50",
												"&:hover": {
													backgroundColor: "#FF8551",
													color: "#FFD8A9",
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
												// <MenuItem
												// 	key={setting}
												// 	onClick={() => handleSettingClick(setting)}
												// >
												// 	<Typography textAlign="center">{setting}</Typography>
												// </MenuItem>
												<Fragment key={setting}>
													{index === settings.indexOf("Logout") && <Divider />}
													<MenuItem onClick={() => handleSettingClick(setting)}>
														<Typography textAlign="center">
															{setting}
														</Typography>
													</MenuItem>
												</Fragment>
											))}
										</Menu>
									</Box>
								)}
							</Box>
						</>
					)}
				</Toolbar>
			</AppBar>
			{/* Second AppBar */}
			<AppBar
				position="static"
				sx={{
					boxShadow: "none",
					background: !isMobileView
						? "linear-gradient(90deg, rgba(249,243,223,1) 0%, rgba(242,175,112,1) 27%, rgba(241,166,97,1) 70%, rgba(249,243,223,1) 100%)"
						: "#F1A661",
				}}
			>
				<Toolbar
					style={{
						justifyContent: "center",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
							sx={{fontSize: '1.125rem', color: '#FDF5CA', fontWeight: 600, fontFamily: 'Poppins', '&:hover': {color:'#EA5C2B'}}}
						>
							Menu
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
					</Box>
					<Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
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
										width: `${50 / pages.length}%`,
										// Set different background color for "+Create Recipe"
										color: page === "+Create Recipe" ? "#FFDEDE" : "#FDF5CA",
										fontSize: "0.938rem",
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
					</Box>
					{isMobileView && (
						<>
							<Box>
								{!user ? (
									<Box
										sx={{flexGrow: 0}}
										onClick={() => {
											handleSettingClick("logout");
										}}
									>
										<Typography
											sx={{
												fontFamily: "Poppins",
												fontWeight: "700",
												padding: "8px 15px",
												bgcolor: "#FFD8A9",
												color: "#E38B29",
												borderRadius: "10px",
												width: "50",
												"&:hover": {
													backgroundColor: "#FF8551",
													color: "#FFD8A9",
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
												// <MenuItem
												// 	key={setting}
												// 	onClick={() => handleSettingClick(setting)}
												// >
												// 	<Typography textAlign="center">{setting}</Typography>
												// </MenuItem>
												<Fragment key={setting}>
													{index === settings.indexOf("Logout") && <Divider />}
													<MenuItem onClick={() => handleSettingClick(setting)}>
														<Typography textAlign="center">
															{setting}
														</Typography>
													</MenuItem>
												</Fragment>
											))}
										</Menu>
									</Box>
								)}
							</Box>
						</>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header;
