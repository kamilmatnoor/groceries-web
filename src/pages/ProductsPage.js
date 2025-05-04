import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProducts } from "../api/productsApi";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const allProducts = await getProducts({ searchText });
      setProducts(allProducts);
    } catch (error) {
      setProducts([]);
    }
  }, [searchText]);

  useEffect(() => {
    fetchProducts();
  }, [searchText]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <button onClick={() => navigate('/add')}>Add New</button>
      <ul>
        {products.map(p => (
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