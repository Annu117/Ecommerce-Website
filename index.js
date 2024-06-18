const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const products = require("./data/Products");
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 9000;
const mongoose = require("mongoose");

// app.use(cors());
app.use(cors(
  {
    origin: ["https://rnshop.onrender.com/", process.env.HOST, `$window.location.origin`],
    methods:["POST","GET"],
    credentials: true
  }
));
import path from 'path';
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();

// const products = require("./data/Products");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require('./routes/Order');
const router = require("./routes/Router");

app.use(express.json())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/dist')))
//Render client
app.get("*", (req, res)=> 
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);
//connect db
mongoose
  // .connect(process.env.MONGODB_URI)
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });
  const productNewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReview: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
});
const ProductNew = mongoose.model('ProductNew', productNewSchema);
app.post('/addProduct', async (req, res) => {
  const { name, image, description, rating, numReview, price, countInStock } = req.body;
  const newProduct = new ProductNew({ name, image, description, rating, numReview, price, countInStock });

  try {
      const savedProduct = await newProduct.save();
      res.status(200).send(savedProduct);
  } catch (error) {
      res.status(500).send(error);
  }
});
// API endpoint to fetch all products
app.get('/productsNew', async (req, res) => {
  try {
      const products1 = await ProductNew.find();
      res.status(200).send(products1);
  } catch (error) {
      res.status(500).send(error);
  }
});
//database seeder routes
app.use("/api/seed", databaseSeeder);

// // routes for users
app.use("/api/users", userRoute);

// // routes for products
app.use("/api/products", productRoute);
// app.use(`http://localhost:9000/api/products`, productRoute);

//routes for orders
app.use('/api/orders', orderRoute);

// //api product test route
// app.get("/api/products", (req, res) => {
//   res.json(products);
// });
// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((product)=>product.id === req.params.id)
//     res.json(product);
//   });

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});