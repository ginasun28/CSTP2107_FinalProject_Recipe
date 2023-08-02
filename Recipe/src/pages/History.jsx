import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList.jsx";
import {FormControl, MenuItem, Select} from "@mui/material";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useLocation} from "react-router-dom";

const History = () => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [user, setUser] = useLocalStorage('user', null);
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    useEffect(() => {
		document.title = "History";
	}, []);

    useEffect(() => {
        load()
    }, []);

    const load = () => {
        if (id) {
            api.getUserRecipes(id).then((res) => {
                setProducts(res.userRecipes);
            });
        } else {
            // Get the latest recipe list
            api.getUserRecipes(user.id).then((res) => {
                setProducts(res.userRecipes);
            });
        }
    }
    // Handle filter type change event
    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    // Filter based on search text and filter type
    const filteredProducts = products.filter((product) => {
        return filterType === "" || product.type === filterType;
    });

    return (
        <div>
            <Navbar/>
            {/* filter dropdown list */}
            <FormControl variant="outlined"
                         style={{minWidth: 100, display: "flex", justifyContent: "flex-end", margin: "10px"}}>
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
            <ProductList products={filteredProducts} isUser={id === user?.id || !id} load={load}/>
        </div>
    );
};

export default History;
