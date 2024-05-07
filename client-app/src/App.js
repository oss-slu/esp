import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardComponent from './components/OrcaDashboardComponent';
import TempComponent from './components/DraftOrcaDashboard';
import GaussianDashboardComponent from './components/GaussianDashboardComponent';
import NavBarOrca from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutComponent from './components/AboutComponent';

const App = () => {
  return (
    <Router>
      <NavBarOrca/>
      <Routes>
        <Route path="/orca" element={<DashboardComponent />} />
        <Route path="/temp" element={<TempComponent />} />
        <Route path="/gaussian" element={<GaussianDashboardComponent />} />
        <Route path="/" element={<Navigate to="/orca" replace />} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
};

export default App;