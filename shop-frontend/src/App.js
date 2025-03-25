import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart"; // Import Cart Component
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCarousel from './components/Carousel';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [cart, setCart] = useState([]); // Global cart state

  useEffect(() => {
    fetchProducts(selectedBranch);
  }, [selectedBranch]);

  const fetchProducts = async (branch) => {
    const url =
      branch === "all"
        ? "http://localhost:8000/api/products/"
        : `http://localhost:8000/api/products/?branch=${branch}`;

    try {
      const res = await axios.get(url);
      setProducts(res.data);
      setError(
        res.data.length === 0
          ? `No products found for ${branch === "all" ? "any branch" : `${branch} branch`}.`
          : null
      );
    } catch (err) {
      setError(
        `Failed to fetch products: ${
          err.response?.status ? `Status code ${err.response.status}` : err.message
        }`
      );
    }
  };

  // Function to add products to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove items from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ margin: "20px" }}>
              <h1>Welcome to WirelessWorld</h1>

              {/* Carousel Component */}
              <MyCarousel />

              {/* Branch Selection Dropdown */}
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <strong>Select Branch:</strong>{" "}
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  style={{ padding: "5px", marginLeft: "10px" }}
                >
                  <option value="all">All Branches</option>
                  <option value="narol">Narol</option>
                  <option value="vastrapur">Vastrapur</option>
                  <option value="maninagar">Maninagar</option>
                </select>
              </div>

              {/* Error Message */}
              {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

              {/* Products List */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {products.length > 0
                  ? products.map((product) => (
                      <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))
                  : null}
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:branch" element={<Dashboard />} />
        <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
