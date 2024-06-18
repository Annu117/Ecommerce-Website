// client/src/components/Admin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '', countInStock: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.isAdmin) {
        history.push('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const response = await axios.get('/api/products', config);
      setProducts(response.data);
    };
    fetchProducts();
  }, [history]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    if (isEditing) {
      await axios.put(`/api/products/${editProductId}`, form, config);
    } else {
      await axios.post('/api/products', form, config);
    }

    setForm({ name: '', image: '', description: '', price: '', countInStock: '' });
    setIsEditing(false);
    setEditProductId(null);

    const response = await axios.get('/api/products', config);
    setProducts(response.data);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditProductId(product._id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/products/${id}`, config);
    const response = await axios.get('/api/products', config);
    setProducts(response.data);
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input type="number" name="countInStock" value={form.countInStock} onChange={handleChange} placeholder="Count In Stock" required />
        <button type="submit">{isEditing ? "Update" : "Add"} Product</button>
      </form>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <p>${product.price}</p>
            <p>In Stock: {product.countInStock}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
