// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js"; 
import ProductPage from "./pages/ProductPage.js";
import 'bootstrap/dist/css/bootstrap.min.css';
function Layout() {
    return (
        <div className="app-container">
            {/* Navbar now handles its own audio logic */}
            <Navbar />
              
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}