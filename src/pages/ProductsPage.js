import React from 'react';
import { useNavigate } from 'react-router-dom';

import productsMock from "../api/productsApi";

const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <button onClick={() => navigate('/add')}>Add New</button>
      <ul>
        {productsMock.products.map(p => (
          <li key={p.id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            <div>UPC12 Barcode: {p.product_barcode}</div>
            <div>Brand: {p.product_brand}</div>
            <div>Name: {p.product_name}</div>
            <div>Description: {p.product_description}</div>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;