import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList.jsx";
import {FormControl, MenuItem, Select} from "@mui/material";
import api from "@/api/index.js";
import {useParams} from "react-router-dom";

const CollectionDetailPage = () => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState("");
    const {id} = useParams();

    useEffect(() => {
        // Get the latest recipe list
        api.getCollectionRecipes(id).then((res) => {
            setProducts(res.recipes);
        });
    }, []);

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
            <FormControl variant="outlined" style={{minWidth: 100,display:"flex",justifyContent:"flex-end", margin: "10px"}}>
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

export default CollectionDetailPage;
