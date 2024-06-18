// client/src/components/AdminProductManagementPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductManagementPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get('/api/products', config);
      // const response = await axios.get('http://localhost:9000/addProduct', config);

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditProduct = (productId) => {
    // Implement logic to navigate to edit product page or show modal for editing
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${productId}`, config);
      fetchProducts(); // Refresh products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Admin Product Management</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => handleEditProduct(product._id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManagementPage;
