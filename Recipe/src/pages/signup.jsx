import {Button, Divider, TextField, Typography} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth, googleProvider} from '../config/config';
import Notification from '../components/Notification';
import {useNavigate} from 'react-router-dom';
import {getAuthErrorCode} from '../utils/util';
import api from "@/api/index.js";
import Box from '@mui/material/Box';

export default function SignupPage() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [notificationMessage, setNotificationMessage] = useState('');
    const navigate = useNavigate();

    const handleSignupWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                api.register({email: response.user.email}).then(() => {
                    setNotificationMessage('User Successfully logged in');
                    setTimeout(() => {
                        setNotificationMessage(null);
                        navigate('/');
                    }, 2000);
                })
            })
            .catch((error) => {
                const errorMessage = getAuthErrorCode(error.code);
                setNotificationMessage(errorMessage);
            });
    }

    const handleSignupWithEmailAndPassword = () => {
        // Add validation logic
        if (!userInfo.email || !userInfo.password || !userInfo.confirmPassword) {
            return;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            return;
        }

        api.register({email: userInfo.email, password: userInfo.password}).then(res => {
            if (res.code) {
                setNotificationMessage('Your account already exists');
            } else {
                setNotificationMessage('Your Account is created');
                setTimeout(() => {
                    setNotificationMessage(null);
                    navigate('/signin');
                }, 2000);
            }
        });
    }

    return (
        <Box display='flex' flexDirection="column" justifyContent='center' alignItems="center">
            <Typography variant="h4">Signup</Typography>

            <Box padding="20px" border="1px solid #e6e4e4" display='flex' flexDirection="column" gap="20px">
                <TextField
                    value={userInfo.email}
                    type='text'
                    placeholder='Enter Your Email'
                    required
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    error={userInfo.email === ''} // Determine whether to display an error state according to the condition
                    helperText={userInfo.email === '' ? 'Please enter email and password' : ''}
                />
                <TextField
                    value={userInfo.password}
                    type='password'
                    placeholder='Enter Your Password'
                    required
                    onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                    error={userInfo.password === ''} // Determine whether to display an error state according to the condition
                    helperText={userInfo.password === '' ? 'Please enter email and password' : ''}
                />
                <TextField
                    value={userInfo.confirmPassword}
                    type='password'
                    placeholder='Confirm Your Password'
                    required
                    onChange={(e) => setUserInfo({...userInfo, confirmPassword: e.target.value})}
                    error={userInfo.password !== userInfo.confirmPassword} // Determine whether to display an error state according to the condition
                    helperText={userInfo.password !== userInfo.confirmPassword ? 'Passwords do not match' : ''}
                />
                <Button variant='contained' onClick={handleSignupWithEmailAndPassword}>Signup</Button>
                <Divider/>
                <Typography>Or signup using</Typography>
                <Button variant="contained" onClick={handleSignupWithGoogle}>
                    <GoogleIcon/>
                    Sign Up With Google
                </Button>
            </Box>
            <Notification  message={notificationMessage}/>
        </Box>
    )
}

