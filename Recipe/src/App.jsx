// import { v4 as uuidv4 } from "uuid";
// import { useEffect, useState } from "react";
//import ReceipeContext from "./context/ReceipeContext";
// import Header from "./component/Header";
// import Home from "./pages/Home";
// import RecipeList from "./pages/RecipesList";
// import Favourite from './pages/Favourite';
// import AboutUs from './pages/AboutUs';
// import NotFound from "./pages/NotFound";
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import './component/styles/styles.css'


// function App() {

//   return (
//     <>
//       <Router>
// 				<ReceipeContext.Provider>
// 					<Routes>
// 						<Route path="/" element={<Home />}></Route>
// 						<Route path="/create_receipe" element={<Favourite />}></Route>
// 						<Route path="/recipes" element={<RecipeList />}></Route>
//             <Route path="/about_us" element={<AboutUs />}></Route>
// 						<Route path="*" element={<NotFound />} />
// 					</Routes>
// 				</ReceipeContext.Provider>
// 			</Router>
//     </>
//   );
// }
import {useRoutes} from 'react-router-dom';
import './App.css'
import SignInPage from './pages/Signin';
// import useLocalStorage from './hooks/useLocalStorage';
import SignupPage from './pages/signup';
import ProfilePage from "@/pages/ProfilePage.jsx";
//import Home from "@/pages/Home.jsx";
//import CreateRecipe from "@/pages/CreateRecipe.jsx";
//import RecipeDetailPage from "@/pages/RecipeDetailPage.jsx";
//import Recipes from "@/pages/Recipes.jsx";
//import MyCollectionsPage from "@/pages/MyCollectionsPage.jsx";
//import CollectionDetailPage from "@/pages/CollectionDetailPage.jsx";
//import History from "@/pages/History.jsx";



function App() {

    return useRoutes([
        // {
        //     path: '/',
        //     element: <Home/>
        // },
        // {
        //     path: '/home',
        //     element: <Home/>
        // },
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
        // {
        //     path: '/createRecipe',
        //     element: <CreateRecipe/>
        // },
        // {
        //     path: '/recipes/:recipeId',
        //     element: <RecipeDetailPage/>
        // },
        // {
        //     path: '/recipes',
        //     element: <Recipes/>
        // },
        // {
        //     path: '/favorite',
        //     element: <MyCollectionsPage/>
        // },
        // {
        //     path: '/collectionDetail/:id',
        //     element: <CollectionDetailPage/>
        // },
        // {
        //     path: '/history',
        //     element: <History/>
        // },
    ]);
}


export default App;
