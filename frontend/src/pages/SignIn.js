import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '../components/Input'; // Import the reusable Input component
import logo from '../assets/login.jpg';  // Import your image
import { useLoginMutation } from '../slices/userApiSlice'; // Use the login mutation
import { useSelector, useDispatch } from 'react-redux';
import { setCredential } from '../slices/authSlice'; // Action to set credentials in Redux
import { toast } from 'react-toastify'; // For notifications
import Loader from '../components/Loader'; // Loader for API call waiting
import Message from '../components/Message';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get redirect query parameter (if any)
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // Access userInfo from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  // useLoginMutation hook for login
  const [login, { isLoading }] = useLoginMutation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Form validation
  const validateForm = () => {
    if (!email || !password) {
      setFormError('Please fill out all fields.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredential(res));
      navigate(redirect);
      toast.success('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err?.data?.message || err?.message || 'Login failed');
    }
  };

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

          {formError && <Message variant="error" message={formError} />}
          {isLoading && <Loader />}

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <Input
              type="email"
              id="email"
              placeholder="daniel21fisher@gmail.com"
              label="Email"
              icon={FaEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input with visibility toggle */}
            <Input
              type="password"
              id="password"
              placeholder="********"
              label="Password"
              icon={FaLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-pink-500 hover:underline">Forgot Password?</Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-all"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
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
