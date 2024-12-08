import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AdminRoutes from "./routes/AdminRoutes";
import "./styles/admin.css";

const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Navbar />
          <AdminRoutes />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;