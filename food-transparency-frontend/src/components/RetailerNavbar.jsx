import React from "react";
import { Link } from "react-router-dom";

function RetailerNavbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-xl font-bold">Retailer Dashboard</div>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default RetailerNavbar;
