// const express = require("express");
// const router = express.Router();
// const { protect, admin } = require("../middleware/auth");
// const Product = require("../models/Product");

// // Route for admin-only functionality
// router.post("/products", protect, admin, async (req, res) => {
//   try {
//     // Create a new product
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

// Assuming you have Express set up and your MongoDB connection configured
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Define your Product model

// Route to handle POST request to add a product
router.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Assuming req.body contains the product details
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
