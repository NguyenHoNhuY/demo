import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { InputField } from 'components/FormFields';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ProductTable } from './ProductTable';

// todo khoi tao schema validate
const schema = yup.object({
    name: yup.string().required('please enter name'),
    stock_quantity: yup.number().required('please enter stock quantity'),
    regular_price: yup.string().required('please enter regular price'),
    price: yup.string().required('please enter price'),
    sale_price: yup.string().required('please enter sale price'),
});

export function ProductForm({ productId }) {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        stock_quantity: 0,
        regular_price: '',
        price: '',
        sale_price: '',
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: product,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!productId) return;

        //* IIFE : khoi tao mot funtion va thuc thi ngay lap tuc
        (async () => {
            try {
                const response: any = await axios.get(
                    `http://localhost:3000/api/products/${productId}`
                );

                reset(response.data.data);

                const { name, stock_quantity, regular_price, price, sale_price } =
                    response.data.data;

                const product = {
                    name: name,
                    stock_quantity: stock_quantity,
                    regular_price: regular_price,
                    price: price,
                    sale_price: sale_price,
                };

                setProduct(product);
            } catch (error) {
                console.log('Failed to call product api :', error);
            }
        })();
    }, [reset, productId]);

    const handleFormSubmit = async (formValues: any) => {
        try {
            await axios.put(
                `http://localhost:3000/api/products/${productId}`,
                formValues
            );
            console.log(formValues);
        } catch (error) {
            console.log('form submit failed');
        }

        //redirect to product page
        navigate('/admin/products');
    };

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField label="Full Name" name="name" control={control} />
                <InputField
                    label="Stock Quantity"
                    name="stock_quantity"
                    control={control}
                />
                <InputField
                    label="Regular Price"
                    name="regular_price"
                    control={control}
                />
                <InputField label="Price" name="price" control={control} />
                <InputField label="Sale Price" name="sale_price" control={control} />
                <Box style={{ display: 'flex', justifyContent: 'center' }} mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp; Save Update
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
