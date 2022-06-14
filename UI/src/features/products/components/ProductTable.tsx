import { Button, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { AlertDialog } from 'components/common';
import React, { useState } from 'react';

const useStyle = makeStyles((theme) => ({
    root: {},
    center: {
        textAlign: 'unset',
        display: 'flex !important',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

export function ProductTable({ productList, onEdit, onRemove }) {
    const classes = useStyle();
    const [isOpen, setIsOpen] = useState(false);
    const [studentSelected, setStudentSelected] = useState<any>();

    const handleRemoveClick = (products) => {
        setIsOpen(true);
        setStudentSelected(products);
    };

    const handleConfirmRemove = () => {
        onRemove?.(studentSelected);
        setIsOpen(false);
    };

    const handleCloseDialog = () => setIsOpen(false);

    return (
        <>
            {/*   table of student */}
            <TableContainer component={Paper}>
                <Table className={classes.root} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Stock quantity</TableCell>
                            <TableCell>Regular price</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sale price</TableCell>
                            <TableCell>Link product</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.stock_quantity}</TableCell>
                                <TableCell>{product.regular_price}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.sale_price}</TableCell>
                                <TableCell>
                                    <a
                                        target="_blank"
                                        rel="opener"
                                        href={product.permalink}
                                    >
                                        Link
                                    </a>
                                </TableCell>
                                <TableCell align="center" className={classes.center}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onEdit?.(product)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveClick(product)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* alert dialog confirm remove student */}
            <AlertDialog
                isOpen={isOpen}
                title="Remove Product ?"
                content={`Are you sure remove product named<b> " ${studentSelected?.name?.toUpperCase()} " </b>?`}
                buttonFeature="Remove"
                onConfirm={handleConfirmRemove}
                onCloseDialog={handleCloseDialog}
            />
        </>
    );
}
