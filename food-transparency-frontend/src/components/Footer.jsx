// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4  text-center">
      <p>&copy; 2024 Food Transparency. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-white"><FaFacebook /></a>
        <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
        <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
      </div>
    </footer>
  );
}

export default Footer;


