// import { v4 as uuidv4 } from "uuid";
// import { useEffect, useState } from "react";
import ReceipeContext from "./context/ReceipeContext";
// import Header from "./component/Header";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipesList";
import Favourite from './pages/Favourite';
import AboutUs from './pages/AboutUs';
import NotFound from "./pages/NotFound";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './component/styles/styles.css'


function App() {

  return (
    <>
      <Router>
				<ReceipeContext.Provider>
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/create_receipe" element={<Favourite />}></Route>
						<Route path="/recipes" element={<RecipeList />}></Route>
            <Route path="/about_us" element={<AboutUs />}></Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</ReceipeContext.Provider>
			</Router>
    </>
  );
}

export default App;
