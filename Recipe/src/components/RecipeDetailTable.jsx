import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RecipeDetailTable = ({ ingredients }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Measurement</TableCell>
                        <TableCell>Ingredient</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients?.map((ingredient, index) => (
                        <TableRow key={index}>
                            <TableCell>{ingredient.qt}</TableCell>
                            <TableCell>{ingredient.measurement}</TableCell>
                            <TableCell>{ingredient.ingredient}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecipeDetailTable;
