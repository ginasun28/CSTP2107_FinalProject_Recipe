import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";
import {InputAdornment} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import "../components/styles/ProfilePage.css";

const ProfilePage = () => {
	const [profileData, setProfileData] = useState({
		avatar: null,
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		bio: "",
	});
	const [user, setUser] = useLocalStorage("user", null);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Profile";
	}, []);

	useEffect(() => {
		api.getUser({id: user.id}).then(res => {
			console.log(res);
			delete res.password;
			setUser(res);
			setProfileData(res);
		});
	}, []);
	const handleInputChange = e => {
		const {name, value} = e.target;
		setProfileData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleAvatarChange = e => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		api
			.upload(formData)
			.then(data => {
				// 处理上传成功后的逻辑
				const imageURL = data.imageURL;
				setProfileData(prevState => ({
					...prevState,
					avatar: imageURL,
				}));
				console.log("Avatar uploaded:", imageURL);
			})
			.catch(error => {
				// 处理上传失败或错误的逻辑
				console.error("Error uploading avatar:", error);
			});
	};

	const handleSaveProfile = e => {
		e.preventDefault();
		// 处理保存个人资料逻辑
		setUser(profileData);
		api.updateUser(profileData).then(() => {
			navigate("/recipes");
		});
	};

	return (
		<>
			<div className="editProfile-font" style={{paddingBottom: "30px"}}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						marginTop: "20px",
					}}
				>
					<div style={{position: "absolute", left: "0"}}>
						<Link to={"/"}>
							<img
								src="https://lh3.googleusercontent.com/pw/AIL4fc-EfSNxoJrpqQKwFJv-s9bsdN6jL9UesJ_KxH_fJXwMbecGqsqaTpBwdV_t3OpRjfbCsb7dHv_dMM_2K74zb6zFWpnov3OrL6YZXy46ZaNQRcaiSWLV4AzKmPRUedBdR_aN_OHiFu05eEhJYfIzO3WVmAg_Nr9UXO7HTi6E3mTypCcTonCLqPbdC1hSDfPlQMvuCGMUjLVxwmt4_l8zXJ6OZHmNqoz8dns5rzDpBS--QMMT_N1ocnWxoJE6dDGJ-Fp3pfdLN1ZIAnbkHRWUC0qxmsN0HfnqzP7YrvK_wetU-RsD2cOvwjXD6ejfCOnqmrBKeO50aPVkvsXJS7dxDx837h9XYJB8XUutHQItoRgz6uvEGZgwpaGUo7YHAHtmstewfnddJHRXAjR5sv6XLP6oN5DTucrJlM-iTqoCMf0eGQVCHbz0rjnI5oAD_jiUrUoq7e23sd67M_f5uk83CbZNlnhY3ZJvTV-Oj8VxiDW29whCLRfuVxGheocjHqrSg2WbVco0WCw4qeNYoryt6NJ9NKSeEpMwd4mc1nVZPF7bWWQpnguRoOU6WcB1M7k4XkHzv_ZkdVcD_nIi9cwJ6MXY9WFVbTOIGqUhiCT8OYFf_udy1lSTUlAb8Z56hZaSmXr1uBNRcr4QwE-hQyfB6PtC1FC8Pwg17OeV6htGOd5FSckjZ1nb3yd6h29dapK0PLbb8j7dbVqUv2betQi2w2rgpjzlp0mExXbIhU0BU1-TKqb40uhmiiQFZIELP8CzGdXnH3reOF1Jg3Q5EiiLAqeS7UIoXGjJDDKTAR63G7MxUiXtjmJId21NMU8XwaOGHd8IFxaKP6YDlHJOQ2lTk_2ezU3E4_tBb0nsbzORd4CR7MrWa6fTYnlLP3AsC3t7KVLmk2LOmCYtsT0dlTWgd-b5LRyhH4J0_LrtLnKucStlC-olQ1GHoV2x5KYu=w96-h96-s-no?authuser=1"
								alt="Home icon"
								style={{height: "30px", width: "30px", padding: "10px 30px"}}
							/>
						</Link>
					</div>

					<h2 style={{color: "#E38B29", paddingBottom: "20px"}}>
						Edit Profile
					</h2>
				</div>
				<form onSubmit={handleSaveProfile}>
					<div className="avatar-resize">
						<div
							className="picture-resize"
							style={{backgroundColor: "white", borderRadius: "50%"}}
						>
							<Avatar
								src={profileData.avatar}
								alt="Profile Avatar"
								style={{
									objectFit: "cover",
									width: "100%",
									height: "100%",
									borderRadius: "50%",
								}}
							/>
						</div>
						<div>
							<input
								type="file"
								accept="image/*"
								onChange={handleAvatarChange}
								style={{display: "none"}}
								id="raised-button-file"
							/>
							<label htmlFor="raised-button-file">
								<Button
									variant="raised"
									component="span"
									sx={{"&:hover": {backgroundColor: "transparent"}}}
									disableRipple
								>
									<img
										src="https://lh3.googleusercontent.com/pw/AIL4fc-KA7uYyhv9W4mVFyQlbcDGWqiKWyD15tZyoDSRQ6n0S6oobtrETHblxxyplKPHyyuLm1AsjvujANDTiUhmE3tzq_IunD0Wg8FFHm4C-HllS4ooAwHlUVemPDEdL8aIDnwN791hcJ366ihXf_nuvwReUIpma_rvNplYeC6Zw5w4pjRtNChZ5wzrH94gxwvCm9nAa6MNs8_prNGb2bsNKx8m57oY6cQhERa3RQJWuXcr-RpRpVaMMkLjzb6rm9sR1-yy1wJf1p8A3Q_fQZry-aK8l0Ju3A5a8D4Mw7hiQiC7Ul4B8mCEn-RRyJvNLP2Mr-Ak2vKixVKGukeQaWy-KfW9DUAAvJfI1EyRidPuc5O38U-OlqYw0f-jTbi_DDPoq2m3ZPcKPZ1JyHX5kTDFHAUy9Q7mmKQBFaRDpDLieCn-Vfh9UQy7-Cj1Wb_NLIvASm850AhBntli6Pc01dNrK5Zn-AYQcBZSxhyjX0PoMTndsDvS-Ta9L9FvAh3-LGm_iNmAzZeqFVelSc0OEImh8Xg9j8HwRzD2n4saVupnGGYg2gvzYL0KJMRHF2iLmZKJJIUrA_9FTIRHLIHiof8hH0I2osaVOAeGa_6FJsC_UHBLfC3uWYh6DUSKRHIQoti7eJxucEkLwVXXSwtvvfMtNTDCEvFDmD3hIiM4tZ9aQcXSSEguCN3Ffklxjw9BGTHVEPOxvRVo7uF4bknjANe80cUoGJqpawzGhdxQZnmbJGt_ltEBIiNyePIp_X6n5Dri-STWE3oZLU00gFl4BEt7N9FZzC09mPOgbw_Fc-4veFEbLXhcaqEZ7n7rtOq-zUicXn53qrzeddIxuK3BcApgnvejaicpPMepIkM83zIDqc7vy1I0Fhia_NSQc7xeRlCDtxDsU6ZRSYLowN5esb3fV7-7uLCik6DuDizMUcaT_XBcoCcEfNbaIj_NGwnO=w96-h96-s-no?authuser=1"
										alt="Photo icon"
										style={{width: "25px", height: "25px", margin: "0px 10px"}}
									/>
									<h4 style={{color: "#064635"}}>Change avatar photo</h4>
								</Button>
							</label>
						</div>
					</div>
					<div
						className="form-resize"
						style={{display: "flex", width: "100%", marginTop: "35px"}}
					>
						<div
							className="first-part-resize"
							style={{display: "flex", flexDirection: "column"}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label style={{color: "#064635"}}>Username</label>
								<TextField
									id=""
									// label='Username'
									name="username"
									value={profileData.username}
									onChange={handleInputChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<PersonIcon style={{color: "#064635"}} />
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									sx={{style: {borderRadius: "20px"}}}
									size="small"
									required
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label htmlFor="" style={{color: "#064635"}}>
									Email
								</label>
								<TextField
									id=""
									label=""
									name="email"
									value={profileData.email}
									onChange={handleInputChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<EmailIcon style={{color: "gray"}} />
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(217, 217, 217, 0.30)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									size="small"
									disabled={true}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label htmlFor="" style={{color: "#064635"}}>
									Passsword
								</label>
								<TextField
									id=""
									label=""
									type="password"
									name="password"
									value={profileData.password}
									onChange={handleInputChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<img
													src="https://lh3.googleusercontent.com/pw/AIL4fc94jtHZvKR5pb4FdIWCg78i3cA6Vi-TNP2-R0Q172VadskhkYBxUK4RsgPkWXvN5u6eOLritDck99iHbpL_kglcb7cN2mSlx9BJbNTvkAx2MPFIbhesQW2dVEp3__qq2yo1iVriLvkQrEIfbLn7a1COvI3UWFNcAyq0yDI0PejIzws-A4s3qdgmmc-9NbCxB_4rSfUskC_tQ2CgZn3Zia__6bYoAV9qCmKGfHOWjJBZQRdnFzxxSaRbUDJHMZI56LWxkyRWpM_VFQzgmBTQYIeXK4otPBv0G7laol28SKFnTyPUHvqNMfpWyTBvdoqqsBVN5jTQg9MkDI98S20wIVIqeulO25Kcm8H4ohQMro5YlqI5WWe_sR5GwYiXaAQqSk97Ks9kURUklt3K0FSrpIR-SQP3yTy9YDImdxklYfspGoKMVgqVZFWnXEAlpEN3-LJfzgxaMMc2kgEppBSBRLsH9NbJLzexBjrWro-uWmsF3-0Be7gh7zWK9TSDvztoLZZf_rgBcsji0fjjCLkmptSrBeXrygNtjer0oIPqy3MS0e-48G7t6Hh2T8ROwqLAZWE_Ksy35v4Zk15nswuGZ9thPYQsbTdOfzSza6oUtc8HNBnasdN_5tiQLI-L1L5KOk8Oifk8c7WpPss2d8-d_Di_5ZZ-K2qPx445y0ThDy2NalZNIlIYbAUPf266miH2g9yrJR54SyblGwitBXX0ogyntL-Vd80W_SxbU3hW8wGcpZD-BOWCHCVyvtqGJ0tO10NP-2brh_WY9xoCdVvqbdk57gBDyj8Sar1t0zEq2wg7eym6ZWMhvW_6iaNvjNp10nhmq_lPD7LJUtMkC_kDPIyBulSG6wXyx_0GGs2s8wiZB_K2zRMUMFI-zFdzUrSg5l148jYS_hs_zvmn7HqMJoGP_hNypdbdu7nC7sh0-rbZLGZ80OJc09L6xdfY=w96-h96-s-no?authuser=1"
													alt="Password icon"
													style={{width: "25px", height: "25px"}}
												/>
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									size="small"
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label htmlFor="" style={{color: "#064635"}}>
									Confirm Passsword
								</label>
								<TextField
									id=""
									label=""
									type="password"
									name="confirmPassword"
									value={profileData.confirmPassword}
									onChange={handleInputChange}
									error={profileData.password !== profileData.confirmPassword} // 根据条件判断是否显示错误状态
									helperText={
										profileData.password !== profileData.confirmPassword
											? "Passwords do not match"
											: ""
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<img
													src="https://lh3.googleusercontent.com/pw/AIL4fc9CEJoPEZiIJsbHfOOW29g3rz165D0i6dRj98khQQboW2-MdL2Q8a1lifl-2DhDX4FkhfRU43ecxsx1wzXLDHyE1ZHPeiUqALmBdPVvrYM6mraljmxL3X7h1osarFHhp4VaseAVNlbiQhldp4cqT_ufIrfPF1UBH1Um_O67rOQMrQXo5lqZprvivnsL8bIw65xDouDxs8EHScl010W-fNtNePUjyXsHX4VuR-WZVzp9d1cCbf7wCll0dbnVUT7bWHd-ZsRf4cJysFDRPbCKaT88UWaOiGjU7E2W0Vtjg1YtlrgAWFIXDdhrLp8JJbBFnR1Lfj85sSRFADlXDUO3VbiRwP_zqc09xmnI-cKUfiiaCpaaK2bp_4RxcbB4TrrngLAxbTMcxSF-vJpJPD6b8xAydWafb6NzndYbdXfbR48egesbdGflP5lYeo_xyN24EqmCd-0b6O_HW9gBcviJSMZpNThAoJgp0JYElUwzRWkEsG0mL1Rh2F2rv2Fe25IdzQkl_5fbhSXxF7o3HoAKl3GUGAlw4s3M8eVyuZtJdHVW2iogOf73OrDOM0rF_RTs8KEMzLU0vj5RnHf0JxWk2LivX6H6i6yBk-RTYC07d5zd9VSLy8SLmvYax2irNa9hofQDPCwy1sUg56n9LeojVfs6eqksjx-QStwATNeDuQXjw7HvBVv9GUjIEPHzr-iwxav3zm0-ktfi8Mbsu5I5TPgJOlzgmyr1bbx6YPUoP9zsevXbTMm2Iewap7bv1jC5aQnYprDcS9GiQxbOp164bgTQd8OvlwJ2B2TD89p4p7ZLED2_dGBrQxogjwi-5diWGnOP5d_vktcJWz2TSObb7_D2udSETjPRVXoCsGy-vcbhoe8E3FlTFZdRsBezEZzJO8Pv_hIXqUaGCjhWBn8M3ClVqBsHFJKWP2tX2WA71eTROLY08BbAQnMbngfK=w96-h96-s-no?authuser=1"
													alt="Password icon"
													style={{width: "25px", height: "25px"}}
												/>
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									size="small"
								/>
							</div>
						</div>
						<div
							className="second-part-resize"
							style={{
								margin: " 0px 5%",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label style={{color: "#064635"}}>First Name</label>
								<TextField
									id=""
									label=""
									name="firstName"
									value={profileData.firstName}
									onChange={handleInputChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<PersonIcon style={{color: "#064635"}} />
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									sx={{style: {borderRadius: "20px"}}}
									size="small"
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label style={{color: "#064635"}}>Last Name</label>
								<TextField
									id=""
									label=""
									name="lastName"
									value={profileData.lastName}
									onChange={handleInputChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<PersonIcon style={{color: "#064635"}} />
											</InputAdornment>
										),
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									variant="outlined"
									className="profile-txt"
									sx={{style: {borderRadius: "20px"}}}
									size="small"
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: "20px",
								}}
							>
								<label htmlFor="" style={{color: "#064635"}}>
									Bio
								</label>

								<TextField
									id=""
									variant="outlined"
									multiline
									rows={4}
									name="bio"
									value={profileData.bio}
									onChange={handleInputChange}
									placeholder="Enter your bio"
									InputProps={{
										style: {
											borderRadius: "15px",
											backgroundColor: "rgba(255, 216, 169, 0.26)",
											border: "1px solid rgba(0, 0, 0, 0.50)",
										},
									}}
									className="profile-txt"
								/>
							</div>
						</div>
					</div>
					<div
						style={{
							marginTop: "30px",
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end",
							marginRight: "5%",
						}}
					>
						<Button
							type="submit"
							sx={{
								"&:hover": {backgroundColor: "#C4DFAA", borderRadius: "50%"},
							}}
							style={{borderRadius: "50%", marginRight: "20px"}}
						>
							<img
								src="https://lh3.googleusercontent.com/pw/AIL4fc-3xQpJiaZjBqO_XVRbXL72fmvD2CFWD6RyH_eSf9QjQLW-goh1xgmQiOBi_PLzdnobv9_23suCZ9bCNuMP7t0mBpaJgOe3DYJTscILKoc-V_L0Um_zT0bDTUAl2bv7akoVD-prWiHDI0sE9XvW1mVc_OhEXPOXKydftpt6nZMMrqrG9NBJncNKd0WS7APhdjtpr1ymy8MoL7CPxhlPXWkw9wsgeHLBMXmvSNuUNmW6YmaE97v-ty22A1Ew9hBCGxiWvIe3rsTdtLgYSuaPFFn-FTVNSgAS8hm-PK9o7mb8sFasi4G5AJkH-KW4yNespD0t5CfBFTA6EQhNFWwwo3eIqktR3Ety8T0_4Ins-znu7wrwKdmGZLWYFqEV4HSqOlITF1xcHmDAYvyrpVbPJcchQIH7pZaE64SSqFkrcqtQPuZ-6Xajgdlo7EENbLn8nEgg3cG8Djw7LudC9hnegDMU3CQJ543ir0C7bRbafOFAbfWYvmxY9zz-y8H6TNEG0OqxglyGvaz11qXEhFvusshPCftQnC4z7DQ0eCpUKK57mZg49fuQsSRV_Grlzx9mGMadkEHNeYMo2rocZLYVvcuWhyM_W6n8J_qdUlMKz-jWdAmSUgUYMZsJBI8Y6RrtSVS66iEKxrpcBD9onHHN2RRZx6mF2m1geoBMTCYg6TKfzDtcd4yJdlXc7Q-CFqEJ82TiE_TshWVNbnAPklzkC735AVfu4Rqhd8ldUzB1yfGWRZ85Ns_Xryu5AfwAjcsTFuD_W5wqmfBzvNidXS3SCfCgr6-wYvflcZSfmNSI5TN-b7ML0cYfruvhsJpNARI7VP4YIjdeNWN6pLmPsFxrIWuEtnT7VYyYbqagC4A-FyKVd45TWNDGWOn4UcpJzKY-9kEmxDF0Z6fV1N97cbQfVnIB8IxgvQrYlOuD-GaOKaS6LWD7em1SvDtJoqxg=w96-h96-s-no?authuser=1"
								alt="Save icon"
								style={{
									width: "40px",
									height: "40px",
									backgroundColor: "#C4DFAA",
									padding: "10px",
									borderRadius: "50%",
								}}
							/>
						</Button>

						<Button
							onClick={() => navigate(-1)}
							sx={{
								"&:hover": {backgroundColor: "#FFBFA9", borderRadius: "50%"},
							}}
							style={{borderRadius: "50%"}}
						>
							<img
								src="https://lh3.googleusercontent.com/pw/AIL4fc-zTSvqbWAzESddOkvSXjPoyvO6TzozWVGnprdeZMcYwIINDKVUvgicP3Ka-QqP8wjkIRFRTj_wSg7jSdbJsZKRcxZdV4ztfOeqgDRcNjFpEW2R0Z9J7PUOwcE1v5nrfSJJoOiyWe7PdMHYnCaC2RHMn1QhQI3toUyVY4CNORs4HVqeDLriP6bgyExh35k112l1JVMxJaeX0obxlbnnaCcekA7R26U9m6TQIjhdPiokHSLXZBSG7J8U_nYQILw6deQzqKF_ByqX-rz5fRJ1A-hxDtG1nRnRizP3DlKpysyPh-gF6QdVG7mWTxx24zIdgO4mi_5HG0J-SKjMFZ8NkV8HubgvWrn0WLQSX3MLQ6n3Zs2PA8NGBJMT3LEzpdhQIzkUMU4uUPPed5UWD1MfjCH4czjKKrJvGxm7GLpKRXsckMzQvf-XuPFsQnOCv869Ph-DmOIgSkgRMXFEmCFQ-_57ohE2Ns2PjaRhIgbiLb5XF868-QNPFkBXKapr-3o_XQQxlFyYBtOYs7EPTY1uZidHs8Sabm_O9V6BQ4rIlmTEeCuEez_97mDqh_qnF6bu3ZWxJb_iSXZgmYUYo-4O4Si80sWqj7xqKMPd08jvHdXPyuIWrUJviHvE7OeCml-TMTWIqsd9DFiLxOPsKYm4w9qlk5L_RAEwz_NzIzCB8ygo6U6kKQ2pfmSCNeKMVeWUc5RbCyMCwrGRPmSRbLcd7hAYZEIDkRaGB8x2xSFQmBU5QRSMOuZl2ukMkqd9Rh7zG9cdBt__nDLamiYBbelBchE4rKT7bfz_fxs4HKliQoK69BdfsVUPPHgBz1-szVZ5YdZvhqd3lYHPKHdz-PJcj36PYPV97Q1howK-yEaDvBEUxcmCJlSX2K68iAat-i3xFhdYuMGAHYCjOi7EG9rPCK3RQGh8bNpetVp4gGSIFVzPX82JG_OHrcLWLfBb=w96-h96-s-no?authuser=1"
								alt="Cancel icon"
								style={{
									width: "40px",
									height: "40px",
									backgroundColor: "#FFBFA9",
									padding: "10px",
									borderRadius: "50%",
								}}
							/>
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProfilePage;
