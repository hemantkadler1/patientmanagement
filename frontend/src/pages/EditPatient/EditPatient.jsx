import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import patientService from '../../services/patientService';
import './EditPatient.css';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await patientService.getById(id);
        setPatient(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching patient:', err);
        setError('Failed to load patient data.');
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientService.updatePatient(id, patient);
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Error updating patient record.');
    }
  };

  if (loading) return <div className="loader">Loading patient data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-container">
      <h2>Edit Patient Record</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={patient.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={patient.age} onChange={handleChange} required min="0" />

        <label>Date of Birth</label>
        <input type="date" name="dob" value={patient.dob || ''} onChange={handleChange} />

        <label>Gender</label>
        <select name="gender" value={patient.gender} onChange={handleChange} required>
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Contact Number</label>
        <input type="text" name="contact" value={patient.contact} onChange={handleChange} pattern="[0-9]{10}" required />

        <label>Doctor Assigned</label>
        <input type="text" name="doctor" value={patient.doctor} onChange={handleChange} required />

        <label>Medical History</label>
        <textarea name="history" value={patient.history} onChange={handleChange} rows="4" required />

        <button type="submit">Update Patient</button>
      </form>
    </div>
  );
};

export default EditPatient;
