import {useState} from 'react';
import {Box, Button, IconButton, Modal, Typography, TextField} from '@mui/material';
import {Close, Folder} from '@mui/icons-material';

const FavoriteModal = ({open, onClose, collections, selectedCollection, onCollectionSelect, onConfirmFavorite, onCreateCollection}) => {
    const [newCollectionName, setNewCollectionName] = useState(''); // Add the name of the favorite

    // Function to handle selecting favorites
    const handleSelectCollection = (collectionId) => {
        onCollectionSelect(collectionId);
    };

    // Function that handles confirming favorites
    const handleConfirmFavorite = () => {
        onConfirmFavorite(selectedCollection);
    };

    // Function to handle new favorites
    const handleCreateCollection = () => {
        onCreateCollection(newCollectionName);
        setNewCollectionName(''); // Clear the input box
    };

    // Render favorites list
    const renderCollections = () => {
        return collections.map((collection) => (
            <Box
                key={collection.id}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    py: 1,
                    backgroundColor: collection.id === selectedCollection ? 'lightgray' : 'transparent',
                }}
                onClick={() => handleSelectCollection(collection.id)}
            >
                <Folder sx={{mr: 1}}/>
                <Typography>{collection.name}</Typography>
            </Box>
        ));
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 300,
                    padding: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    Choose Collection
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Typography>
                {renderCollections()}
                <TextField
                    label="New Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    fullWidth
                    sx={{mt: 2}}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                    }}
                >
                    <Button variant="contained" onClick={handleCreateCollection}>
                        Create Collection
                    </Button>
                    <Button variant="contained" onClick={handleConfirmFavorite} disabled={!selectedCollection}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default FavoriteModal;
