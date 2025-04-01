import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardComponent from "./components/OrcaDashboardComponentLegacy";
import OrcaDashboardComponent from "./components/OrcaDashboardComponent";
import GaussianDashboardComponent from "./components/GaussianDashboardComponent";
import NavBarOrca from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AboutComponent from "./components/AboutComponent";

const App = () => {
  return (
    <Router>
      <NavBarOrca />
      <Routes>
        <Route path="/" element={<OrcaDashboardComponent />} />
        <Route path="/temp" element={<DashboardComponent />} />
        <Route path="/gaussian" element={<GaussianDashboardComponent />} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
