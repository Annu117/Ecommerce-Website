import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        image: '',
        description: '',
        rating: 0,
        numReview: 0,
        price: 0,
        countInStock: 0
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:9000/addProduct', product);
            const response = await axios.post(`${window.location.origin}/addProduct`, product);

            setSuccessMessage('Product added successfully!');
            fetchProducts();
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    const fetchProducts = async () => {
        try {
            // const response = await axios.get('http://localhost:9000/productsNew');
            const response = await axios.get(`${window.location.origin}/productsNew`);

            setProducts(response.data);
        } catch (error) {
            console.error('There was an error fetching the products!', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="image" value={product.image} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={product.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" name="rating" value={product.rating} onChange={handleChange} required />
                </div>
                <div>
                    <label>Number of Reviews:</label>
                    <input type="number" name="numReview" value={product.numReview} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </div>
                <div>
                    <label>Count in Stock:</label>
                    <input type="number" name="countInStock" value={product.countInStock} onChange={handleChange} required />
                </div>
                <button type="submit">Add Product</button>
            </form>

            {successMessage && <p>{successMessage}</p>}

            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} width="100" />
                        <p>{product.description}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Number of Reviews: {product.numReview}</p>
                        <p>Price: ${product.price}</p>
                        <p>Count in Stock: {product.countInStock}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddProductForm;
