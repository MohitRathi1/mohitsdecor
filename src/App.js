// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from '@vercel/analytics/react';
import Home from "./pages/Homepage.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import ProductPage from "./pages/ProductPage.js";
import CategoryPage from "./pages/CategoryPage.js";
import 'bootstrap/dist/css/bootstrap.min.css';
function Layout() {
    return (
        <div className="app-container">
            {/* Navbar now handles its own audio logic */}
            <Navbar />
              
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/categoryid/:id" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <HelmetProvider>
            <Router>
                <Layout />
            </Router>
            <Analytics />
        </HelmetProvider>
    );
}