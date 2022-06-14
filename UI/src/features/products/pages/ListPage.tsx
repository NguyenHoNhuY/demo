import { Box, Button, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { url } from 'utils';
import { ProductTable } from '../components';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },
    loading: {
        position: 'absolute !important' as any,
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export function ListPage() {
    const [productList, setProductList] = useState([]);
    const classes = useStyle();
    const navigate = useNavigate();
    const [paginationPage, setPaginationPage] = useState(1);

    useEffect(() => {
        (async function () {
            try {
                const getApiProductList: any = (await axios.get(url + 'products')).data;
                setProductList(getApiProductList.data);
            } catch (error) {
                console.log('call api product failed', error);
            }
        })();
    }, []);

    const handleRemoveProduct = async (product) => {
        try {
            console.log('handle remove product :', product.name, product.id);
            await axios.delete(`${url}/${product.id}`);
            const getApiProductList: any = await axios(url);
            console.log(getApiProductList);
            setProductList(getApiProductList.data.data);
        } catch (error) {
            //todo toast error
            console.log('Failed to fetch product : ', error);
        }
    };

    const handleEditProduct = async (product: any) => {
        navigate(`${product.id}`);
    };

    const handlePaginationChange = async (e: any, page: number) => {
        try {
            const getApiProductList: any = await axios.get(url + 'products', {
                params: {
                    page: page,
                },
            });
            setProductList(getApiProductList.data.data);
            setPaginationPage(page);
        } catch (error) {
            console.log('call api product failed', error);
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.title}>
                <Typography variant="h4">Products</Typography>
                <Link to="add" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add New Products
                    </Button>
                </Link>
            </Box>

            {/* product table */}
            <ProductTable
                productList={productList}
                onEdit={handleEditProduct}
                onRemove={handleRemoveProduct}
            />

            {/* pagination */}
            <Box my={2} display="flex" justifyContent="center">
                <Pagination
                    color="primary"
                    count={Math.ceil(644 / 10)}
                    page={paginationPage}
                    onChange={handlePaginationChange}
                />
            </Box>
        </Box>
    );
}
