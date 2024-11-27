import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7860/auth/login', {
        email,   // Send email directly
        password // Send password directly
      });

      const { token, role } = response.data;
      console.log('Role from backend:', role);

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setMessage('Login successful! Redirecting...');
      // Redirect to appropriate dashboard based on role
      if (role === 0) {
        navigate('/CustomerDashboard'); // Use navigate for routing instead of window.location.href
      } else if (role === 1) {
        navigate('/RetailerDashboard');
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center">Login</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          required
        />0
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <p className="mt-4">
          Don’t have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
