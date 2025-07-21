import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Patient Management Dashboard</h1>
        <p className="welcome-msg">Welcome, Dr. {user?.name}</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search patients by name, doctor, or illness..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/add-patient')} className="primary">
          ➕ Add New Patient
        </button>
        <button onClick={() => navigate('/patients')} className="secondary">
          📋 View All Patients
        </button>
        <button onClick={logout} className="danger">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
