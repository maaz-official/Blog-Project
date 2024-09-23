import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AnimationWrapper from './AnimationWrapper';

const Input = ({ type, id, name, placeholder, label, icon: Icon, value, onChange }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Toggle between showing and hiding password
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Determine the input type (switch between text/password for password fields)
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <AnimationWrapper>
      <div className="relative">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={inputType}  // Dynamic type based on visibility toggle
          id={id}
          name={name}  // Added 'name' prop for form handling
          placeholder={placeholder}
          className="w-full mt-2 p-3 mr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 pl-[2.5rem]" // Adjust padding-left here for the placeholder margin
          value={value}  // Controlled input
          onChange={onChange}  // Handle changes in the parent component
        />
        {Icon && <Icon className="absolute left-3 top-[52px] text-gray-500" />}
        
        {/* Show/Hide password toggle for password fields */}
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-[52px] text-gray-500 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default Input;
