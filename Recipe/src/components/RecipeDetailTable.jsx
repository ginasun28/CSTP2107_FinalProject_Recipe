import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './styles/RecipeDetailsPage.css'

const RecipeDetailTable = ({ ingredients }) => {

    const tableHeader = [
        {
           id: 'quantity',
           label: 'QT',
           minWidth: 50,
        },
        {
           id: 'measurement',
           label: 'Measurement',
           minWidth: 150,
        },
        {
           id: 'ingredient',
           label: 'Ingredient',
           minWidth: 200,
        }
    ]

    return (
        <TableContainer component={Paper} sx={{ width: '90%', overflow: 'hidden', backgroundColor: '#F9F3DF', maxHeight: 350, overflowX: 'auto', marginTop: '10px'}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {
                            tableHeader.map((header) => (
                                <TableCell
                                    key={header.id}
                                    style={{minWidth: header.minWidth, 
                                            backgroundColor: '#FFD8A9'
                                        }}
                                >
                                    <p className="header-label">{header.label}</p>
                                </TableCell>
                            ))
                        }
                        {/* <TableCell>Quantity</TableCell>
                        <TableCell>Measurement</TableCell>
                        <TableCell>Ingredient</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody style={{textAlign: 'center'}}>
                    {ingredients?.map((ingredient, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{textAlign: 'center'}}>{ingredient.qt}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{ingredient.measurement}</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>{ingredient.ingredient}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecipeDetailTable;
