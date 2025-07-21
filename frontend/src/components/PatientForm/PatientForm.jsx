import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PatientForm.css';

const PatientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const selectedPatient = location.state?.patient || null;

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    doctor: '',
    history: '',
    dob: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (selectedPatient) {
      setFormData(selectedPatient);
      setIsEditMode(true);
    } else if (params.id) {
      setIsEditMode(true);
      axios.get(`http://localhost:3001/api/patients/${params.id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => {
          console.error('Failed to fetch patient:', err);
          alert('Patient not found.');
          navigate('/patients');
        });
    }
  }, [selectedPatient, params.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let patientData = { ...formData };

    try {
      if (isEditMode && (formData.id || params.id)) {
        const id = formData.id || params.id;
        await axios.put(`http://localhost:3001/api/patients/${id}`, patientData);
      } else {
        // Remove ID before sending to let the backend generate it
        delete patientData.id;
        await axios.post('http://localhost:3001/api/patients', patientData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Failed to save patient.');
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? "Edit Patient" : "Add Patient"}</h2>

      <label>Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Age</label>
      <input
        type="number"
        name="age"
        placeholder="Enter age"
        value={formData.age}
        onChange={handleChange}
        required
        min="0"
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />

      <label>Gender</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={formData.gender === 'Male'}
          /> Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={formData.gender === 'Female'}
          /> Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={handleChange}
            checked={formData.gender === 'Other'}
          /> Other
        </label>
      </div>

      <label>Contact Number</label>
      <input
        type="text"
        name="contact"
        placeholder="Enter contact number"
        value={formData.contact}
        onChange={handleChange}
        required
        pattern="[0-9]{10}"
        title="Enter a 10-digit phone number"
      />

      <label>Doctor Assigned</label>
      <select
        name="doctor"
        value={formData.doctor}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Doctor --</option>
        <option value="Dr. Smith">Dr. Smith</option>
        <option value="Dr. Adams">Dr. Adams</option>
        <option value="Dr. Khan">Dr. Khan</option>
      </select>

      <label>Medical History</label>
      <textarea
        name="history"
        placeholder="E.g. Asthma, Diabetes"
        value={formData.history}
        onChange={handleChange}
        rows="3"
      ></textarea>

      <button type="submit">{isEditMode ? "Update Patient" : "Add Patient"}</button>
    </form>
  );
};

export default PatientForm;
