// controllers/recipeController.js
const db = require('../firebase/firebase');
const admin = require('firebase-admin');
const {buildTree, sortCommentsByTime} = require("../utils");

const recipesCollection = db.collection('recipes');
const commentsCollection = db.collection('comments');
const ratingsCollection = db.collection('ratings');

// add comment
async function addComment(req, res) {
    const {recipeId} = req.params;
    const {content, userId, parentCommentId, target} = req.body;

    try {
        // Create a comment document and get its auto-generated ID
        const commentRef = commentsCollection.doc();
        const commentId = commentRef.id;

        // Create a comment data object
        const commentData = {
            id: commentId,
            content,
            userId,
            parentCommentId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            target,
            recipeId
        };

        // Save comments to database
        await commentRef.set(commentData);

        res.json({success: true, commentId});
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({success: false, message: 'Failed to add comment'});
    }
}

// add rating
async function addRating(req, res) {
    const { recipeId } = req.params;
    const { rating, userId } = req.body;

    try {
        // Get the current user's rating document for the recipe
        const userRatingDocs = await ratingsCollection
            .where('recipeId', '==', recipeId)
            .where('userId', '==', userId)
            .get();

        if (userRatingDocs.empty) {
            // If the user has not rated the recipe, create a new rating document and add the rating
            const ratingRef = ratingsCollection.doc();
            const ratingId = ratingRef.id;

            const ratingData = {
                id: ratingId,
                rating,
                userId,
                recipeId,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            await ratingRef.set(ratingData);
        } else {
            // If the user has already rated the recipe, update the rating value
            const userRatingId = userRatingDocs.docs[0].id;
            await ratingsCollection.doc(userRatingId).update({
                rating,
            });
        }

        // Get all scoring documents for the current recipe
        const ratingDocs = await ratingsCollection.where('recipeId', '==', recipeId).get();

        // Calculate Average Rating
        let totalRating = 0;
        ratingDocs.forEach(doc => {
            totalRating += doc.data().rating;
        });
        const averageRating = totalRating / ratingDocs.size;

        // Update the average rating field in the recipe document
        await recipesCollection.doc(recipeId).update({
            averageRating,
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error adding or updating rating:', error);
        res.status(500).json({ success: false, message: 'Failed to add or update rating' });
    }
}


// Get all reviews for a recipe
async function getCommentsByRecipeId(req, res) {
    const { recipeId } = req.params;

    try {
        // Get all comment documents associated with the recipeId
        const commentDocs = await commentsCollection.where('recipeId', '==', recipeId).get();

        // Array to store comments with user details
        const comments = [];

        // Fetch user information for each comment
        await Promise.all(
            commentDocs.docs.map(async (doc) => {
                const commentData = doc.data();
                const userId = commentData.userId;

                // Fetch user details for the comment
                const userDoc = await db.collection('users').doc(userId).get();
                // Add user information to the comment data
                commentData.user = userDoc.data();

                // Format the creation time
                commentData.createdAt = formatDate(commentData.createdAt);

                comments.push(commentData);
            })
        );
        res.json({ success: true, comments: sortCommentsByTime(buildTree(comments)) });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


// Get user ratings for a specific recipe
async function getUserRatingByRecipeId(req, res) {
    const {recipeId, userId} = req.params;
    console.log(recipeId)
    console.log(userId)
    try {
        // Get the user's rating document for the recipe
        const ratingDocs = await ratingsCollection
            .where('recipeId', '==', recipeId)
            .where('userId', '==', userId)
            .get();

        if (ratingDocs.empty) {
            return res.json({success: true, userRating: null});
        }

        // If the user has rated the recipe, return the rating data
        const ratingData = ratingDocs.docs[0].data();
        res.json({success: true, userRating: ratingData});
    } catch (error) {
        console.error('Error fetching user rating:', error);
        res.status(500).json({success: false, message: 'Failed to fetch user rating'});
    }
}



function formatDate(timestamp) {
    const date = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format the date as a string (you can customize the format if needed)
}

module.exports = {addComment, addRating, getCommentsByRecipeId, getUserRatingByRecipeId};
