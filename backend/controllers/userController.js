import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js';


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // Generate the token and set it as a cookie
    const token = generateToken(user._id, res);

    // Send response with user details
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage, // Include profileImage in response
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, profileImage } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const user = await User.create({
    fullName, // Accept full name from request body
    email,
    password, // Password hashing is handled in the model
    profileImage: profileImage || 'https://www.example.com/default-profile.jpg', // Use default if not provided
  });

  if (user) {
    const token = generateToken(user._id, res); // Generate JWT token
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Logout user & clear token
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'User logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       profileImage: user.profileImage,  // Include profile image if available
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
//   try {
//     // Find the user by their ID (from the JWT)
//     const user = await User.findById(req.user._id);

//     if (user) {
//       // Update name and email if provided in the request
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;

//       // Update password if provided
//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//     // Ensure the updated profileImage is saved and sent in the response
//     if (req.file) {
//       user.profileImage = `/uploads/profileImages/${req.file.filename}`;
//     }

//       // Save the updated user information to the database
//       const updatedUser = await user.save();

//       // Respond with the updated user data (including a new token if needed)
//       res.status(200).json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         profileImage: updatedUser.profileImage,  // Return the updated profile image
//       });
//     } else {
//       // Return a 404 error if the user is not found
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error('Error updating user profile:', error);
//     res.status(500);
//     throw new Error('Internal server error');
//   }
};




// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
//   const users = await User.find({});
//   res.json(users); // Return all users
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    // const user = await User.findById(req.params.id).select('-password');  // Find user by ID and exclude the password
  
    // if (user) {
    //   res.json(user);  // Return user data as JSON
    // } else {
    //   res.status(404);
    //   throw new Error('User not found');  // Return 404 if user not found
    // }
  };
  
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    // const user = await User.findById(req.params.id);  // Find user by ID
  
    // if (user) {
    //   user.name = req.body.name || user.name;  // Update user name if provided, or keep the existing name
    //   user.email = req.body.email || user.email;  // Update user email if provided, or keep the existing email
    //   user.isAdmin = Boolean(req.body.isAdmin);  // Update the admin status
  
    //   const updatedUser = await user.save();  // Save the updated user
  
    //   res.json({
    //     _id: updatedUser._id,
    //     name: updatedUser.name,
    //     email: updatedUser.email,
    //     isAdmin: updatedUser.isAdmin,
    //   });  // Return the updated user data
    // } else {
    //   res.status(404);
    //   throw new Error('User not found');  // If user not found, return 404
    // }
  };
  

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    // const user = await User.findById(req.params.id);  // Find user by ID
  
    // if (user) {
    //   if (user.isAdmin) {
    //     res.status(400);
    //     throw new Error('Cannot delete admin user');  // Prevent deleting admin users
    //   }
    //   await User.deleteOne({ _id: user._id });  // Delete the user
    //   res.json({ message: 'User removed' });  // Send success response
    // } else {
    //   res.status(404);
    //   throw new Error('User not found');  // If user is not found, return 404
    // }
  };
  

export {
  authUser,
  registerUser,
  getUserById,
  logoutUser,
  updateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
