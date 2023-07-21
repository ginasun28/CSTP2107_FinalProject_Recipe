/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import ListCard from "./ListCard";

const RecipesList = ({products, isUser, load}) => {
	return (
		<>
			<Grid item xs={6} sm={3} md={11} className="content">
				<Grid container spacing={2}>
					{products.map(product => (
						<Grid item xs={4} sm={6} md={6} key={product.id}>
							{/* Pass individual recipe as a prop to ListCard */}
							<ListCard product={product} isUser={isUser} load={load} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</>
	);
};

export default RecipesList;
