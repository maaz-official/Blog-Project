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
  const { fullName, email, password, profileImage, username } = req.body;

  // Check if user already exists by email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const user = await User.create({
    fullName,
    email,
    password, // Ensure password is hashed in your model
    profileImage: profileImage || 'https://www.example.com/default-profile.jpg',
    username: username || null, // Set username to null if not provided
  });

  if (user) {
    const token = generateToken(user._id, res); // Generate JWT token
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      username: user.username,
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

};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
};




// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {

};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
};
  
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  };
  

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
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
