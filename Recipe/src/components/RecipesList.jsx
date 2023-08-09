/* eslint-disable react/prop-types */
import {Grid} from "@mui/material";
import ListCard from "./ListCard";
import {useEffect, useState} from "react";

const RecipesList = ({products, isUser, load}) => {
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 959);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 959);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{/* Mobile view */}
			{isMobileView ? (
				<Grid item xs={12}>
					<Grid container spacing={1}>
						{products.map(product => (
							<Grid item xs={12} key={product.id}>
								<ListCard product={product} isUser={isUser} load={load} />
							</Grid>
						))}
					</Grid>
				</Grid>
			) : (
				// Desktop view
				<>
					<Grid item xs={6} sm={3} md={11} className="content">
						<Grid container spacing={2}>
							{products.map(product => (
								<Grid item xs={4} sm={6} md={6} key={product.id} sx={{padding: '0px 30px'}}>
									<ListCard product={product} isUser={isUser} load={load} />
								</Grid>
							))}
						</Grid>
					</Grid>
					{/* Add the condition to render the half-trapezoid only in Desktop view */}
					<Grid item xs={12} sm={6} className="half-trapezoid" sx={{display: 'flex', position: 'fixed', top: 0}}></Grid>
				</>
			)}
		</>
	);
};

export default RecipesList;
