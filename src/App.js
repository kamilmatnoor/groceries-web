import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;