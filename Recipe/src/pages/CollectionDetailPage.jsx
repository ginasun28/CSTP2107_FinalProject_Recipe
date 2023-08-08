import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList.jsx";
import {Divider, FormControl, IconButton, Menu, MenuItem, Select, Typography} from "@mui/material";
import api from "@/api/index.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const CollectionDetailPage = () => {
    const [products, setProducts] = useState([]);
    const [filterType, setFilterType] = useState("All");
    const {id} = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const [folderName, setFolderName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Folder " + location.state.name + " content";

        // Get the latest recipe list
        api.getCollectionRecipes(id).then((res) => {
            console.log('api.getCollectionRecipes:', res.recipes)
            setProducts(res.recipes);
        });

        const collectionName = location.state.name
        setFolderName(collectionName)
        // console.log("name: ", collectionName)

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
    console.log("Folder name: ", folderName)

    return (
        <div>
            <Navbar/>
            {/* Edited Filter */}
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <IconButton
                    onClick={() => navigate(-1)}
                    disableRipple
                >
                    <img src="../src/assets/icons8-back-96 (1).png" alt="Back btn" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                </IconButton>

                <div style={{display: 'flex', flexDirection: 'column', width: '100%',}}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#EA5C2B",
                            fontSize: "25px",
                            fontFamily: "Poppins",
                            fontWeight: "700",
                            padding: "5px 0px 10px 0px",
                        }}
                    >
                        {folderName}
                    </Typography>
                    <Divider sx={{
						height: "2px",
						background:
							"linear-gradient(90deg, rgba(229,171,107,1) 35%, rgba(249,248,247,1) 69%)",
					}}/>
                </div>

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
            <div style={{padding: '0px 30px'}}>
                <ProductList products={filteredProducts}/>
            </div>
        </div>
    );
};

export default CollectionDetailPage;
