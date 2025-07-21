import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // ⬅ Added Link
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3001/users?doctorId=${formData.doctorId}`);
      const user = res.data[0];

      if (user && user.password === formData.password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Doctor Login</h2>

        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={formData.doctorId}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {/* 👇 Register Link */}
        <p className="register-link">
          Don&apos;t have an account?{' '}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
