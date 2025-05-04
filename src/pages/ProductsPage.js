import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getProducts, deleteProduct } from "../api/productsApi";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('product_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (searchParam) => {
    try {
      const allProducts = await getProducts({ searchText:searchParam, currentPage, sortField, sortOrder, itemsPerPage });
      const tempTotalPages = Math.ceil(allProducts.length / itemsPerPage);
      setProducts(allProducts);
      setTotalPages(tempTotalPages);
    } catch (error) {
      setProducts([]);
    }
  }, [currentPage, sortField, sortOrder, itemsPerPage]);

  useEffect(() => {
    fetchProducts(searchText);
  }, [fetchProducts]);

  const onSearchBtnClicked = () => {
    setCurrentPage(1);
    fetchProducts(searchText);
  };

  const onResetBtnClicked = () => {
    setSearchText('');
    setCurrentPage(1);
    fetchProducts('');
  };

  const onDeleteProduct = async (id) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      icon: "warning",
      title: <p>Warning</p>,
      text: "Are you sure you want to delete this product?",
      confirmButtonText: "Proceed",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          fetchProducts();
          MySwal.fire("Success", "Deleted successfully.", "");
        } catch (error) {
          MySwal.fire("Error", "Failed deleting product.", "");
        }
      }
    });
  };

  const onSortChanged = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const onPageSizeChanged = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <input
        type="text"
        placeholder="Search by Product Name or Brand"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={onSearchBtnClicked}>Search</button>
      <button onClick={onResetBtnClicked}>Reset</button>
      <button onClick={() => navigate('/add')}>Add</button>
      <div>
        <label>Sort by: </label>
        <select onChange={(e) => onSortChanged(e.target.value, sortOrder)} value={sortField}>
          <option value="product_brand">Brand</option>
          <option value="product_name">Name</option>
        </select>
        <select onChange={(e) => onSortChanged(sortField, e.target.value)} value={sortOrder}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <label style={{ marginLeft: '20px' }}>Page Size: </label>
        <select value={itemsPerPage} onChange={onPageSizeChanged}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <ul>
        {products.map(p => (
          <li key={p._id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            <div>UPC12 Barcode: {p.product_barcode}</div>
            <div>Brand: {p.product_brand}</div>
            <div>Name: {p.product_name}</div>
            <div>Description: {p.product_description}</div>
            <Link to={`/edit/${p._id}`}><button>Edit</button></Link>
            <button onClick={() => onDeleteProduct(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;