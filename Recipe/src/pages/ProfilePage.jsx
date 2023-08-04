import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Navbar from "@/components/Navbar";
import Box from '@mui/material/Box';
import {Link, useNavigate} from "react-router-dom";
import { InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import '../components/styles/ProfilePage.css'

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        avatar: null,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
    });
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    useEffect(() => {
		document.title = "Profile";
	}, []);

    useEffect(() => {
        api.getUser({id: user.id}).then(res => {
            console.log(res)
            delete res.password
            setUser(res)
            setProfileData(res)
        })
    }, [])
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        api.upload(formData)
            .then((data) => {
                // 处理上传成功后的逻辑
                const imageURL = data.imageURL;
                setProfileData((prevState) => ({
                    ...prevState,
                    avatar: imageURL,
                }));
                console.log('Avatar uploaded:', imageURL);
            })
            .catch((error) => {
                // 处理上传失败或错误的逻辑
                console.error('Error uploading avatar:', error);
            });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        // 处理保存个人资料逻辑
        setUser(profileData)
        api.updateUser(profileData).then(() => {
            navigate("/recipes")
        })
    };

    return (
        <>
            <div className='editProfile-font' style={{paddingBottom: '30px'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                    <div style={{position: 'absolute', left: '0'}}>
                        <Link to={'/'}>
                            <img src="./src/assets/icons8-home-96.png" alt="Home icon" style={{height: '30px', width: '30px', padding: '10px 30px'}}/>
                        </Link>
                    </div>

                    <h2 style={{color: '#E38B29', paddingBottom: '20px'}}>Edit Profile</h2>
                </div>

                <form onSubmit={handleSaveProfile}>
                    <div className='avatar-resize'>
                        <div className='picture-resize' style={{backgroundColor: 'white', borderRadius: '50%'}}>
                            <Avatar src={profileData.avatar} alt="Profile Avatar" style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%'}}/>
                        </div>

                        <div>
                            <input type="file" 
                                   accept="image/*" 
                                   onChange={handleAvatarChange}
                                   style={{display: 'none'}}
                                   id='raised-button-file'
                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="raised" component="span" sx={{"&:hover": {backgroundColor: 'transparent'}}} disableRipple>
                                    <img src="./src/assets/icons8-photo-96.png" alt="Photo icon" style={{width: '30px', height: '30px', margin: '0px 10px'}} />
                                    <h4 style={{color: '#064635'}}>Change avatar photo</h4>
                                </Button>
                            </label> 
                        </div>
                    </div>

                    {/* OG code */}
                    {/* Image Upload */}
                    {/* <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Avatar
                            sx={{width: 100, height: 100, margin: '0 auto'}}
                            alt="Profile Avatar"
                            src={profileData.avatar}
                        />
                        <input type="file" accept="image/*" onChange={handleAvatarChange}/>
                    </Grid> */}

                    <div className='form-resize' style={{display: 'flex', width: '100%', marginTop: '35px'}}>
                        <div className='first-part-resize' style={{display: 'flex', flexDirection: 'column'}}>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label style={{color: '#064635'}}>Username</label>
                                <TextField 
                                    id=''
                                    // label='Username'
                                    name='username'
                                    value={profileData.username}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                                <PersonIcon style={{color: '#064635'}} />
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    sx={{style: {borderRadius: '20px'}}}
                                    size='small'
                                    required
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label htmlFor="" style={{color: '#064635'}}>Email</label>
                                <TextField 
                                    id=''
                                    label=''
                                    name='email'
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                                <EmailIcon style={{color: 'gray'}}/>
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(217, 217, 217, 0.30)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    size='small'
                                    disabled= {true}
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label htmlFor="" style={{color: '#064635'}}>Passsword</label>
                                <TextField 
                                    id=''
                                    label=''
                                    type='password'
                                    name='password'
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                                <img src="./src/assets/icons8-password-96.png" alt="Password icon" style={{width: '25px', height: '25px'}} />
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    size='small'
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label htmlFor="" style={{color: '#064635'}}>Confirm Passsword</label>
                                <TextField 
                                    id=''
                                    label=''
                                    type='password'
                                    name='confirmPassword'
                                    value={profileData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={profileData.password !== profileData.confirmPassword} // 根据条件判断是否显示错误状态
                                    helperText={profileData.password !== profileData.confirmPassword ? 'Passwords do not match' : ''}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                            <img src="./src/assets/icons8-password-96.png" alt="Password icon" style={{width: '25px', height: '25px'}} />
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    size='small'
                                />
                            </div>

                        </div>

                        <div className='second-part-resize' style={{margin: ' 0px 5%', display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label style={{color: '#064635'}}>First Name</label>
                                <TextField 
                                    id=''
                                    label=''
                                    name='firstName'
                                    value={profileData.firstName}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                                <PersonIcon style={{color: '#064635'}}/>
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    sx={{style: {borderRadius: '20px'}}}
                                    size='small'
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label style={{color: '#064635'}}>Last Name</label>
                                <TextField 
                                    id=''
                                    label=''
                                    name='lastName'
                                    value={profileData.lastName}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position='end'>
                                                <PersonIcon style={{color: '#064635'}}/>
                                        </InputAdornment> 
                                        ),
                                        style: {
                                            borderRadius: '15px',
                                            backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                            border: '1px solid rgba(0, 0, 0, 0.50)'
                                        }
                                    }}
                                    variant='outlined'
                                    className='profile-txt'
                                    sx={{style: {borderRadius: '20px'}}}
                                    size='small'
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', marginTop: '20px'}}>
                                <label htmlFor="" style={{color: '#064635'}}>Bio</label>
                                
                                <TextField  id='' 
                                            variant='outlined' 
                                            multiline
                                            rows={4}
                                            name='bio'
                                            value={profileData.bio}
                                            onChange={handleInputChange}
                                            placeholder='Enter your bio'
                                            InputProps={{style: {
                                                borderRadius: '15px',
                                                backgroundColor: 'rgba(255, 216, 169, 0.26)',
                                                border: '1px solid rgba(0, 0, 0, 0.50)'
                                            }}} 
                                            className='profile-txt'
                                />
                            </div>
                        </div>

                    </div>
                    
                    <div style={{marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginRight: '5%'}}>
                        <Button type='submit' sx={{'&:hover': {backgroundColor: '#C4DFAA', borderRadius: '50%'}}} style={{borderRadius: '50%', marginRight: '20px'}}>
                            <img src="./src/assets/icons8-save-96 (5).png" 
                                alt="Save icon" 
                                style={{width: '40px', height: '40px', backgroundColor: '#C4DFAA', padding: '10px', borderRadius: '50%'}}
                        />
                        </Button>

                        
                        <Button onClick={() => navigate(-1)} sx={{'&:hover': {backgroundColor: '#FFBFA9', borderRadius: '50%'}}} style={{borderRadius: '50%'}}>
                            <img src="./src/assets/icons8-cancel-96.png" 
                                alt="Cancel icon" 
                                style={{width: '40px', height: '40px', backgroundColor: '#FFBFA9', padding: '10px', borderRadius: '50%'}}
                            />
                        </Button>
                    
                        
                    </div>
                    
                    {/* USERNAME  */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Username"
                                name="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </FormControl>
                    </Grid> */}

                    {/* FIRST NAME */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid> */}

                    {/* LAST NAME */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid> */}

                    {/* EMAIL */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={true}
                            />
                        </FormControl>
                    </Grid> */}

                    {/* PASSWORD */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                value={profileData.password}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid> */}

                    {/* CONFIRM PASSWORD */}
                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={profileData.confirmPassword}
                                onChange={handleInputChange}
                                error={profileData.password !== profileData.confirmPassword} // 根据条件判断是否显示错误状态
                                helperText={profileData.password !== profileData.confirmPassword ? 'Passwords do not match' : ''}
                            />
                        </FormControl>
                    </Grid> */}

                    {/* BIO */}
                    {/* <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label="Bio"
                                multiline
                                rows={4}
                                name="bio"
                                value={profileData.bio}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid> */}
                
                    {/* SAVE BTN */}
                    {/* <Box marginTop={2}>
                        <Button variant="contained" type="submit">Save Profile</Button>
                    </Box> */}
                </form>
            </div>
            
        </>
    );
};

export default ProfilePage;

