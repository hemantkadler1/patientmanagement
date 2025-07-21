import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Make sure this file exists

const Register = () => {
  const [form, setForm] = useState({
    doctorId: '',
    name: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const existing = await axios.get(`http://localhost:3001/users?doctorId=${form.doctorId}`);
      if (existing.data.length > 0) {
        alert("Doctor ID already exists. Try another.");
        return;
      }

      await axios.post("http://localhost:3001/users", form);
      alert("Registration successful!");
      navigate('/login');
    } catch (err) {
      console.error("Registration failed", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Doctor Registration</h2>

        <input
          type="text"
          name="doctorId"
          placeholder="Enter Doctor/Hospital ID"
          value={form.doctorId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => navigate('/login')} className="link-button">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
