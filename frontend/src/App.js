import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import PatientForm from './components/PatientForm/PatientForm';
import PatientList from './components/PatientList/PatientList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-form" element={<PatientForm />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/add-patient" element={<PatientForm />} />
        <Route path="/edit/:id" element={<PatientForm />} />

      </Routes>
    </Router>
  );
}

export default App;
