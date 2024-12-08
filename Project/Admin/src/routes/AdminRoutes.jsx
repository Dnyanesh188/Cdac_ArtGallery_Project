import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ManageArtworks from "../pages/ManageArtworks";
import ManageUsers from "../pages/ManageUsers";
import ManageAuctions from "../pages/ManageAuctions";
import ManageCategories from "../pages/ManageCategories";
import Profile from "../pages/Profile";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/manage-artworks" element={<ManageArtworks />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin/manage-auctions" element={<ManageAuctions />} />
      <Route path="/admin/profile" element={<Profile />} />
    </Routes>
  );
};

export default AdminRoutes;