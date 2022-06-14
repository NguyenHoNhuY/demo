import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddEditPage, ListPage } from './pages';

export default function ProductsFeature() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/add" element={<AddEditPage />} />
                <Route path="/:productId" element={<AddEditPage />} />
            </Routes>
        </>
    );
}
