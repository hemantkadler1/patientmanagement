// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const patientRoutes = require('./routes/patients');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/patients', patientRoutes);

// ✅ In-memory user data (for demo purposes only)
let users = [];

// ✅ In-memory patient data (shared with route)
const patients = []; // moved here and passed to the routes file

// ✅ Import and inject routes
const patientRoutes = require('./routes/patients')(patients);
app.use('/api/patients', patientRoutes);

// ✅ User Registration/Login (Mock API)
app.get('/users', (req, res) => {
  const { doctorId } = req.query;
  const user = users.find(u => u.doctorId === doctorId);
  res.json(user ? [user] : []);
});

app.post('/users', (req, res) => {
  const { doctorId, name, password } = req.body;

  if (!doctorId || !name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exists = users.find(u => u.doctorId === doctorId);
  if (exists) {
    return res.status(409).json({ error: "Doctor ID already exists" });
  }

  users.push({ doctorId, name, password });
  res.status(201).json({ message: "User registered successfully" });
});

// ✅ Start the backend server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
