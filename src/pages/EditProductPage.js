import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, getProductById } from '../api/productsApi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ product_barcode: '', product_brand: '', product_name: '', product_description: '' });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        getProductById(id)
            .then(data => setProduct(data))
            .catch(error => {
                MySwal.fire("Error", "Failed to get product details. Please try again.", "");
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
        try {
            const response = await updateProduct(id, product);
            navigate('/');
            MySwal.fire("Success", "Product updated successfully.", "");
        } catch (error) {
            navigate('/');
            MySwal.fire("Error", "Failed to update product. Please try again.", "");
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
            <h2>New Product</h2>
            <form onSubmit={onSubmitBtnClicked}>
                <div>
                    <label>UPC12 Barcode:</label>
                    <input name="product_barcode" value={product.product_barcode} onChange={onInputFieldChanged} />
                    {errors.product_barcode && <div style={{ color: 'red', fontSize: 12 }}>{errors.product_barcode}</div>}
                </div>
                <div>
                    <label>Product Brand:</label>
                    <input name="product_brand" value={product.product_brand} onChange={onInputFieldChanged} />
                    {errors.product_brand && <div style={{ color: 'red', fontSize: 12 }}>{errors.product_brand}</div>}
                </div>
                <div>
                    <label>Product Name:</label>
                    <input name="product_name" value={product.product_name} onChange={onInputFieldChanged} />
                    {errors.product_name && <div style={{ color: 'red', fontSize: 12 }}>{errors.product_name}</div>}
                </div>
                <div>
                    <label>Product Description:</label>
                    <input name="product_description" value={product.product_description} onChange={onInputFieldChanged} />
                </div>
                <button type="button" onClick={() => navigate('/')}>Back</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditProductPage;