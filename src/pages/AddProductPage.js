import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ product_barcode: '', product_brand: '', product_name: '', product_description: '' });

    const onInputFieldChanged = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitBtnClicked = (e) => {
        e.preventDefault();
        console.log(product);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>New Product</h2>
            <form onSubmit={onSubmitBtnClicked}>
                <div>
                    <label>UPC12 Barcode:</label>
                    <input name="product_barcode" value={product.product_barcode} onChange={onInputFieldChanged} />
                </div>
                <div>
                    <label>Product Brand:</label>
                    <input name="product_brand" value={product.product_brand} onChange={onInputFieldChanged} />
                </div>
                <div>
                    <label>Product Name:</label>
                    <input name="product_name" value={product.product_name} onChange={onInputFieldChanged} />
                </div>
                <div>
                    <label>Product Description:</label>
                    <input name="product_description" value={product.product_description} onChange={onInputFieldChanged} />
                </div>
                <button onClick={() => navigate('/')}>Back</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProductPage;