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
import {useNavigate} from "react-router-dom";

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

    return (<>
            <Navbar/>
            <Box display="flex" flexDirection="column" sx={{width: '60%'}} style={{margin:"auto"}} alignItems="center">
                <Typography variant="h4">Profile</Typography>
                <form onSubmit={handleSaveProfile}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Avatar
                                sx={{width: 100, height: 100, margin: '0 auto'}}
                                alt="Profile Avatar"
                                src={profileData.avatar}
                            />
                            <input type="file" accept="image/*" onChange={handleAvatarChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={profileData.lastName}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                    <Box marginTop={2}>
                        <Button variant="contained" type="submit">Save Profile</Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default ProfilePage;

