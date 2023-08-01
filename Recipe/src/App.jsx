import {useRoutes} from 'react-router-dom';
import './App.css'
import SignInPage from './pages/Signin';
// import useLocalStorage from './hooks/useLocalStorage';
import SignupPage from './pages/signup';
import ProfilePage from "@/pages/ProfilePage.jsx";
import Home from "@/pages/Home.jsx";
import CreateRecipe from "@/pages/CreateRecipe.jsx";
import RecipeDetailPage from "@/pages/RecipeDetailPage.jsx";
//import RecipesList from './pages/RecipesList'
import Recipes from "@/pages/Recipes.jsx";
import AboutUs from './pages/AboutUs';
import MyCollectionsPage from "@/pages/MyCollectionsPage.jsx";
import CollectionDetailPage from "@/pages/CollectionDetailPage.jsx";
import History from "@/pages/History.jsx";



function App() {

    return useRoutes([
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/signup',
            element: <SignupPage/>
        },
        {
            path: '/signin',
            element: <SignInPage/>
        },
        {
            path: '/profile',
            element: <ProfilePage/>
        },
        {
            path: '/create_recipe',
            element: <CreateRecipe/>
        },
        {
            path: '/recipes/:recipeId',
            element: <RecipeDetailPage/>
        },
        {
            path: '/recipes',
            element: <Recipes/>
        },
        // {
        //     path: '/recipes',
        //     element: <RecipesList/>
        // },
        {
            path: '/about_us',
            element: <AboutUs/>
        },
        {
            path: '/favorite',
            element: <MyCollectionsPage/>
        },
        {
            path: '/collectionDetail/:id',
            element: <CollectionDetailPage/>
        },
        {
            path: '/history',
            element: <History/>
        },
    ]);
}


export default App;
