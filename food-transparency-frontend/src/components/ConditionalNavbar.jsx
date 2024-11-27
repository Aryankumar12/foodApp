import React from "react";
import { useLocation } from "react-router-dom";
import RetailerNavbar from "./RetailerNavbar"; // Import the Retailer Navbar
import HomeNavbar from "./Navbar"; // Import the Home Navbar

function ConditionalNavbar() {
  const location = useLocation();

  // Define the routes for different navbars
  const retailerRoutes = ["/retailer-dashboard"]; // Only Retailer Dashboard should show RetailerNavbar
  const customerRoutes = ["/customer-dashboard"]; // No navbar on Customer Dashboard

  // Check if the current route matches retailer routes or customer routes
//   const isRetailerPage = retailerRoutes.some((route) => location.pathname.startsWith(route));
//   const isCustomerPage = customerRoutes.some((route) => location.pathname.startsWith(route));

  // Logic for rendering
  if (location.pathname === customerPath) {
    return null; // Do not display any navbar on Customer Dashboard
  }

  if (location.pathname === retailerPath) {
    return <RetailerNavbar />; // Display Retailer Navbar on Retailer Dashboard
  }

  return <HomeNavbar />; // Display Home Navbar for all other pages
}

export default ConditionalNavbar;
