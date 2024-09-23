import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../components/Input'; // Import the reusable Input component
import logo from '../assets/login.jpg';  // Import your image

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-100">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-2xl flex overflow-hidden mt-4 mb-4">
        {/* Left side with image */}
        <div className="hidden lg:flex lg:w-1/2 bg-pink-100 p-8 justify-center items-center">
          <img src={logo} alt="login" className="w-full h-auto" />
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

          <form className="flex flex-col space-y-6">
            {/* Email Input */}
            <Input 
              type="email" 
              id="email" 
              placeholder="daniel21fisher@gmail.com" 
              label="Email" 
              icon={FaEnvelope}  // Passing the icon prop
            />

            {/* Password Input with visibility toggle */}
            <Input 
              type="password" 
              id="password" 
              placeholder="********" 
              label="Password" 
              icon={FaLock}  // Passing the icon prop
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-pink-500 hover:underline">Forgot Password?</Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-all">
              Log In
            </button>

            {/* Social Login Section */}
            <div className="text-center text-gray-400">Or Continue With</div>
            <div className="flex space-x-4 justify-center">
              <button className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2">
                <FaGoogle /> Google
              </button>
              <button className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2">
                <FaFacebook /> Facebook
              </button>
              <button className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2">
                <FaApple /> Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-gray-500 text-sm mt-4">
              Don’t have an account? <Link to="/signup" className="text-pink-500 hover:underline">Sign Up here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;