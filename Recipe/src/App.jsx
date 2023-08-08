import { useRoutes, useLocation } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/Signin";
import SignupPage from "./pages/signup";
import ProfilePage from "./pages/ProfilePage.jsx";
import Home from "./pages/Home.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import Recipes from "./pages/Recipes.jsx";
import AboutUs from "./pages/AboutUs";
import MyCollectionsPage from "./pages/MyCollectionsPage.jsx";
import CollectionDetailPage from "./pages/CollectionDetailPage.jsx";
import History from "./pages/History.jsx";
import Header from "./components/Header";
import NavBar from "./components/Navbar";
import Footer from './components/Footer';

// Function to conditionally render the Header or NavBar based on the route
function HeaderWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignupPage = location.pathname === "/signup";
  const isSigninPage = location.pathname === "/signin";
  const isProfilePage = location.pathname === "/profile";

  if (isSignupPage || isSigninPage || isProfilePage) {
    // Return null to exclude the header for SignupPage, SigninPage, and ProfilePage
    return null;
  }

  return isHomePage ? <Header /> : <NavBar />;
}

// Function to conditionally render the Footer based on the route
function FooterWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutUs = location.pathname === "/about_us";

  if (isHomePage || isAboutUs) {
    // Return the Footer component on the Home and AboutUs pages
    return <Footer />;
  } else {
    // Return null to exclude the footer from other pages
    return null;
  }
}

function App() {
  return (
    <>
      {/* Conditionally render the Header or NavBar */}
      <HeaderWrapper />
      {useRoutes([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/signin",
          element: <SignInPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/create_recipe",
          element: <CreateRecipe />,
        },
        {
          path: "/recipes/:recipeId",
          element: <RecipeDetailPage />,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
        {
          path: "/about_us",
          element: <AboutUs />,
        },
        {
          path: "/favorite",
          element: <MyCollectionsPage />,
        },
        {
          path: "/collectionDetail/:id",
          element: <CollectionDetailPage />,
        },
        {
          path: "/history",
          element: <History />,
        },
      ])}
      {/* Conditionally render the Footer component on the Home and AboutUs pages */}
      <FooterWrapper />
    </>
  );
}

export default App;
