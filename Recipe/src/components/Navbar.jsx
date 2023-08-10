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
							src="https://lh3.googleusercontent.com/pw/AIL4fc8H2xC8rt0QDL5UXr-vWNQz8Z9XlrS32AT6ZjKihFqPDWTHr4nXVRRzb41sTaXU8--1aHduxWMXOFx8fxC9NaLlihdeK1CRYIbKoecAGuewKTgSxMRDABNcJzUhS_WEbNCpp5kov1arlOQ4ByF831jzFw99Wzr2RFDW1nZ3i0eHu08PcQt0LgdPHzS4l7yF2WtFwZdHnpVKYiU5NZL8xtB1WU9MCJaG7hqI_3OSXSNQK4KxfjCogof4aPOCn62K97AXZDiHS08JtFSKiphlWhv0LndrRajxUcM-xaSqllNV9KJoW_yS16zhbKW6yVW8RmmkZwWjlEj1evAfWRWHVWrSvOrYC7ub7fWSYuh625A8n_AswAXEvdPVay18Sw_pQpnibbuapQ09Q-qwO1RY3lF8nPplNDqyuQQUgQcGjYWMg5J9OMSX1lYPLCkRRuVWl9d3lncsyNMTmAUqSyYJhn3uBEzYDVQf8z8e5K3zRjwL-FHMMbTK9zIl9-YJaCQRD_Rael8Brkbk1OITfl_1U0OoTwEq-E4vVtmthKK4H0MmqMfULMW_KsHqw6oumc99aL3PzSoVSHu-DKh4nx-aiXUJWwAcw47jwpZlGDfO_I7Ko6Y3ZR8FEQTRD7fpbdS2xUI2Mlu4H7VEjODkVG50k2TDr5ZlxZ1T5rYjmpHKEHNtYS-beV5Si0wbG_A0qQsmd4MufMZKGEPSHAmScjbWRSzdy91Y0EYiHUlHBoqpGUBKBUhbrFiXDtYd0jhPKq7P60eW6FuKddjgrlHtsnkCZ2WFa_2cVyfBxOqnNMw7X3N9FbT0jk3MyYZ8C6SwswTTYqetIT04f19EzGRkRWBXL3qfP-Nc5aXDPCQ2-aaXf71XSKsFHwWI8Ws1h2o-cmHfdVxrttwb4quLVlYtQwY2fvOZlIjfLp451CTEWRYr_KpQ8tTwpSXqotrcKuyC=w96-h96-s-no?authuser=1"
							alt="cook-header"
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
											src="https://lh3.googleusercontent.com/pw/AIL4fc_JuJ5AvG8SWRJGADkhrJ_B9X0xObWp_fGJBeDd1gF_vng5dB8kfCvlxvVGmnpAijSkm3ibtVpNcR5bSFY0dK_irttR2lYQf9JCpIh1wFLR5g7DTTvte0dF--19xoiBI3C-zYU31JkDevlfh3T2qt3DBe42OnF5kAjL9eH3F32jeaL1WhHv9xsNFHJvQU405A6zj71RCfqxmWiA-BT8WMG04qCGL_Fj4SzkJZyEAhoeSGf4tXsuv4Nf1mW18krzXM0Q66G8pvw9jW00tjJYdqmt_p-GySLcEXO9CT3998qZ8wNWcX9TS-JVD7Wb3v-ytR1Q2UAaOxgQySHkNXPRB6gQFJh_36vSm1GGBp7m_56OXt_xvYrTGtmWNHQ0xjTzGl1hlBOW8cLGMPARngngPdsoMUtoFEYfW11us1xwC0RxD3_gwUb2ruSJFILlp7yggqELbfdY5LK23crqhE_PcLxIUeLWO51inIcMBT1MMlMeaQ51ZCxCqcJ9ws4aRZ0xvr7kLvQEHmDyJ6YjV1DadKDOPusgcPWfkP1k6ULJ7MbSOHQtHLfnLU4MpCgLbSdrEfpOKdRCzgNnCSU5h5zRo6oq2TeWoefVHwK39hZBY8DSUlYSxERTheWjBoYdE_RbMJXzWsfT5hnNeNIb6DaEU-6-tIyJeGbvsx2Pgk9YTPp8RQ89bsVzTGhCKn0epc29tmhVXuHmh8Ecse4vKamajLbf00SfhabpAHrKUcpiQBMsjiiL2nB0RUrvygHSpOjuBZVkt8KjWWNqKalDM4GuuoToHuPdusaCklUnfdBQCE9_i3pyp1S506YmPTwFDQlFq-BBl1F5sJlGOjF-GyBIKi56qpwciSgrx9zumSxGmLpWkV4rG7HyjGskRf7yy_vIZHlNxcz7rR6M8Bv_fJ46GC8w1mq3dgY3hmVirGjNxsJFN0SCl_lHVHiBkyHH=w96-h96-s-no?authuser=1"
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
