import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PatientList.css';
import patientService from '../../services/patientService';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/patients');
      setPatients(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patient data.');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete patient using service
  const handleDelete = async (id) => {
    try {
      await patientService.deletePatient(id);
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error.message);
      alert(`Could not delete patient with ID ${id}`);
    }
  };

  // Navigate to edit page
  const handleEdit = (patient) => {
    navigate('/add-patient', { state: { patient } });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="patient-list">
      <h2>Patient List</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && patients.length === 0 && !error && <p>No patients found.</p>}

      {!loading && patients.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Illness</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td data-label="Name">{patient.name}</td>
                <td data-label="Age">{patient.age}</td>
                <td data-label="Gender">{patient.gender}</td>
                <td data-label="Doctor">{patient.doctor}</td>
                <td data-label="Illness">{patient.history}</td>
                <td data-label="Contact">{patient.contact}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(patient)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
