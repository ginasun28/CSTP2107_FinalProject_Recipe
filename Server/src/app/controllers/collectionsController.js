const db = require("../firebase/firebase");

async function addFavorite(req, res) {
    const {userId, collectionId, recipeId} = req.body;

    try {
        // Check if favorite already exists
        const favorite = await db.collection('favorites').where('userId', '==', userId)
            .where('collectionId', '==', collectionId).where('recipeId', '==', recipeId).get();

        if (!favorite.empty) {
            // Collection already exists, returns an error message
            res.status(200).json({message: 'Recipe already added to favorites'});
        } else {
            // add favorite record
            await db.collection('favorites').add({
                userId,
                collectionId,
                recipeId,
            });
            res.json({message: 'Recipe added to favorites successfully'});
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({message: 'Failed to add favorite'});
    }
}

async function createCollection(req, res) {
    const {userId, name} = req.body;

    try {
        // Create new favorite record
        const newCollection = await db.collection('collections').add({
            userId,
            name,
        });
        res.json({code: 0, id: newCollection.id});
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}


async function getUserCollections(req, res) {
    const {userId} = req.params;

    try {
        const collectionsSnapshot = await db.collection('collections').where('userId', '==', userId).get();
        const collections = collectionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.json({collections});
    } catch (error) {
        console.error('Error fetching user collections:', error);
        res.status(500).json({message: 'Failed to fetch user collections'});
    }
}

async function getCollectionRecipes(req, res) {
    const {collectionId} = req.params;

    try {
        // Get a snapshot of favorites
        const favoritesSnapshot = await db
            .collection('favorites')
            .where('collectionId', '==', collectionId)
            .get();

        // Get recipe id from snapshot
        const recipeIds = favoritesSnapshot.docs.map((doc) => doc.data().recipeId);

        if (!recipeIds.length) {
            res.json({recipes: []});
            return;
        }

        // Get recipe details in batches according to recipe ID
        const recipesPromises = recipeIds.map((recipeId) => {
            return db.collection('recipes').doc(recipeId).get();
        });

        const recipesSnapshot = await Promise.all(recipesPromises);

        // Map recipe data
        const recipes = recipesSnapshot.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        res.json({recipes});
    } catch (error) {
        res.status(500).json({message: error});
    }
}


async function deleteCollection(req, res) {
    const {collectionId} = req.params;
    try {
        // delete favorite record
        await db.collection('collections').doc(collectionId).delete();

        // Delete all favorite records under this favorite
        const favoritesSnapshot = await db.collection('favorites').where('collectionId', '==', collectionId).get();
        favoritesSnapshot.docs.forEach((doc) => doc.ref.delete());

        res.json({code: 0, message: 'Collection deleted successfully'});
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}

async function removeFavorite(req, res) {
    const {recipeId, userId} = req.params;

    console.log(recipeId,userId)

    try {
        // Query whether the favorite record exists
        const favoriteSnapshot = await db.collection('favorites').where('recipeId', '==', recipeId).where('userId', '==', userId).get();

        if (!favoriteSnapshot.empty) {
            // delete favorite record
            await favoriteSnapshot.docs[0].ref.delete();
            res.json({code: 0, message: 'Recipe removed from collection successfully'});
        } else {
            res.status(404).json({code: 1, message: 'Recipe not found in collection'});
        }
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}

async function checkFavorite(req, res) {
    const {userId, recipeId} = req.body;

    try {
        // Query whether the favorite record exists
        const favoriteSnapshot = await db
            .collection('favorites')
            .where('userId', '==', userId)
            .where('recipeId', '==', recipeId)
            .get();

        const isFavorite = !favoriteSnapshot.empty;

        res.json({isFavorite});
    } catch (error) {
        console.error('Error checking favorite:', error);
        res.status(500).json({message: 'Failed to check favorite'});
    }
}

module.exports = {
    addFavorite,
    createCollection,
    getUserCollections,
    getCollectionRecipes,
    deleteCollection,
    removeFavorite,
    checkFavorite
};
