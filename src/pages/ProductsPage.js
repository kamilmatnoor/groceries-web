import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getProducts, deleteProduct } from "../api/productsApi";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import image from '../assets/images/image-1.jpg';

import { ButtonWidget } from '../widgets/ButtonWidget';
import { SelectWidget } from '../widgets/SelectWidget';

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
      const responseProducts = await getProducts({ searchText: searchParam, currentPage, sortField, sortOrder, itemsPerPage });
      const tempTotalPages = Math.ceil(responseProducts.totals / itemsPerPage);
      setProducts(responseProducts.products);
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
      <h2 className="text-4xl font-extrabold dark:text-white mb-4">Products</h2>
      <div className="flex flex-col w-full mb-4 gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
          <input
            type="text"
            placeholder="Search by Product Name or Brand"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full sm:w-[300px]"
          />
          <ButtonWidget onClick={onSearchBtnClicked} className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
            Search
          </ButtonWidget>

          <ButtonWidget onClick={onResetBtnClicked} className="bg-gray-500 hover:bg-gray-600 text-white w-full sm:w-auto">
            Reset
          </ButtonWidget>
        </div>

        <ButtonWidget onClick={() => navigate('/add')} className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto sm:ml-auto">
          Add New Product
        </ButtonWidget>
      </div>

      <div className="flex flex-wrap mb-4 gap-2 w-full sm:w-auto items-center">
        <label className="text-sm font-medium text-gray-900 dark:text-white">Sort by:</label>
        <SelectWidget
          value={sortField}
          onChange={(e) => onSortChanged(e.target.value, sortOrder)}
          options={[
            { value: 'product_brand', label: 'Brand' },
            { value: 'product_name', label: 'Name' }
          ]}
        />

        <SelectWidget
          value={sortOrder}
          onChange={(e) => onSortChanged(sortField, e.target.value)}
          options={[
            { value: 'asc', label: 'Asc' },
            { value: 'desc', label: 'Desc' }
          ]}
        />

        <label className="ml-4 text-sm font-medium text-gray-900 dark:text-white">Page Size:</label>
        <SelectWidget
          value={itemsPerPage}
          onChange={onPageSizeChanged}
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' }
          ]}
        />

        <ButtonWidget
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          &lt; Previous
        </ButtonWidget>

        <span className="mx-2 text-sm text-gray-900 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>

        <ButtonWidget
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Next &gt;
        </ButtonWidget>
      </div>
      <div className="flex flex-wrap gap-4">
        {products.map((product, index) => (
          <div key={index} className="max-w-64 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg w-full" src={image} alt="{product.name}" />
            </a>
            <div className="p-5">
              <p className="text-sm font-thin text-gray-700 dark:text-gray-400">Product</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">{product.product_name}</p>

              <p className="text-sm font-thin text-gray-700 dark:text-gray-400">Brand</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">{product.product_brand}</p>

              <p className="text-sm font-thin text-gray-700 dark:text-gray-400">Barcode</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">{product.product_barcode}</p>

              <p className="text-sm font-thin text-gray-700 dark:text-gray-400">Description</p>
              <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">{product.product_description}</p>

              <div className="flex justify-end space-x-2 mt-4">
                <Link to={`/edit/${product._id}`}>
                  <ButtonWidget className="bg-blue-500 hover:bg-blue-600 text-white">Edit</ButtonWidget>
                </Link>
                <ButtonWidget className="bg-gray-500 hover:bg-gray-600 text-white" onClick={() => onDeleteProduct(product._id)}>Delete</ButtonWidget>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;