import {
	Button,
	Divider,
	Link,
	TextField,
	Typography,
	Grid,
	Container,
	Box,
	useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../config/config";
import {useState, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import {getAuthErrorCode} from "../utils/util";
import Notification from "../components/Notification";
import api from "@/api/index.js";
import "../components/styles/SignIn.css";

// Define an array containing the URLs of the photos you want to switch
const photos = [
	"https://images.unsplash.com/photo-1557164928-61b165508987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcwfHxmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
];

export default function SignInPage() {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
		emailError: "", // Add email error state
		passwordError: "", // Add password error state
	});
	const [notificationMessage, setNotificationMessage] = useState("");
    // State to hold the current index of the photo being displayed
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();
	const isMobileView = useMediaQuery("(max-width:959px)");

    useEffect(() => {
		// Use the useEffect hook to set up a timer that will update the current index every 2 minutes and cycle through the array of photos
		const timer = setInterval(() => {
			setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % photos.length); // Increment the index and use modulo to loop back to the start when reaching the end
		}, 8000); // 8 seconds in milliseconds

		// Clean up the timer when the component unmounts to avoid memory leaks
		return () => clearInterval(timer);
	}, []);


	const handleSignInWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then(response => {
				api.register({email: response.user.email}).then(res => {
					setNotificationMessage("User Successfully logged in");
					setUser(res.user);
					setTimeout(() => {
						setNotificationMessage(null);
						if (res.user.username) {
							navigate("/");
						} else {
							navigate("/profile");
						}
					}, 2000);
				});
			})
			.catch(error => {
				const errorMessage = getAuthErrorCode(error.code);
				setNotificationMessage(errorMessage);
			});
	};

	const handleSignInWithEmailAndPassword = () => {
		// Add validation logic
		// if (!userInfo.email || !userInfo.password) {
		// 	return;
		// }

		// api
		// 	.login({email: userInfo.email, password: userInfo.password})
		// 	.then(res => {
		// 		if (res.code) {
		// 			setNotificationMessage("User Successfully logged in");
		// 			setUser(res.user);
		// 			setTimeout(() => {
		// 				if (res.user.username) {
		// 					navigate("/");
		// 				} else {
		// 					navigate("/profile");
		// 				}
		// 			}, 2000);
		// 		} else {
		// 			setNotificationMessage(res.message);
		// 		}
		// 	});
		let hasError = false;

		if (!userInfo.email) {
			setUserInfo(prev => ({...prev, emailError: "Please enter email"}));
			hasError = true;
		} else {
			setUserInfo(prev => ({...prev, emailError: ""}));
		}

		if (!userInfo.password) {
			setUserInfo(prev => ({...prev, passwordError: "Please enter password"}));
			hasError = true;
		} else {
			setUserInfo(prev => ({...prev, passwordError: ""}));
		}

		if (hasError) {
			return; // Return early if there's any error
		}

		api
			.login({email: userInfo.email, password: userInfo.password})
			.then(res => {
				if (res.code) {
					setNotificationMessage("User Successfully logged in");
					setUser(res.user);
					setTimeout(() => {
						if (res.user.username) {
							navigate("/");
						} else {
							navigate("/profile");
						}
					}, 2000);
				} else {
					setNotificationMessage(res.message);
				}
			});
	};

	const handleRegisterLinkClick = () => {
		navigate("/signup"); // Path to jump to the registration interface
	};

	return (
		<>
			{/* Desktop view */}

			<Container maxWidth="xl" className="login-container">
				<Grid
					container
					spacing={0}
					sx={{display: "flex", alignItems: "center"}}
				>
					{!isMobileView && (
						<>
							{/* First Column */}
							<Grid
								item
								xs={6}
								sx={{
									padding: "20px",
									backgroundImage: `url(${photos[currentPhotoIndex]})`,
									height: "100vh",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							/>
							{/* Second Column */}
							<Grid item xs={6} sx={{padding: "20px"}} />
							<Grid
								item
								xs={12}
								md={6}
								className="login-grid"
								sx={{
									position: "absolute",
									top: "50%",
									left: "55%",
									transform: "translate(-50%, -50%)",
								}}
							>
								<Box
									padding="25px 0px 0px 0px"
									border="1px solid #e6e4e4"
									display="flex"
									flexDirection="column"
									gap="20px"
									className="login-box"
								>
									<Typography
										variant="h4"
										sx={{
											color: "#E38B29",
											fontFamily: "Montserrat",
											fontWeight: 600,
										}}
									>
										Login
									</Typography>
									<Box
										padding="5px 20px 0px 20px"
										display="flex"
										flexDirection="column"
										gap="10px"
									>
										<Typography className="signin-textfield-title">
											Email*
										</Typography>
										<TextField
											className="email-textfield"
											variant="outlined"
											InputProps={{
												type: "text",
												placeholder: "Enter Your Email",
												sx: {
													borderRadius: "20px",
													height: "50px",
													bgColor: "rgba(217, 217, 217, 50%)",
												},
											}}
											value={userInfo.email}
											onChange={e =>
												setUserInfo({...userInfo, email: e.target.value})
											}
											required
											error={!!userInfo.emailError} // Set error to true if there's an error message
											helperText={userInfo.emailError}
										/>
										<Typography className="signin-textfield-title">
											Password*
										</Typography>
										<TextField
											variant="outlined"
											className="password-textfield"
											required
											InputProps={{
												type: "password",
												placeholder: "Enter Your Password",
												sx: {
													borderRadius: "20px",
													height: "50px",
													bgColor: "rgba(217, 217, 217, 50%)",
												},
											}}
											value={userInfo.password}
											onChange={e =>
												setUserInfo({...userInfo, password: e.target.value})
											}
											error={!!userInfo.passwordError} // Set error to true if there's an error message
											helperText={userInfo.passwordError}
										/>
										<Box
											sx={{
												justifyContent: "center",
												alignItems: "center",
												padding: "10px",
											}}
										>
											<Button
												className="signin-btn"
												variant="contained"
												onClick={handleSignInWithEmailAndPassword}
											>
												Sign In
											</Button>
										</Box>

										<Divider>
											<Typography
												variant="h6"
												sx={{
													color: "#064635",
													fontSize: "15px",
													fontWeight: "600",
												}}
											>
												Or
											</Typography>
										</Divider>
										<Button
											variant="contained"
											className="google-login"
											onClick={handleSignInWithGoogle}
										>
											<GoogleIcon sx={{paddingRight: "5px"}} />
											Sign In With Google
										</Button>
									</Box>
									<Typography className="not-member">
										Not a member?{" "}
										<Link
											component="button"
											onClick={handleRegisterLinkClick}
											className="register"
										>
											Register Now
										</Link>
									</Typography>
									<Notification message={notificationMessage} />
								</Box>
							</Grid>
						</>
					)}
                    {/* Mobile view */}
					{isMobileView && (
						<>
							<Grid
								item
                                xs={12}
								md={6}
								sx={{
									padding: "20px",
									backgroundImage: `url("https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")`,
									height: "100vh",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
							/>
							<Grid
								item
								xs={12}
								md={6}
								className="login-grid"
								sx={{
									position: "absolute",
									top: "50%",
									left: "49.7%",
									transform: "translate(-50%, -50%)",
								}}
							>
								<Box
									padding="25px 0px 0px 0px"
									border="1px solid #e6e4e4"
									display="flex"
									flexDirection="column"
									gap="20px"
									className="login-box"
								>
									<Typography
										variant="h4"
										sx={{
											color: "#E38B29",
											fontFamily: "Montserrat",
											fontWeight: 600,
										}}
									>
										Login
									</Typography>
									<Box
										padding="5px 20px 0px 20px"
										display="flex"
										flexDirection="column"
										gap="10px"
									>
										<Typography className="signin-textfield-title">
											Email*
										</Typography>
										<TextField
											className="email-textfield"
											variant="outlined"
											InputProps={{
												type: "text",
												placeholder: "Enter Your Email",
												sx: {
													borderRadius: "20px",
													height: "50px",
													bgColor: "rgba(217, 217, 217, 50%)",
												},
											}}
											value={userInfo.email}
											onChange={e =>
												setUserInfo({...userInfo, email: e.target.value})
											}
											required
											error={!!userInfo.emailError} // Set error to true if there's an error message
											helperText={userInfo.emailError}
										/>
										<Typography className="signin-textfield-title">
											Password*
										</Typography>
										<TextField
											variant="outlined"
											className="password-textfield"
											required
											InputProps={{
												type: "password",
												placeholder: "Enter Your Password",
												sx: {
													borderRadius: "20px",
													height: "50px",
													bgColor: "rgba(217, 217, 217, 50%)",
												},
											}}
											value={userInfo.password}
											onChange={e =>
												setUserInfo({...userInfo, password: e.target.value})
											}
											error={!!userInfo.passwordError} // Set error to true if there's an error message
											helperText={userInfo.passwordError}
										/>
										<Box
											sx={{
												justifyContent: "center",
												alignItems: "center",
												padding: "10px",
											}}
										>
											<Button
												className="signin-btn"
												variant="contained"
												onClick={handleSignInWithEmailAndPassword}
											>
												Sign In
											</Button>
										</Box>

										<Divider>
											<Typography
												variant="h6"
												sx={{
													color: "#064635",
													fontSize: "15px",
													fontWeight: "600",
												}}
											>
												Or
											</Typography>
										</Divider>
										<Button
											variant="contained"
											className="google-login"
											onClick={handleSignInWithGoogle}
										>
											<GoogleIcon sx={{paddingRight: "5px"}} />
											Sign In With Google
										</Button>
									</Box>
									<Typography className="not-member">
										Not a member?{" "}
										<Link
											component="button"
											onClick={handleRegisterLinkClick}
											className="register"
										>
											Register Now
										</Link>
									</Typography>
									<Notification message={notificationMessage} />
								</Box>
							</Grid>
						</>
					)}
				</Grid>
			</Container>
		</>
	);
}
