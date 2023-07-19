import axios from '@/utils/http.js';

export default {
    login(data) {
        return axios.post('/login/', {data})
    },
    register(data) {
        return axios.post('/register/', {data})
    },
    upload(data) {
        return axios.post('/upload/', {data})
    },
    getUser(data) {
        return axios.post('/user/', {data})
    },
    updateUser(data) {
        return axios.put('/user/' + data.id, {data})
    },
    addRecipes(data) {
        return axios.post('/recipes/', {data})
    },
    getRecipes() {
        return axios.get('/recipes/')
    },

    getAllRecipe() {
        return axios.get('/getAllRecipe/')
    },
    getUserRecipes(userId) {
        return axios.get('/getUserRecipes/' + userId)
    },
    deleteRecipes(id) {
        return axios.delete('/recipes/' + id)
    },
    getRecipesById(id) {
        return axios.get('/recipes/' + id)
    },
    search(data) {
        return axios.post('/search/', {data})
    },

    createCollection(data) {
        return axios.post('/collections', {data});
    },
    getUserCollections(userId) {
        return axios.get(`/collections/${userId}`);
    },
    getCollectionRecipes(collectionId) {
        return axios.get(`/collections/${collectionId}/recipes`);
    },
    deleteCollection(collectionId) {
        return axios.delete(`/collections/${collectionId}`);
    },
    addFavorite(data) {
        return axios.post('/favorites', {data});
    },
    checkFavorite(data) {
        return axios.post('/checkFavorite', {data});
    },
    removeFavorite(recipeId, userId) {
        return axios.delete(`/favorites/${recipeId}/${userId}`);
    },

    addComment(data) {
        return axios.post(`/comment/${data.recipeId}/comments`, {data});
    },

    addRating(data) {
        return axios.post(`/comment/${data.recipeId}/ratings`, {data});
    },

    getCommentsByRecipeId(recipeId) {
        return axios.get(`/comment/${recipeId}/comments`);
    },

    getUserRatingByRecipeId(recipeId, userId) {
        return axios.get(`/recipes/${recipeId}/ratings/${userId}`);
    },
}
