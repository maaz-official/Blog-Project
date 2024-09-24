import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          
          {/* Logo or Brand Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">YourBrand</h2>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons Section */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <ul className="flex justify-center md:justify-end space-x-4">
              <li>
                <a href="/" className="hover:text-gray-400">
                  {/* Replace with your social media icons */}
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-gray-400">
                  <FaLinkedin/>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
