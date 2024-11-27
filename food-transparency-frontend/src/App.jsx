import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import RetailerDashboard from './pages/RetailerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import CartPage from './pages/CartPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole); // Set role, e.g., 'RETAILER' or 'CUSTOMER'
    }
  }, []);

  // Navbar visibility control: hide on these routes
  const HideNavbarRoutes = ['/customer-dashboard', '/retailer-dashboard'];

  const ConditionalNavbar = () => {
    const location = useLocation();
    const hideNavbar = HideNavbarRoutes.includes(location.pathname);

    // Debugging: Check the current path and whether the navbar should be hidden
    console.log('Current Path:', location.pathname);
    console.log('Hide Navbar:', hideNavbar);

    return !hideNavbar ? <Navbar /> : null; // Render Navbar unless on HideNavbarRoutes
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Navbar */}
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path = "/cart"   element={<CartPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
