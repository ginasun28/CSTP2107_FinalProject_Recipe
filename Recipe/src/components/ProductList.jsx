/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';
import "../components/styles/RecipesList.css";

const ProductList = ({products,isUser,load}) => {

    return (
        <div className='productList-resize' style={{display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '40px'}}>
            
            {products.map((product) => (
                <Grid item key={product.id} xs={1} sm={1} md={2}>
                    <ProductCard product={product} isUser={isUser} load={load}/>
                </Grid>
            ))}
            
        </div>
    );
};

export default ProductList;
