import { useEffect, useState } from 'react';
import api from '@/api/index.js';
import { Box, Button, Modal, Paper, TextField, Typography } from '@mui/material';
import useLocalStorage from '@/hooks/useLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";

const MyCollectionsPage = () => {
    const [collections, setCollections] = useState([]);
    const [user, setUser] = useLocalStorage('user', null);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }

        // Fetch user's collections from the server
        // Replace 'userId' with the actual user ID or fetch it from the authentication state
        api.getUserCollections(user.id).then((res) => {
            setCollections(res.collections);
        });
    }, [user]);

    // Handler for creating a new collection
    const handleCreateCollection = () => {
        setIsModalOpen(true);
    };

    // Handler for confirming the new collection creation
    const handleConfirmCollectionCreation = () => {
        if (newCollectionName.trim() === '') {
            return;
        }

        api
            .createCollection({userId: user.id, name: newCollectionName})
            .then((res) => {
                // Handle success or error
                console.log('New collection created successfully:', res);
                // Refresh collections after creating a new one
                api.getUserCollections(user.id).then((res) => {
                    setCollections(res.collections);
                });
            })
            .catch((error) => {
                // Handle error
                console.error('Failed to create new collection:', error);
            });

        setNewCollectionName('');
        setIsModalOpen(false);
    };

    // Handler for closing the modal
    const handleCloseModal = () => {
        setNewCollectionName('');
        setIsModalOpen(false);
    };

    // Handler for deleting a collection
    const handleDeleteCollection = (collectionId) => {
        // Implement the logic to delete the collection with the provided collectionId
        console.log('Delete collection:', collectionId);
        api.deleteCollection(collectionId)
            .then((res) => {
                // Handle success or error
                console.log('Collection deleted successfully:', res);
                // Refresh collections after deleting
                api.getUserCollections(user.id).then((res) => {
                    setCollections(res.collections);
                });
            })
            .catch((error) => {
                // Handle error
                console.error('Failed to delete collection:', error);
            });
    };

    return (
        <>
            <Navbar/>
            <Box m={3}>
                <Typography variant="h5">My Collections</Typography>
                <Box display="flex" flexWrap="wrap" justifyContent="space-between" mt={2}>
                    {collections.map((collection) => (
                        <Paper key={collection.id} sx={{p: 2, flexGrow: 1, mr: 2}}>
                            <Typography variant="h6" onClick={() => {
                                navigate("/collectionDetail/" + collection.id)
                            }}>{collection.name}</Typography>
                            <Button variant="contained" onClick={() => handleDeleteCollection(collection.id)}>
                                Delete
                            </Button>
                        </Paper>
                    ))}
                </Box>
                <Button variant="contained" onClick={handleCreateCollection}>
                    Create
                </Button>
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            p: 3,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Enter Collection Name
                        </Typography>
                        <TextField
                            label="Collection Name"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            fullWidth
                        />
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                            <Button variant="contained" onClick={handleCloseModal} sx={{mr: 1}}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleConfirmCollectionCreation}>
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
};

export default MyCollectionsPage;
