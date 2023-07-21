import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, MenuItem, Select, TextField, Typography} from '@mui/material';
import Navbar from "@/components/Navbar";
import FormControl from "@mui/material/FormControl";
import api from "@/api/index.js";
import useLocalStorage from "@/hooks/useLocalStorage.js";
import Notification from "@/components/Notification.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const PublishProductPage = () => {
    const [productInfo, setProductInfo] = useState({
        recipeName: '',
        type: '',
        cookingTime: '',
        servings: '',
        cuisine: '',
        ingredients: [],
        instructions: '',
        image: '',
        user: {}
    });
    const [user, setUser] = useLocalStorage('user', null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
        if (id) {
            api.getRecipesById(id).then(res => {
                setProductInfo(res.recipe)
            })
        }
    }, [id])
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProductInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        setProductInfo((prevState) => {
            const ingredients = [...prevState.ingredients];
            ingredients[index][field] = value;
            return {
                ...prevState,
                ingredients,
            };
        });
    };

    const handleAddIngredient = () => {
        setProductInfo((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, {qt: '', measurement: '', ingredient: ''}],
        }));
    };

    const handleRemoveIngredient = (index) => {
        setProductInfo((prevState) => {
            const ingredients = [...prevState.ingredients];
            ingredients.splice(index, 1);
            return {
                ...prevState,
                ingredients,
            };
        });
    };

    const handlePublishProduct = (e) => {
        e.preventDefault();
        //Handle publish recipe logic
        console.log(productInfo);
        productInfo.user.username = user.username
        productInfo.user.id = user.id
        productInfo.user.avatar = user.avatar
        api.addRecipes(productInfo).then(() => {
            setProductInfo({
                recipeName: '',
                type: '',
                cookingTime: '',
                servings: '',
                cuisine: '',
                ingredients: [],
                instructions: '',
                image: '',
                user: {}
            })
            setNotificationMessage("Release success")
            navigate("/history")
        })
    };

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        api.upload(formData)
            .then((data) => {
                // Handle the logic after the upload is successful
                const imageURL = data.imageURL;
                setProductInfo((prevState) => ({
                    ...prevState,
                    image: imageURL,
                }));
                console.log('Avatar uploaded:', imageURL);
            })
            .catch((error) => {
                // Logic to handle upload failures or errors
                console.error('Error uploading avatar:', error);
            });
    };
    return (<>
            <Navbar/>
            <div style={{width: "80%", padding: 30, margin: "auto"}}>
                <form onSubmit={handlePublishProduct}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Recipe Name"
                                name="recipeName"
                                value={productInfo.recipeName}
                                onChange={handleInputChange}
                                required
                                fullWidth
                                sx={{mb: 2}}
                            />
                            <Select
                                label="Type"
                                name="type"
                                value={productInfo.type}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{mb: 2}}
                            >
                                <MenuItem value="Breakfast">Appetizers</MenuItem>
                                <MenuItem value="Lunch">Mains</MenuItem>
                                <MenuItem value="Dinner">Side Dishes</MenuItem>
                                <MenuItem value="Dessert">Desserts</MenuItem>
                                <MenuItem value="Snack">Beverages</MenuItem>
                            </Select>
                            <TextField
                                label="Cooking Time (minutes)"
                                name="cookingTime"
                                value={productInfo.cookingTime}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Servings"
                                name="servings"
                                value={productInfo.servings}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{mb: 2}}
                            />
                            <TextField
                                label="Instructions"
                                name="instructions"
                                value={productInfo.instructions}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
                                fullWidth
                                sx={{mt: 2}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Cuisine"
                                name="cuisine"
                                value={productInfo.cuisine}
                                onChange={handleInputChange}
                                fullWidth
                                sx={{mb: 2}}
                            />

                            <Typography variant="subtitle1">Ingredients</Typography>
                            <div style={{maxHeight: 300, overflowY: 'auto'}}>
                                <table>
                                    {productInfo.ingredients.length ? <thead>
                                    <tr>
                                        <th>QT</th>
                                        <th>Measurement</th>
                                        <th>Ingredient</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead> : ''}
                                    <tbody>
                                    {productInfo.ingredients.map((ingredient, index) => (
                                        <tr key={index}>
                                            <td>
                                                <TextField
                                                    value={ingredient.qt}
                                                    onChange={(e) => handleIngredientChange(index, 'qt', e.target.value)}
                                                    fullWidth
                                                />
                                            </td>
                                            <td>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={ingredient.measurement}
                                                        onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
                                                        fullWidth
                                                    >
                                                        <MenuItem value="cup">Cup</MenuItem>
                                                        <MenuItem value="teaspoon">Teaspoon</MenuItem>
                                                        <MenuItem value="tablespoon">Tablespoon</MenuItem>
                                                        <MenuItem value="gram">Gram</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </td>
                                            <td>
                                                <TextField
                                                    value={ingredient.ingredient}
                                                    onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                                                    fullWidth
                                                />
                                            </td>
                                            <td>
                                                <Button variant="outlined"
                                                        onClick={() => handleRemoveIngredient(index)}>
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button variant="outlined" onClick={handleAddIngredient} sx={{mt: 2}}>
                                Add Ingredient
                            </Button>
                            <div style={{marginTop: 20}}>
                                {productInfo.image ? <img
                                    src={productInfo.image}
                                    loading="lazy"
                                    alt=""
                                    width="200px"
                                    onClick={handleImageClick}
                                /> : <img
                                    style={{border: "1px solid #efefef", padding: 50}}
                                    src="../../public/plus.png"
                                    loading="lazy"
                                    alt=""
                                    width="100"
                                    onClick={handleImageClick}
                                />
                                }
                                <input type="file" accept="image/*" onChange={handleAvatarChange}
                                       style={{display: "none"}} ref={inputRef}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Button variant="contained" type="submit">
                        Publish
                    </Button>
                </form>
                <Notification message={notificationMessage}/>
            </div>
        </>
    );
};

export default PublishProductPage;
