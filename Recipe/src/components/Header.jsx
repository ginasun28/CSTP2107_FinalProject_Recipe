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
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useState} from "react";
import "../component/styles/styles.css";

const pages = ["Home", "+Create Recipe", "Recipes", "About"];
const settings = ["Edit Profile", "History", "Favourite", "Logout"];
const link = ["/", "/create_recipe", "/recipes", "/about_us"];

const Header = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

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

	return (
		<>
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
									to={link[0]}
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
								{pages.map((page, index) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<RouterLink to={link[index]} className="nav-link">
											{page}
										</RouterLink>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: {xs: "none", md: "flex"},
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									width: "100%",
								}}
							>
								{pages.map((page, index) => (
									<Button
										key={page}
										component={RouterLink}
										to={link[index]}
										onClick={handleCloseNavMenu}
										sx={{
											my: 2,
											display: "flex",
											justifyContent: "center",
											width: `${65 / pages.length}%`,
											// Set different background color for "+Create Recipe"
											color: page === "+Create Recipe" ? "#FFDEDE" : "#FDF5CA",
											fontSize: "18px",
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
								>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
									<Typography sx={{padding: "10px"}}>UserName</Typography>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{
									mt: "45px",
									"&:hover": {
										backgroundColor: "transparent",
									},
								}}
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
								{settings.map(setting => (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}
										className="dropdown-menu"
										sx={{
											"&:hover": {
												backgroundColor: "transparent",
											},
										}}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Header;
