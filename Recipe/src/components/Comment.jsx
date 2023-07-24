import React, {useState} from 'react';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';

const Comment = ({comment, onReply, onConfirmReply}) => {
    const {id, user, content, children, target, parentCommentId, createdAt} = comment;
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [userReply, setUserReply] = useState('');

    const handleReply = () => {
        setReplyToCommentId(id);
        setUserReply(''); //Clear previous reply content
    };

    const handleConfirmReply = () => {
        // ((commentItem.parentCommentId || commentItem.id), (commentItem.parentCommentId ? commentItem.user : null))}
        onConfirmReply((parentCommentId || id), (parentCommentId ? user : null), userReply);
        setReplyToCommentId(null); // clear reply status
        setUserReply(''); // Clear reply content
    };

    const handleReplyChange = (event) => {
        setUserReply(event.target.value);
    };

    return (
        <Box mt={2}>
            <Typography variant="subtitle2">
                <Avatar src={user.avatar}/>
                {user.username}
                {target && <span>: Reply to {<span style={{color: '#008ac5'}}>@{target.username}</span>}</span>}
            </Typography>
            <Typography>{content}</Typography>
            <Typography variant="caption">Created at: {createdAt}</Typography> {/* Display the creation time */}
            <Button variant="text" onClick={handleReply} style={{textTransform: "none"}}>
                reply
            </Button>

            {replyToCommentId === id && (
                <Box mt={2}>
                    <TextField
                        label="Your reply"
                        multiline
                        rows={3}
                        value={userReply}
                        onChange={handleReplyChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={handleConfirmReply}>
                        Confirm Reply
                    </Button>
                </Box>
            )}

            {children.length ? (
                <div className="reply" style={{marginLeft: 40, background: '#f7f8fa', padding: 10}}>
                    {children.map((childComment) => (
                        <Comment key={childComment.id} comment={childComment} onReply={onReply}
                                 onConfirmReply={onConfirmReply}/>
                    ))}
                </div>
            ) : null}
        </Box>
    );
};

export default Comment;
