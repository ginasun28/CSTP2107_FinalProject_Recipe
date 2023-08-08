import {useEffect, useState} from "react";
import ProductList from "@/components/ProductList.jsx";
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import api from "@/api/index.js";
import {useParams} from "react-router-dom";

const CollectionDetailPage = () => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState("All");
    const {id} = useParams();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
		document.title = "Collection Detail";
	}, []);

    useEffect(() => {
		document.title = "Collection Detail";
	}, []);

    useEffect(() => {
        // Get the latest recipe list
        api.getCollectionRecipes(id).then((res) => {
            console.log('api.getCollectionRecipes:', res.recipes)
            setProducts(res.recipes);
        });

    }, []);

    // Handle filter type change event
    const handleFilterTypeChange = (filter) => {
        setFilterType(filter);
        handleCloseFilter()
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

    console.log("products:", products)

    return (
        <div>
            {/* Edited Filter */}
            <div>
                <IconButton
                    onClick={handleFilterClick}
                >
                    <img 
                        src="../src/assets/icons8-filter-96 (2).png" 
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
            </div>


            {/* filter dropdown list */}
            {/* <FormControl variant="outlined" style={{minWidth: 100,display:"flex",justifyContent:"flex-end", margin: "10px"}}>
                <Select value={filterType} onChange={handleFilterTypeChange}>
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>
                    <MenuItem value="Snack">Snack</MenuItem>
                </Select>
            </FormControl> */}

            {/* recipe list */}
            <ProductList products={filteredProducts}/>
        </div>
    );
};

export default CollectionDetailPage;
