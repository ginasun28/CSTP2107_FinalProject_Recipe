const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const recipesController = require("../controllers/recipesController");
const collectionsController = require("../controllers/collectionsController");
const commentsController = require('../controllers/commentsController');
const cloudinary = require('cloudinary').v2;
const upload = multer({dest: 'uploads/'});

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dzurjgoqh',
    api_key: '461889723183623',
    api_secret: '8z9cSoikAB1Sagws95cWeXFiVMA'
});

let routes = app => {

    router.post("/login", userController.login);
    router.post("/register", userController.addUser);
    router.post("/user", userController.getUser);
    router.put('/user/:id', userController.updateUser);
    app.post('/recipes', recipesController.addRecipe)
    app.get('/recipes', recipesController.getRecipe)
    app.get('/getAllRecipe', recipesController.getAllRecipe)
    app.get('/getUserRecipes/:userId', recipesController.getUserRecipes)
    app.get('/recipes/:id', recipesController.getRecipeById)
    app.post('/search', recipesController.search)
    app.delete('/recipes/:id', recipesController.deleteRecipe);

    app.post('/collections', collectionsController.createCollection);

    app.get('/collections/:userId', collectionsController.getUserCollections);

    app.get('/collections/:collectionId/recipes', collectionsController.getCollectionRecipes);

    app.delete('/collections/:collectionId', collectionsController.deleteCollection);

    app.post('/favorites', collectionsController.addFavorite);

    app.delete('/favorites/:recipeId/:userId', collectionsController.removeFavorite);

    app.post('/checkFavorite', collectionsController.checkFavorite);


    router.post('/comment/:recipeId/comments', commentsController.addComment);

    router.post('/comment/:recipeId/ratings', commentsController.addRating);

    router.get('/comment/:recipeId/comments', commentsController.getCommentsByRecipeId);

    router.get('/recipes/:recipeId/ratings/:userId', commentsController.getUserRatingByRecipeId);

    // simple routing
    router.get("/", (req, res) => {
        res.json({message: "express..."});
    });
    router.post('/upload', upload.single('file'), (req, res) => {
        const file = req.file; // Suppose the uploaded file field name is "file"

        // Upload images using Cloudinary
        cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
                console.error('Error uploading image:', error);
                res.status(500).json({error: 'Error uploading image'});
            } else {
                // The upload is successful, and the public access link of the image is returned
                const imageURL = result.secure_url;
                res.json({imageURL});
            }
        });
    });
    return app.use("/", router);

    // delete uploads folder
};

module.exports = routes;
