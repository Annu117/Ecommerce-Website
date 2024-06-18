const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/auth");

// Get all products
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
productRoute.post('/', protect, admin, async (req, res) => {
  const { name, image, description, price, countInStock } = req.body;
  const product = new Product({ name, image, description, price, countInStock });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// Get a product by ID
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// // Create a new product (Admin only)
// productRoute.post(
//   "/",
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const { name, image, description, price, countInStock } = req.body;
//     const product = new Product({
//       name,
//       image,
//       description,
//       price,
//       countInStock,
//     });
//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   })
// );
// POST /api/products - Create a new product
productRoute.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});
// Update a product (Admin only)
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, image, description, price, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.image = image;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// Delete a product (Admin only)
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = productRoute;
