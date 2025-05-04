import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{ padding: '20px' }}>
            <h2>New Product</h2>
            <form>
                <div>
                    <label>UPC12 Barcode:</label>
                    <input name="product_barcode"/>
                </div>
                <div>
                    <label>Product Brand:</label>
                    <input name="product_brand"/>

                </div>
                <div>
                    <label>Product Name:</label>
                    <input name="product_name"/>
                </div>
                <div>
                    <label>Product Description:</label>
                    <input name="product_description"/>
                </div>
                <button onClick={() => navigate('/')}>Back</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProductPage;