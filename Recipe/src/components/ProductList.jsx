/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

const ProductList = ({products,isUser,load}) => {

    return (
        <div style={{padding:30}}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={1} sm={1} md={2}>
                        <ProductCard product={product} isUser={isUser} load={load}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductList;
