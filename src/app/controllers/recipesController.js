const db = require("../firebase/firebase");
const recipesCollection = db.collection('recipes');
const admin = require('firebase-admin');

async function addRecipe(req, res) {
    const {
        id,
        recipeName,
        type,
        cookingTime,
        servings,
        cuisine,
        ingredients,
        instructions,
        image,
        user
    } = req.body;

    try {
        if (id) {
            // If 'id' exists, it means the recipe already has an ID and should be updated.
            // Update the existing recipe document in the 'recipesCollection'.
            const timestamp = admin.firestore.FieldValue.serverTimestamp(); // Get the server timestamp.

            await recipesCollection.doc(id).set({
                recipeName,
                type,
                cookingTime,
                servings,
                cuisine,
                ingredients,
                instructions,
                image,
                user,
                createdAt: timestamp // Add the 'createdAt' field with the server timestamp.
            });
            res.json({code: 0, id}); // Return the same 'id' for the updated recipe.
        } else {
            // If 'id' does not exist, it means it's a new recipe and should be added.
            // Create a new recipe document in the 'recipesCollection' with the creation timestamp.
            const newRecipeRef = recipesCollection.doc(); // Create a new document reference with an auto-generated ID.
            const timestamp = admin.firestore.FieldValue.serverTimestamp(); // Get the server timestamp.

            // Add the new recipe document with the creation timestamp.
            await newRecipeRef.set({
                id: newRecipeRef.id,
                recipeName,
                type,
                cookingTime,
                servings,
                cuisine,
                ingredients,
                instructions,
                image,
                user,
                createdAt: timestamp // Add the 'createdAt' field with the server timestamp.
            });

            res.json({code: 0, id: newRecipeRef.id}); // Return the 'id' of the newly created recipe.
        }
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}


async function getRecipe(req, res) {
    try {
        const querySnapshot = await recipesCollection.orderBy('createdAt', 'desc').limit(4).get();

        const latestRecipes = [];
        querySnapshot.forEach((doc) => {
            const recipeData = doc.data();
            recipeData.id = doc.id;
            latestRecipes.push(recipeData);
        });
        res.json({code: 0, latestRecipes});
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}
async function getAllRecipe(req, res) {
    try {
        const querySnapshot = await recipesCollection.orderBy('createdAt', 'desc').get();

        const latestRecipes = [];
        querySnapshot.forEach((doc) => {
            const recipeData = doc.data();
            recipeData.id = doc.id;
            latestRecipes.push(recipeData);
        });
        res.json({code: 0, latestRecipes});
    } catch (error) {
        res.json({code: 1, error: error.message});
    }
}
async function getRecipeById(req, res) {
    try {
        const recipeId = req.params.id;

        //Query recipe details in the database according to recipeId
        const recipeDoc = await db.doc('recipes/' + recipeId).get();

        if (recipeDoc.exists) {
            const recipeData = recipeDoc.data();
            recipeData.id = recipeDoc.id
            res.json({success: true, recipe: recipeData});
        } else {
            res.status(404).json({success: false, message: 'Recipe not found'});
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({success: false, message: 'Failed to fetch recipe details'});
    }
}

async function search(req, res) {
    const {keyword} = req.body;

    try {
        const queryRecipeName = recipesCollection.where("recipeName", ">=", keyword).where("recipeName", "<=", keyword + "\uf8ff");
        const queryCuisine = recipesCollection.where("cuisine", ">=", keyword).where("cuisine", "<=", keyword + "\uf8ff");

        const snapshotRecipeName = await queryRecipeName.get();
        const snapshotCuisine = await queryCuisine.get();

        const resultsRecipeName = snapshotRecipeName.docs.map((doc) => doc.data());
        const resultsCuisine = snapshotCuisine.docs.map((doc) => doc.data());

        // Use the union method to combine query results and remove duplicates
        const combinedResults = union(resultsRecipeName, resultsCuisine, (a, b) => a.recipeName === b.recipeName);

        res.json(combinedResults);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

// union method for merging two arrays and removing duplicates
function union(arr1, arr2, comparator) {
    return arr1.concat(arr2.filter((item2) => !arr1.some((item1) => comparator(item1, item2))));
}

async function getUserRecipes(req, res) {
    const { userId } = req.params;

    try {
        // Query all recipes in the database that match the user ID
        const querySnapshot = await recipesCollection.where("user.id", "==", userId).get();

        const userRecipes = [];
        querySnapshot.forEach((doc) => {
            const recipeData = doc.data();
            recipeData.id = doc.id;
            userRecipes.push(recipeData);
        });

        res.json({ success: true, userRecipes });
    } catch (error) {
        console.error('Error fetching user recipes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch user recipes' });
    }
}

async function deleteRecipe(req, res) {
    try {
        const recipeId = req.params.id;

        // Find recipe details in the database based on recipeId
        const recipeDoc = await recipesCollection.doc(recipeId).get();

        if (recipeDoc.exists) {
            // If the recipe exists, delete it
            await recipesCollection.doc(recipeId).delete();
            res.json({ success: true, message: 'Recipe deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, message: 'Failed to delete recipe' });
    }
}

module.exports = {
    addRecipe, getRecipe, getRecipeById, search,getUserRecipes,getAllRecipe,deleteRecipe
};
