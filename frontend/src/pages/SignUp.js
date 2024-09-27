import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Input from '../components/Input';
import logo from '../assets/login.jpg';
import { useRegisterMutation } from '../slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredential } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ButtonWithLoader from '../components/ButtonLoader';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get redirect query parameter (if any)
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  // Access userInfo from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Local state for form inputs
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');  // Added username field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // Terms and Conditions state
  const [formError, setFormError] = useState('');

  // useRegisterMutation hook for registration
  const [register, { isLoading }] = useRegisterMutation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Form validation
  const validateForm = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      setFormError('Please fill out all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return false;
    }

    if (!termsAccepted) {
      setFormError('You must accept the terms and conditions.');
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
      const userData = { fullName, username, email, password };  // Added username to userData
      const res = await register(userData).unwrap();
      dispatch(setCredential(res));
      navigate(redirect);
      toast.success('Registration successful!');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error(err?.data?.message || err?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-100">
      <div className="bg-white w-full max-w-4xl shadow-lg rounded-2xl flex overflow-hidden mt-4 mb-4">
        {/* Left side with image */}
        <div className="hidden lg:flex lg:w-1/2 bg-pink-100 p-8 justify-center items-center">
          <img src={logo} alt="signup" className="w-full h-auto" />
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>

          {formError && <Message variant="error" message={formError} />}
          {isLoading && <Loader />}

          {/* Form */}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <Input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              label="Full Name"
              icon={FaUser}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {/* Username Input */}
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="john_doe"
              label="Username"
              icon={FaUser}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email Input */}
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              label="Email"
              icon={FaEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              label="Password"
              icon={FaLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password Input */}
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              label="Confirm Password"
              icon={FaLock}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-700">
                I accept the{' '}
                <Link to="/terms" className="text-pink-500 hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>

            {/* Sign Up Button with Loader */}
            <ButtonWithLoader isLoading={isLoading} type="submit">
              Sign Up
            </ButtonWithLoader>
          </form>

          {/* Social Signup Section */}
          <div className="text-center text-gray-400">Or Sign Up With</div>
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2"
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2"
            >
              <FaFacebook /> Facebook
            </button>
            <button
              type="button"
              className="w-1/3 py-2 border border-gray-300 rounded-lg text-sm flex justify-center items-center gap-2"
            >
              <FaApple /> Apple
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-pink-500 hover:underline">
              Log In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
