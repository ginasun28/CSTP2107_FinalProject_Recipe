import {
	Button,
	Divider,
	TextField,
	Typography,
	Grid,
	Container,
	Link,
	useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import {signInWithPopup} from "firebase/auth";
import {useEffect, useState} from "react";
import {auth, googleProvider} from "../config/config";
import Notification from "../components/Notification";
import {useNavigate} from "react-router-dom";
import {getAuthErrorCode} from "../utils/util";
import api from "@/api/index.js";
import Box from "@mui/material/Box";
import "../components/styles/SignUp.css";

// Define an array containing the URLs of the photos you want to switch
const photos = [
	"https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk2fHxmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1546554137-f86b9593a222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
];

export default function SignupPage() {
	// State to manage form input and error messages
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
	});
	const isMobileView = useMediaQuery("(max-width:959px)");

	// State to manage the notification message shown to the user
	const [notificationMessage, setNotificationMessage] = useState("");
	const navigate = useNavigate();

	// State to hold the current index of the photo being displayed
	const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

	useEffect(() => {
		// Use the useEffect hook to set up a timer that will update the current index every 2 minutes and cycle through the array of photos
		const timer = setInterval(() => {
			setCurrentPhotoIndex(prevIndex => (prevIndex + 1) % photos.length); // Increment the index and use modulo to loop back to the start when reaching the end
		}, 8000); // 8 seconds in milliseconds

		// Clean up the timer when the component unmounts to avoid memory leaks
		return () => clearInterval(timer);
	}, []);

	// Function to handle Google signup
	const handleSignupWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then(response => {
				api.register({email: response.user.email}).then(() => {
					setNotificationMessage("User Successfully logged in");
					setTimeout(() => {
						setNotificationMessage(null);
						navigate("/");
					}, 2000);
				});
			})
			.catch(error => {
				const errorMessage = getAuthErrorCode(error.code);
				setNotificationMessage(errorMessage);
			});
	};

	// Function to handle email/password signup
	const handleSignupWithEmailAndPassword = () => {
		// Add validation logic
		// if (!userInfo.email || !userInfo.password || !userInfo.confirmPassword) {
		// 	return;
		// }
		// if (userInfo.password !== userInfo.confirmPassword) {
		// 	return;
		// }

		// api
		// 	.register({email: userInfo.email, password: userInfo.password})
		// 	.then(res => {
		// 		if (res.code) {
		// 			setNotificationMessage("Your account already exists");
		// 		} else {
		// 			setNotificationMessage("Your Account is created");
		// 			setTimeout(() => {
		// 				setNotificationMessage(null);
		// 				navigate("/signin");
		// 			}, 2000);
		// 		}
		// 	});
		let hasError = false;

		// Email validation
		if (!userInfo.email) {
			setUserInfo(prev => ({...prev, emailError: "Please enter email"}));
			hasError = true;
		} else {
			setUserInfo(prev => ({...prev, emailError: ""}));
		}

		// Password validation
		if (!userInfo.password) {
			setUserInfo(prev => ({...prev, passwordError: "Please enter password"}));
			hasError = true;
		} else {
			setUserInfo(prev => ({...prev, passwordError: ""}));
		}

		// Confirm password validation
		if (!userInfo.confirmPassword) {
			setUserInfo(prev => ({
				...prev,
				confirmPasswordError: "Please confirm password",
			}));
			hasError = true;
		} else {
			setUserInfo(prev => ({...prev, confirmPasswordError: ""}));
		}

		// Check if passwords match
		if (userInfo.password !== userInfo.confirmPassword) {
			setUserInfo(prev => ({
				...prev,
				confirmPasswordError: "Passwords do not match",
			}));
			hasError = true;
		}

		if (hasError) {
			return; // Return early if there's any error
		}

		// If all validations pass, proceed with signup
		api
			.register({email: userInfo.email, password: userInfo.password})
			.then(res => {
				if (res.code) {
					setNotificationMessage("Your account already exists");
				} else {
					setNotificationMessage("Your Account is created");
					setTimeout(() => {
						setNotificationMessage(null);
						navigate("/signin");
					}, 2000);
				}
			});
	};

	const handleLoginLinkClick = () => {
		navigate("/signin"); // Path to jump to the registration interface
	};

	return (
		<>
			{/* Desktop view */}
			{!isMobileView && (
				<Container maxWidth="xl" className="login-container">
					<Grid
						container
						spacing={0}
						sx={{display: "flex", alignItems: "center"}}
					>
						{/* First Column */}
						<Grid
							item
							xs={12}
							md={6}
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
							{/* register area */}
							<Box
								padding="25px 0px 0px 0px"
								border="1px solid #e6e4e4"
								display="flex"
								flexDirection="column"
								gap="20px"
								className="register-box"
							>
								<Typography
									variant="h4"
									sx={{
										color: "#E38B29",
										fontFamily: "Montserrat",
										fontWeight: 600,
									}}
								>
									Register
								</Typography>
								<Box
									padding="5px 20px 0px 20px"
									// border="1px solid #e6e4e4"
									display="flex"
									flexDirection="column"
									gap="10px"
								>
									{/* <TextField
									value={userInfo.email}
									type="text"
									placeholder="Enter Your Email"
									required
									onChange={e =>
										setUserInfo({...userInfo, email: e.target.value})
									}
									error={userInfo.email === ""} // Determine whether to display an error state according to the condition
									helperText={
										userInfo.email === ""
											? "Please enter email and password"
											: ""
									}
								/>
								<TextField
									value={userInfo.password}
									type="password"
									placeholder="Enter Your Password"
									required
									onChange={e =>
										setUserInfo({...userInfo, password: e.target.value})
									}
									error={userInfo.password === ""} // Determine whether to display an error state according to the condition
									helperText={
										userInfo.password === ""
											? "Please enter email and password"
											: ""
									}
								/>
								<TextField
									value={userInfo.confirmPassword}
									type="password"
									placeholder="Confirm Your Password"
									required
									onChange={e =>
										setUserInfo({...userInfo, confirmPassword: e.target.value})
									}
									error={userInfo.password !== userInfo.confirmPassword} // Determine whether to display an error state according to the condition
									helperText={
										userInfo.password !== userInfo.confirmPassword
											? "Passwords do not match"
											: ""
									}
								/> */}
									{/* Email TextField */}
									<Typography className="signin-textfield-title">
										Email*
									</Typography>
									<TextField
										sx={{padding: "5px 5px"}}
										value={userInfo.email}
										variant="outlined"
										required
										className="email-textfield"
										InputProps={{
											type: "text",
											placeholder: "Enter Your Email",
											sx: {
												borderRadius: "20px",
												padding: "5px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({...userInfo, email: e.target.value})
										}
										error={!!userInfo.emailError} // Set error to true if there's an error message
										helperText={userInfo.emailError}
									/>
									{/* Password TextField */}
									<Typography className="signin-textfield-title">
										Password*
									</Typography>
									<TextField
										sx={{padding: "5px 5px"}}
										value={userInfo.password}
										variant="outlined"
										required
										InputProps={{
											type: "password",
											placeholder: "Enter Your Password",
											sx: {
												borderRadius: "20px",
												padding: "5px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({...userInfo, password: e.target.value})
										}
										error={!!userInfo.passwordError} // Set error to true if there's an error message
										helperText={userInfo.passwordError}
									/>
									{/* Confirm Password TextField */}
									<Typography className="signup-textfield-title">
										Confirm Password*
									</Typography>
									<TextField
										sx={{padding: "5px 3px"}}
										value={userInfo.confirmPassword}
										variant="outlined"
										required
										InputProps={{
											type: "password",
											placeholder: "Confirm Your Password",
											sx: {
												borderRadius: "20px",
												padding: "3px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({
												...userInfo,
												confirmPassword: e.target.value,
											})
										}
										error={!!userInfo.confirmPasswordError} // Set error to true if there's an error message
										helperText={userInfo.confirmPasswordError}
									/>
									<Box
										sx={{
											justifyContent: "center",
											alignItems: "center",
											padding: "5px",
										}}
									>
										<Button
											className="signup-btn"
											variant="contained"
											onClick={handleSignupWithEmailAndPassword}
										>
											Sign Up
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
										onClick={handleSignupWithGoogle}
									>
										<GoogleIcon sx={{paddingRight: "5px"}} />
										Sign Up With Google
									</Button>
								</Box>
								<Typography className="member">
									Already have an account?{" "}
									<Link
										component="button"
										onClick={handleLoginLinkClick}
										className="login"
										sx={{color: "red"}}
									>
										Login
									</Link>
								</Typography>
								<Notification message={notificationMessage} />
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}

			{/* Mobile view */}
			{isMobileView && (
				<Container maxWidth="xl" className="login-container">
					<Grid
						container
						spacing={0}
						sx={{display: "flex", alignItems: "center"}}
					>
						<Grid
							item
							xs={12}
							md={6}
							sx={{
								padding: "20px",
								backgroundImage: `url(${photos[currentPhotoIndex]})`,
								height: "100vh",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>
						<Grid
							item
							xs={12}
							md={6}
							className="register-grid"
							sx={{
								position: "absolute",
								top: "50%",
								left: "49.7%",
								transform: "translate(-50%, -50%)",
							}}
						>
							{/* register area */}
							<Box
								padding="25px 0px 0px 0px"
								border="1px solid #e6e4e4"
								display="flex"
								flexDirection="column"
								gap="20px"
								className="register-box"
							>
								<Typography
									variant="h4"
									sx={{
										color: "#E38B29",
										fontFamily: "Montserrat",
										fontWeight: 600,
									}}
								>
									Register
								</Typography>
								<Box
									padding="5px 20px 0px 20px"
									// border="1px solid #e6e4e4"
									display="flex"
									flexDirection="column"
									gap="10px"
								>
									{/* Email TextField */}
									<Typography className="signin-textfield-title">
										Email*
									</Typography>
									<TextField
										sx={{padding: "5px 5px"}}
										value={userInfo.email}
										variant="outlined"
										required
										className="email-textfield"
										InputProps={{
											type: "text",
											placeholder: "Enter Your Email",
											sx: {
												borderRadius: "20px",
												padding: "5px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({...userInfo, email: e.target.value})
										}
										error={!!userInfo.emailError} // Set error to true if there's an error message
										helperText={userInfo.emailError}
									/>
									{/* Password TextField */}
									<Typography className="signin-textfield-title">
										Password*
									</Typography>
									<TextField
										sx={{padding: "5px 5px"}}
										value={userInfo.password}
										variant="outlined"
										required
										InputProps={{
											type: "password",
											placeholder: "Enter Your Password",
											sx: {
												borderRadius: "20px",
												padding: "5px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({...userInfo, password: e.target.value})
										}
										error={!!userInfo.passwordError} // Set error to true if there's an error message
										helperText={userInfo.passwordError}
									/>
									{/* Confirm Password TextField */}
									<Typography className="signup-textfield-title">
										Confirm Password*
									</Typography>
									<TextField
										sx={{padding: "5px 3px"}}
										value={userInfo.confirmPassword}
										variant="outlined"
										required
										InputProps={{
											type: "password",
											placeholder: "Confirm Your Password",
											sx: {
												borderRadius: "20px",
												padding: "3px",
												height: "50px",
												bgColor: "rgba(217, 217, 217, 50%)",
											},
										}}
										onChange={e =>
											setUserInfo({
												...userInfo,
												confirmPassword: e.target.value,
											})
										}
										error={!!userInfo.confirmPasswordError} // Set error to true if there's an error message
										helperText={userInfo.confirmPasswordError}
									/>
									<Box
										sx={{
											justifyContent: "center",
											alignItems: "center",
											padding: "5px",
										}}
									>
										<Button
											className="signup-btn"
											variant="contained"
											onClick={handleSignupWithEmailAndPassword}
										>
											Sign Up
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
										onClick={handleSignupWithGoogle}
									>
										<GoogleIcon sx={{paddingRight: "5px"}} />
										Sign Up With Google
									</Button>
								</Box>
								<Typography className="member">
									Already have an account?{" "}
									<Link
										component="button"
										onClick={handleLoginLinkClick}
										className="login"
										sx={{color: "red"}}
									>
										Login
									</Link>
								</Typography>
								<Notification message={notificationMessage} />
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
}
