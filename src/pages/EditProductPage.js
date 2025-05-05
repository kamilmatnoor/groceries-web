import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, getProductById } from '../api/productsApi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { ButtonWidget } from '../widgets/ButtonWidget';
import { InputFieldWidget } from '../widgets/InputFieldWidget';

const EditProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ product_barcode: '', product_brand: '', product_name: '', product_description: '' });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        getProductById(id)
            .then(data => {
                if (data.error) {
                    navigate('/');
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Failed to get product details. Please try again.",
                        confirmButtonColor: '#2563EB'
                    });
                } else {
                    setProduct(data.products)
                }
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Failed to get product details. Please try again.",
                    confirmButtonColor: '#2563EB'
                });
                navigate('/');
            });
    }, [id]);

    const onInputFieldChanged = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitBtnClicked = async (e) => {
        e.preventDefault();
        if (!checkFormValidation()) return;

        MySwal.fire({
            icon: "warning",
            title: <p>Warning</p>,
            text: "Are you sure you want to update this product?",
            confirmButtonText: "Proceed",
            confirmButtonColor: "#2563EB",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateProduct(id, product);
                    if (response.error) {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: "Failed to update product. Please try again.",
                            confirmButtonColor: '#2563EB'
                        });
                    } else {
                        navigate('/');
                        MySwal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: "Product updated successfully.",
                            confirmButtonColor: '#2563EB'
                        });
                    }

                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: "Failed to update product. Please try again.",
                        confirmButtonColor: '#2563EB'
                    });
                }
            }

        });
    };

    const checkFormValidation = () => {
        const errs = {};
        if (!product.product_barcode.trim()) {
            errs.product_barcode = 'Barcode is required';
        } else if (!/^[0-9]{12}$/.test(product.product_barcode)) {
            errs.product_barcode = 'Barcode must be 12 digits of number';
        }
        if (!product.product_brand.trim()) errs.product_brand = 'Brand is required';
        if (!product.product_name.trim()) errs.product_name = 'Name is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-4xl font-extrabold dark:text-white mb-4">Edit Product</h2>
            <form onSubmit={onSubmitBtnClicked} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <InputFieldWidget
                        name="product_name"
                        value={product.product_name}
                        onChange={onInputFieldChanged}
                        className="w-full max-w-xs"
                    />
                    {errors.product_name && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_name}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
                    <InputFieldWidget
                        name="product_brand"
                        value={product.product_brand}
                        onChange={onInputFieldChanged}
                        className="w-full max-w-xs"
                    />
                    {errors.product_brand && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_brand}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Barcode</label>
                    <InputFieldWidget
                        name="product_barcode"
                        value={product.product_barcode}
                        onChange={onInputFieldChanged}
                        className="w-full max-w-xs"
                    />
                    {errors.product_barcode && (
                        <div className="text-red-500 text-xs mt-1">{errors.product_barcode}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <InputFieldWidget
                        name="product_description"
                        value={product.product_description}
                        onChange={onInputFieldChanged}
                        className="w-full max-w-xs"
                    />
                </div>

                <div className="flex space-x-2">
                    <ButtonWidget onClick={() => navigate('/')} className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded">
                        Back
                    </ButtonWidget>
                    <ButtonWidget type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded">
                        Submit
                    </ButtonWidget>
                </div>
            </form>
        </div>
    );
};

export default EditProductPage;