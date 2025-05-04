import React from 'react';
import { useNavigate } from 'react-router-dom';

const productsMockApi = {
  products: Array.from({ length: 100 }, (_, i) => ({
      id: String(i + 1),
      product_barcode: `${100000000000 + i}`,
      product_brand: `Brand ${String.fromCharCode(65 + (i % 26))}`,
      product_name: `Name ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
      product_description: `Description ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
  })),
};

const ProductsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <button onClick={() => navigate('/add')}>Add New</button>
      <ul>
        {productsMockApi.products.map(p => (
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