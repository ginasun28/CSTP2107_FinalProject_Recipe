import {Snackbar} from '@mui/material';

const Notification = ({message}) => {
    console.log(message)
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(message)}
            autoHideDuration={2000}
            message={message}
        />
    );
};

export default Notification;
