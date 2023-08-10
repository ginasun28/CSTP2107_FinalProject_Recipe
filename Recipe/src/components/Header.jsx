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
								src="https://lh3.googleusercontent.com/pw/AIL4fc94jtHZvKR5pb4FdIWCg78i3cA6Vi-TNP2-R0Q172VadskhkYBxUK4RsgPkWXvN5u6eOLritDck99iHbpL_kglcb7cN2mSlx9BJbNTvkAx2MPFIbhesQW2dVEp3__qq2yo1iVriLvkQrEIfbLn7a1COvI3UWFNcAyq0yDI0PejIzws-A4s3qdgmmc-9NbCxB_4rSfUskC_tQ2CgZn3Zia__6bYoAV9qCmKGfHOWjJBZQRdnFzxxSaRbUDJHMZI56LWxkyRWpM_VFQzgmBTQYIeXK4otPBv0G7laol28SKFnTyPUHvqNMfpWyTBvdoqqsBVN5jTQg9MkDI98S20wIVIqeulO25Kcm8H4ohQMro5YlqI5WWe_sR5GwYiXaAQqSk97Ks9kURUklt3K0FSrpIR-SQP3yTy9YDImdxklYfspGoKMVgqVZFWnXEAlpEN3-LJfzgxaMMc2kgEppBSBRLsH9NbJLzexBjrWro-uWmsF3-0Be7gh7zWK9TSDvztoLZZf_rgBcsji0fjjCLkmptSrBeXrygNtjer0oIPqy3MS0e-48G7t6Hh2T8ROwqLAZWE_Ksy35v4Zk15nswuGZ9thPYQsbTdOfzSza6oUtc8HNBnasdN_5tiQLI-L1L5KOk8Oifk8c7WpPss2d8-d_Di_5ZZ-K2qPx445y0ThDy2NalZNIlIYbAUPf266miH2g9yrJR54SyblGwitBXX0ogyntL-Vd80W_SxbU3hW8wGcpZD-BOWCHCVyvtqGJ0tO10NP-2brh_WY9xoCdVvqbdk57gBDyj8Sar1t0zEq2wg7eym6ZWMhvW_6iaNvjNp10nhmq_lPD7LJUtMkC_kDPIyBulSG6wXyx_0GGs2s8wiZB_K2zRMUMFI-zFdzUrSg5l148jYS_hs_zvmn7HqMJoGP_hNypdbdu7nC7sh0-rbZLGZ80OJc09L6xdfY=w96-h96-s-no?authuser=1"
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
														src="https://lh3.googleusercontent.com/pw/AIL4fc9x0SBAv9ybETgrkQ3ZWvgouPMIObJaIRJRqHQqfgt8rXjsNEE7nBHix8wOs9gLAoy1nU0RRW2SGT_1_CtUrxYqe28tX-Qcq2yWenQ-QPkpjFAntvRS3uYgCHXt7VYALJbfC1yFe-Z1pv4Dd3ny1OUjwKAAMFG93oqe6V8b9U1g47CYVAE8zpKqD0EErC1e8P5g3243jCWiVfYDpb8b7dby3PNKv_1gmI5_WKmTZJgN_9CUQblKLYYeAwj809a94oKEHW2g6dXfi5kvOyj4T64GBioCdb5O4GL4okpo3wz0IX3Mr-XUE1FQ-U09mAMCV0VT6RoNO4I1b4ssKrcPZ_c4vwohNyyir-8aD8Tv5jUp2eLyg6ugW3Dfyeq09nb4JNSGpohy3_agAiUe0Vx7VaoZ0nDdHRebvPRVU_RuHSNmTEadl1MS0P9Yf4S24ugAvgw3cL6HLGSQ_n42fQqIlcEQC2ee7YGSt2jS-1Blb6bOfV2c--W_eR6SM1wK9134iaxdQezMISRwp8eq926StqYo4woIgEyyzitWzzK6XWYOaTdy4mwXLnWKvnu0zghx_w4sEWowlBgzqUhN7dqC0P8xZPcjGsJ_a-0rfBkH1bzGY71ydxwmXxHPvfOWH3FtStJB_S4Ioog7Crh_LBr73IShwiNXQY8x9KiRYgklPiuizn4RDdySkcF4conTQmGJtJs9mcAeRvRsfvbQl0Wj_-aFM7Lal9wYQkHu3I_F-mj6B9l0M7orptTMsXeRuQp1fAKXrpdnVrDB6nXM-L-vYjKmEKlwc4b_QU8HS5Ploo_-9BLqsDgu4T1_Z7h7MJPf0NceK5QlSJAYZacmb-g4e9JAjPR5g9SMRlJnNfSwMCo7l1_CHNy5VmLOF7XKttUlVs6ZGyfsZ_JDoNS9GqRGC5xzQnN663OfHLoNGVmWiQ5uxdONO1xcoO3Hkxyv=w96-h96-s-no?authuser=1"
														alt="home-logo-icon"
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
