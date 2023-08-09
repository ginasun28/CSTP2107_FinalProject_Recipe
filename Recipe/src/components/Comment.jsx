import React, {useState} from 'react';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import './styles/RecipeDetailsPage.css'

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

    
    const handleCloseReply = () => {
        setReplyToCommentId(null);
        setUserReply(''); // Clear reply content
        
    }

    return (
        <>
            <div className='all-comments-position' style={{display: 'flex', flexDirection: 'row', paddingTop: '20px'}}>
                <Avatar src={user.avatar} style={{height: '50px', width: '50px'}}/>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '10px'}}>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <h4 className='poppins-font' style={{marginRight: '10px'}}>{user.username}</h4>
                        <Typography variant="caption" className='body-font'>
                            created at: {createdAt}
                        </Typography> {/* Display the creation time */}
                        
                        {target && <span>: Reply to {<span style={{color: '#008ac5'}}>@{target.username}</span>}</span>}
                    </div>

                    <div>
                        <Typography>{content}</Typography>

                        <Button variant="text" onClick={handleReply} sx={{'&:hover': {backgroundColor: 'transparent'}}} style={{textTransform: "none"}} disableRipple>
                            <h4 className='poppins-font-orange'>Reply</h4>
                        </Button>

                        {replyToCommentId === id && (
                            <div>
                                <TextField
                                    label="Your reply"
                                    multiline
                                    rows={3}
                                    value={userReply}
                                    onChange={handleReplyChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{style: {border: '1px solid #064635', borderRadius: '10px'}}}
                                />
                                <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: '5px'}}>
                                    <Button variant="contained" onClick={handleConfirmReply} style={{borderRadius: '10px', backgroundColor: '#FF7F3F'}}>
                                        Confirm Reply
                                    </Button>
                                    <Button variant='contained' onClick={handleCloseReply} style={{borderRadius: '10px', backgroundColor: '#FF7F3F'}}>
                                        Cancel Reply
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>

            {/* OG CODE */}
            {/* {/* <Box mt={2}> */}
                {/* <Typography variant="subtitle2">
                    <Avatar src={user.avatar}/>  */}
                    {/* {user.username}
                    {target && <span>: Reply to {<span style={{color: '#008ac5'}}>@{target.username}</span>}</span>} */}
                {/* </Typography> */}
                {/* <Typography>{content}</Typography> */}
                {/* <Typography variant="caption">Created at: {createdAt}</Typography> Display the creation time */}
                {/* <Button variant="text" onClick={handleReply} style={{textTransform: "none"}}>
                    reply
                </Button> */}

                {/* {replyToCommentId === id && (
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
                )} */}

                {children.length ? (
                    <div className="reply" style={{marginLeft: 40, background: '#F9F3DF'}}>
                        {children.map((childComment) => (
                            <Comment key={childComment.id} comment={childComment} onReply={onReply}
                                    onConfirmReply={onConfirmReply}/>
                        ))}
                    </div>
                ) : null}
            {/* </Box> */}
        </>
    );
};

export default Comment;
