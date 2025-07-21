// src/services/patientService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/patients';


const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const addPatient = async (patient) => {
  const response = await axios.post(BASE_URL, patient);
  return response.data; // will include generated id
};


const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Delete failed for id ${id}:`, error.message);
    throw error;
  }
};


const updatePatient = async (id, updatedPatient) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedPatient);
  return response.data;
};

const patientService = {
  getAll,
  getById,
  addPatient,
  deletePatient,
  updatePatient,
};

export default patientService;
