import React from 'react';

// Example user data (can be dynamic, fetched from API)
const userData = {
  profilePicture: '/assets/profile/user.jpg',
  name: 'Muhammad Maaz',
  bio: 'Web Developer & Designer based in Pakistan. Passionate about building dynamic and scalable web applications.',
  location: 'Karachi, Pakistan',
  joinDate: 'Joined September 2022',
  stats: {
    posts: 120,
    followers: 450,
    following: 180,
  },
  recentPosts: [
    {
      id: 1,
      title: 'My Journey into Web Development',
      date: '2023-09-21',
    },
    {
      id: 2,
      title: '10 Tips for Writing Clean Code',
      date: '2023-09-18',
    },
    {
      id: 3,
      title: 'Understanding JavaScript Closures',
      date: '2023-09-15',
    },
  ],
};

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src={userData.profilePicture}
            alt={userData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600">{userData.bio}</p>
            <p className="text-gray-500 mt-2">{userData.location}</p>
            <p className="text-gray-500 mt-1">{userData.joinDate}</p>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Stats</h2>
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{userData.stats.posts}</p>
            <p className="text-gray-600">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{userData.stats.followers}</p>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{userData.stats.following}</p>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Posts</h2>
        <ul>
          {userData.recentPosts.map((post) => (
            <li key={post.id} className="mb-4">
              <h3 className="text-xl font-bold text-blue-600">{post.title}</h3>
              <p className="text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;


// Profile tobe Used
// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaLock, FaUser, FaCamera } from 'react-icons/fa';
// import Input from '../components/Input'; // Reusable Input component
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useUpdateUserProfileMutation } from '../slices/userApiSlice'; // Assume this mutation is created in apiSlices
// import { setCredential } from '../slices/authSlice'; // Update Redux store with new credentials
// import Loader from '../components/Loader'; // Loader for API call waiting

// const Profile = () => {
//   const dispatch = useDispatch();

//   // Get userInfo from Redux store
//   const { userInfo } = useSelector((state) => state.auth);

//   // Local state for form inputs
//   const [fullName, setFullName] = useState(userInfo?.fullName || '');
//   const [email, setEmail] = useState(userInfo?.email || '');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [profileImage, setProfileImage] = useState(userInfo?.profileImage || '');
//   const [formError, setFormError] = useState('');

//   // Mutation for updating the user profile
//   const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

//   // Handle form validation
//   const validateForm = () => {
//     if (!fullName || !email) {
//       setFormError('Full name and email are required.');
//       return false;
//     }

//     if (password && password !== confirmPassword) {
//       setFormError('Passwords do not match.');
//       return false;
//     }

//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const updatedData = { fullName, email, password, profileImage };
//       const res = await updateProfile(updatedData).unwrap();
//       dispatch(setCredential(res)); // Update Redux store with new profile data
//       toast.success('Profile updated successfully!');
//     } catch (err) {
//       console.error('Profile update failed:', err);
//       toast.error(err?.data?.message || err?.message || 'Profile update failed');
//     }
//   };

//   // Handle profile image change (for demo purposes, no file upload logic included)
//   const handleProfileImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // For now, we'll just mock updating the profile image
//       const newImageUrl = URL.createObjectURL(file);
//       setProfileImage(newImageUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white w-full max-w-3xl shadow-lg rounded-2xl p-8 mt-4 mb-4">
//         <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>

//         {formError && <p className="text-red-500">{formError}</p>}
//         {isLoading && <Loader />}

//         {/* Profile image section */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative">
//             <img
//               src={profileImage || 'https://www.example.com/default-profile.jpg'}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover"
//             />
//             <label
//               htmlFor="profileImage"
//               className="absolute bottom-0 right-0 bg-gray-500 text-white p-1 rounded-full cursor-pointer"
//             >
//               <FaCamera />
//             </label>
//             <input
//               type="file"
//               id="profileImage"
//               className="hidden"
//               onChange={handleProfileImageChange}
//             />
//           </div>
//         </div>

//         {/* Form for updating profile */}
//         <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
//           {/* Full Name Input */}
//           <Input
//             type="text"
//             id="fullName"
//             name="fullName"
//             placeholder="John Doe"
//             label="Full Name"
//             icon={FaUser}
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//           />

//           {/* Email Input */}
//           <Input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="johndoe@example.com"
//             label="Email"
//             icon={FaEnvelope}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {/* Password Input */}
//           <Input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="New Password"
//             label="Password"
//             icon={FaLock}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Confirm Password Input */}
//           <Input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             label="Confirm Password"
//             icon={FaLock}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           {/* Save Changes Button */}
//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;

