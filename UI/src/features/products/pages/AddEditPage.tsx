import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductForm } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {},
    blockForm: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export function AddEditPage() {
    const { productId } = useParams();
    const classes = useStyles();

    return (
        <Box>
            <Link
                to="/admin/products"
                style={{
                    textDecoration: 'none',
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ChevronLeft /> Back to product list
                </Typography>
            </Link>
            <Typography variant="h4">
                {productId ? 'Edit product page' : 'Add product page'}
            </Typography>

            <Box mt={3} className={classes.blockForm}>
                <ProductForm productId={productId} />
            </Box>
        </Box>
    );
}
