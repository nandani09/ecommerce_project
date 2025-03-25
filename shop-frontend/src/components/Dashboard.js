import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap'; // Import Bootstrap Carousel

function Dashboard() {
  const params = useParams();
  const branchName = params.branch;
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    branch: branchName,
    image: null,
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/', {
          params: { branch: branchName },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [branchName]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData before submission:', formData);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    const branchValue = formData.branch ? String(formData.branch).trim() : '';
    
    if (!branchValue) {
      setMessage('Error: Branch is required.');
      return;
    }
    data.append('branch', branchValue);
    data.append('image', formData.image);
    data.append('description', formData.description);

    try {
      const response = await axios.post('http://localhost:8000/api/products/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added:', response.data);
      setMessage('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        stock: '',
        branch: branchName,
        image: null,
        description: '',
      });
      const updatedProducts = await axios.get('http://localhost:8000/api/products/', {
        params: { branch: branchName },
      });
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      setMessage('Error adding product: ' + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="dashboard-container">
      <header className="auth-header">
        <div className="logo-container">
          <img src="/logo.png" alt="MyEcommerce Logo" className="logo" onError={(e) => (e.target.style.display = 'none')} />
          <h1>MyEcommerce</h1>
        </div>
        <div className="nav-links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/cart">Cart</a>
        </div>
      </header>

      {/* Static Image Carousel */}
      <Carousel className="product-carousel">
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner1.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner2.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/banner3.jpg" alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <div className="dashboard-content">
        <h2 className="dashboard-title">{branchName} Dashboard</h2>

        {/* Product List */}
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image || '/images/placeholder.png'}
                alt={product.name}
                className="product-image"
                onError={(e) => (e.target.src = '/images/placeholder.png')}
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{parseFloat(product.price).toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
              <p>Branch: {product.branch}</p>
              <p>Description: {product.description || 'No description available'}</p>
            </div>
          ))}
        </div>

        {/* Add Product Form */}
        <h2 className="form-title">Add Product</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" required placeholder="Enter price" />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required placeholder="Enter stock quantity" />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input type="text" id="branch" value={branchName} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter product description" />
          </div>
          <button type="submit" className="auth-button">Add Item</button>
        </form>
        {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
      </div>
    </div>
  );
}

export default Dashboard;
