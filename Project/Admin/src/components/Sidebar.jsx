import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/manage-artworks">Manage Artworks</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/manage-users">Manage Users</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/manage-auctions">Manage Auctions</Link>
        </li>
        <li className="list-group-item">
          <Link to="/admin/profile">Profile</Link>
        </li>

        
      </ul>
    </div>
  );
};

export default Sidebar;