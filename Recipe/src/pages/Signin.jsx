import {Button, Divider, Link, TextField, Typography} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import {signInWithPopup} from 'firebase/auth';
import {auth, googleProvider} from '../config/config';
import {useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import {getAuthErrorCode} from '../utils/util';
import Notification from '../components/Notification';
import api from "@/api/index.js";
import Box from '@mui/material/Box';

export default function SignInPage() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [notificationMessage, setNotificationMessage] = useState('');
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((response) => {
                api.register({email: response.user.email}).then(res => {
                    setNotificationMessage('User Successfully logged in');
                    setUser(res.user);
                    setTimeout(() => {
                        setNotificationMessage(null);
                        if(res.user.username){
                            navigate('/');
                        }else {
                            navigate("/profile")
                        }
                    }, 2000);
                })
            })
            .catch((error) => {
                const errorMessage = getAuthErrorCode(error.code);
                setNotificationMessage(errorMessage);
            });
    };

    const handleSignInWithEmailAndPassword = () => {
        // Add validation logic
        if (!userInfo.email || !userInfo.password) {
            return;
        }

        api.login({email: userInfo.email, password: userInfo.password}).then(res => {
            if (res.code) {
                setNotificationMessage('User Successfully logged in');
                setUser(res.user);
                setTimeout(() => {
                    if(res.user.username){
                        navigate('/');
                    }else {
                        navigate("/profile")
                    }
                }, 2000);
            } else {
                setNotificationMessage(res.message);
            }
        });
    };

    const handleRegisterLinkClick = () => {
        navigate('/signup'); // Path to jump to the registration interface
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
            <Typography variant="h4">Login</Typography>
            <Box padding="20px" border="1px solid #e6e4e4" display="flex" flexDirection="column" gap="20px">
                <TextField
                    value={userInfo.email}
                    type="text"
                    placeholder="Enter Your Email"
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    required  // set as required field
                    error={userInfo.email === ''} // Determine whether to display an error state according to the condition
                    helperText={userInfo.email === '' ? 'Please enter email' : ''}
                />
                <TextField
                    value={userInfo.password}
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                    required  // et as required field
                    error={userInfo.password === ''} // Determine whether to display an error state according to the condition
                    helperText={userInfo.password === '' ? 'Please enter  password' : ''}
                />
                <Button variant="contained" onClick={handleSignInWithEmailAndPassword}>
                    SignIn
                </Button>

                <Divider/>
                <Typography>Or signin using</Typography>
                <Button variant="contained" onClick={handleSignInWithGoogle}>
                    <GoogleIcon/>
                    Sign In With Google
                </Button>
            </Box>
            <Typography>
                Don't have an account?{' '}
                <Link component="button" onClick={handleRegisterLinkClick}>
                    Register
                </Link>
            </Typography>
            <Notification message={notificationMessage}/>
        </Box>
    );
}
