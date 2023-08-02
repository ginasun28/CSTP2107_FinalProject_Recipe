import React, {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList.jsx";
import {Divider, FormControl, IconButton, Menu, MenuItem, Select, Typography} from "@mui/material";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import {useLocation} from "react-router-dom";

import '../components/styles/RecentRecipe.css'

const History = () => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState("All");
    const [user, setUser] = useLocalStorage('user', null);
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const [anchorEl, setAnchorEl] = useState(null);

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
    const handleFilterTypeChange = (filter) => {
        setFilterType(filter);
        handleCloseFilter();
    };

    // Filter based on search text and filter type
    const filteredProducts = products.filter((product) => {
        return filterType === "All" || product.type === filterType;
    });

    // Filter option
    const handleFilterClick = event => {
        setAnchorEl(event.currentTarget)
    };

    const handleCloseFilter = () => {
        setAnchorEl(null)
    };

    const types = [
        "All",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack"
    ]

    return (
        <div style={{paddingBottom: '40px'}}>
            <Navbar/>
            <div style={{padding: '0px 30px', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: '50px'}}>
                    <h3 className='recipe-title' style={{margin: '0px 0px'}}>Recent</h3>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {/* Edited Filter version */}
                        <IconButton
                            onClick={handleFilterClick}
                            disableRipple
                        >
                            <img 
                                src="src/assets/icons8-filter-96 (2).png" 
                                alt="Filter icon"
                                style={{width: '35px', height: '35px'}} 
                            />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseFilter}
                        >
                            {
                                types.map((filter) => {
                                    return (
                                        <MenuItem
                                            key={filter}
                                            onClick={() => handleFilterTypeChange(filter)}
                                            value={filter}
                                        >
                                            <Typography textAlign="center">
                                                {filter}
                                            </Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>

                        {/* filter dropdown list */}
                        {/* <FormControl variant="outlined"
                                style={{minWidth: 100, display: "flex", justifyContent: "flex-end", margin: "10px", paddingRight: '50px'}}>
                            <Select value={filterType} onChange={handleFilterTypeChange}>
                                <MenuItem value="">All Types</MenuItem>
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                                <MenuItem value="Dessert">Dessert</MenuItem>
                                <MenuItem value="Snack">Snack</MenuItem>
                            </Select>
                        </FormControl> */}
                        
                    </div>
                </div>
            </div>
            <Divider sx={{
                borderBottomWidth: 3, 
                width: '90%',
                marginLeft: '30px',
                // Error..might have to customize and change the inner props
                background: "conic-gradient(from 180deg at 50% 50.00%, #E38B29 76.87deg, rgba(227, 139, 41, 0.00) 195.0deg)"
            }}
            />
            
            <div style={{padding: '0px 30px'}}>
                {/* recipe list */}
                <ProductList products={filteredProducts} isUser={id === user?.id || !id} load={load}/>
            </div>
            
        </div>
    );
};

export default History;
