import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList.jsx";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import api from "@/api/index.js";

const Recipes = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filterType, setFilterType] = useState("");

    useEffect(() => {
        //Get the latest recipe list
        api.getAllRecipe().then((res) => {
                setProducts(res.latestRecipes)
        });
    }, []);

    // Handle the search box text change event
    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    // Handle filter type change event
    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    // Filter based on search text and filter type
    const filteredProducts = products.filter((product) => {
        return filterType === "" || product.type === filterType;
    });

    // Handle the search button click event
    const handleSearchButtonClick = () => {
        api.search({keyword: searchText, filterType: filterType}).then(res => {
            setProducts(res);
        })
    };

    // Handles keyboard key events, and if the "Enter" key is pressed, perform a search operation
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearchButtonClick();
        }
    };

    return (
        <div>
            <Navbar/>

            {/*search bar */}
            <TextField
                label="Search Recipe"
                value={searchText}
                onChange={handleSearchTextChange}
                onKeyPress={handleKeyPress}
                variant="outlined"
                style={{margin: "10px"}}
            />

            {/* filter dropdown list */}
            <FormControl variant="outlined" style={{minWidth: 100, margin: "10px"}}>
                <Select value={filterType} onChange={handleFilterTypeChange}>
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Snack">Snack</MenuItem>
                </Select>
            </FormControl>

            {/* recipe list */}
            <ProductList products={filteredProducts}/>
        </div>
    );
};

export default Recipes;
