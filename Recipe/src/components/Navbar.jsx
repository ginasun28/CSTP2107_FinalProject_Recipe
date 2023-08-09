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
import "./styles/Header.css";

const pages = ["+Create Recipe", "Recipes", "About Us"];
const settings = ["Profile", "History", "Favorite", "Logout"];
const link = ["/create_recipe", "/recipes", "/about_us"];

function ResponsiveAppBar() {
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

	// const handlePageClick = page => {
	// 	navigate(`/${page.toLowerCase()}`);
	// 	handleCloseNavMenu();
	// };

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
		<AppBar position="static" sx={{bgcolor: "#F1A661", boxShadow: "none"}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img
							src="src/assets/icon8-cook-header.png"
							alt=""
							width="30"
							height="30"
						/>
						<Box sx={{display: "flex", flexDirection: "column"}}>
							<Typography
								noWrap
								component={RouterLink}
								to={"/"}
								sx={{
									// mt: 1,
									display: {xs: "none", md: "flex"},
									fontFamily: "poppins",
									fontWeight: 700,
									textDecoration: "none",
									color: "#FDF5CA",
									fontSize: "18px",
								}}
							>
								Epicurean Eats
							</Typography>
						</Box>
					</Box>
					<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						></IconButton>
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
							<MenuItem>
								<Typography textAlign="center">
									<RouterLink to="/" className="nav-link">
										Home
									</RouterLink>
								</Typography>
							</MenuItem>
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
									padding: "5px 8px 5px 8px",
									"&:hover": {
										backgroundColor: "#FDEEDC",
										color: "#F1A661",
										borderRadius: "20px",
										padding: "5px 8px 5px 8px",
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
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;
