import '../components/styles/styles.css'
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
import Footer from "../components/Footer";

const pages = ["Home", "+Create Recipe", "Recipes", "About"];
const settings = ["Edit Profile", "History", "Favourite", "Logout"];
const link = ["/", "/create_recipe", "/recipes", "/about_us"];

export default function Home() {
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
			<Container maxWidth="xl">
				{/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						display: {xs: "none", md: "flex"},
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
					LOGO
				</Typography>
			</Container>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
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
						<Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
							{pages.map((page, index) => (
								<Button
									key={page}
									component={RouterLink}
									to={link[index]}
									onClick={handleCloseNavMenu}
									sx={{my: 2, color: "white", display: "block"}}
								>
									{page}
								</Button>
							))}
						</Box>
						<Box sx={{flexGrow: 0}}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
								{settings.map(setting => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Footer/>
		</>
	);
}
