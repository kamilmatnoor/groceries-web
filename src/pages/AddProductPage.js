import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '20px' }}>
      <h2>New Product</h2>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default AddProductPage;