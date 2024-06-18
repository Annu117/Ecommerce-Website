import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";
import ProductDetail from './pages/ProductDetails.jsx';
// import Admin from './components/Admin.jsx';
import AdminProductPage from './components/AdminProductPage.jsx';
import AdminProductManagementPage from './components/AdminProductManagementPage.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import the ProtectedRoute
import Login from './components/Login.jsx';
import Products from './components/Products.jsx';
import ProductList from './components/ProductList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>}></Route>
        <Route exact path="/post" element={<ProductList />}></Route>
        {/* <Route exact path="/admin" element={<Admin />} /> */}
        <Route exact path="/detail" element={<ProductDetail />}></Route>
        {/* <Route path="/detail/:id" component={<ProductDetail/>} /> */}
        {/* <Route path="/detail/:productId" element={<ProductDetail />} /> */}
        <Route path="/detail/:id" element={<ProductDetail />} />

        <Route path="/admin" element={<AdminProductPage />} />
        <Route path="/manage" element={<AdminProductManagementPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route exact path="/product" element={<Products />}/>


      </Routes>
    </Router>
  </React.StrictMode>,
)
