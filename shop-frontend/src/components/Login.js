import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    branch: 'vastrapur',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      navigate(`/dashboard/${formData.branch}`);
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setMessage('Error logging in: ' + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="auth-container">
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

      <div className="auth-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="vastrapur">Vastrapur</option>
              <option value="maninagar">Maninagar</option>
            </select>
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
        {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
      </div>
    </div>
  );
}

export default Login; 