import React, { useState, useEffect } from 'react';
import './Home.css';
import PatientForm from '../../components/PatientForm/PatientForm';
import PatientList from '../../components/PatientList/PatientList';
import SearchBar from '../../components/SearchBar/SearchBar';
import patientService from '../../services/patientService';

const Home = ({ user }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.getAll();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  const handleSearch = (query) => {
    const filtered = patients.filter(
      (p) =>
        p.doctor.toLowerCase().includes(query.toLowerCase()) ||
        p.history.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleAdd = async (formData) => {
    try {
      const savedPatient = await patientService.addPatient(formData);
      const updatedPatients = [...patients, savedPatient];
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to save patient. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>🩺 Patient Management</h1>
      <p>Welcome, <strong>{user.username}</strong> ({user.role})</p>
      
      <SearchBar onSearch={handleSearch} />

      {user.role === 'admin' && (
        <PatientForm onAdd={handleAdd} />
      )}

      <PatientList patients={filteredPatients} />
    </div>
  );
};

export default Home;
