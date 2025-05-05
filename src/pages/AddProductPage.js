import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../api/productsApi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ product_barcode: '', product_brand: '', product_name: '', product_description: '' });
    const [errors, setErrors] = useState({});

    const onInputFieldChanged = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitBtnClicked = async (e) => {
        e.preventDefault();
        if (!checkFormValidation()) return;

        const MySwal = withReactContent(Swal)
        try {
            const response = await addProduct(product);
            navigate('/');
            MySwal.fire("Success", "New Product added successfully.", "");
        } catch (error) {
            navigate('/');
            MySwal.fire("Error", "Failed to add new product. Please try again.", "");
        }
    };

    const checkFormValidation = () => {
        const errs = {};
        if (!/^[0-9]{12}$/.test(product.product_barcode)) errs.product_barcode = 'UPC12 Barcode must be 12 digits';
        if (!product.product_brand.trim()) errs.product_brand = 'Brand is required';
        if (!product.product_name.trim()) errs.product_name = 'Name is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-4xl font-extrabold dark:text-white mb-4">New Product</h2>
            <form onSubmit={onSubmitBtnClicked} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                        name="product_name"
                        value={product.product_name}
                        onChange={onInputFieldChanged}
                         placeholder='eg: Nike Air Max 90 LV8 SE'
                        className="w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.product_name && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_name}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                    <input
                        name="product_brand"
                        value={product.product_brand}
                        onChange={onInputFieldChanged}
                        placeholder='eg: Nike'
                        className="w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.product_brand && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_brand}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Barcode</label>
                    <input
                        name="product_barcode"
                        value={product.product_barcode}
                        onChange={onInputFieldChanged}
                        placeholder='eg: 123456789012'
                        className="w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.product_barcode && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_barcode}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input
                        name="product_description"
                        value={product.product_description}
                        onChange={onInputFieldChanged}
                        placeholder='eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                        className="w-full max-w-xs border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>

                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;