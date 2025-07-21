// routes/patients.js
const express = require('express');

module.exports = (patients) => {
  const router = express.Router();

  // GET all patients
  router.get('/', (req, res) => {
    res.json(patients);
  });

  // GET patient by ID
  router.get('/:id', (req, res) => {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  });

  // POST add new patient
  router.post('/', (req, res) => {
    const patient = { ...req.body, id: Date.now().toString() };
    patients.push(patient);
    res.status(201).json(patient);
  });

  // PUT update patient by ID
  router.put('/:id', (req, res) => {
    const index = patients.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Patient not found' });

    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
  });

  // DELETE patient by ID
  router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = patients.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Patient not found' });
  const deleted = patients.splice(index, 1);
  res.json(deleted[0]);
});



  return router;
};
