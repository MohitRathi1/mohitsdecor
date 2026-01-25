// src/App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Homepage.js";
// --- Cart Routes Wrapper (Renders Provider and Nested Routes) ---

// -------------------------------------------------------------


function Layout() {

    return (
        <div className="app-container">
         
              
                    <Routes>
                        {/* Main Application Routes */}
                        <Route path="/" element={<Home />} />
                        
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