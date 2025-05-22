import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuccessPage from "./Pages/Success";
import Home from "./Pages/Home";
import "./App.css";
const App = () => {
  return (
    <div className="app-container">
      <div className="navbar">Assignment - 1 </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
};

export default App;
