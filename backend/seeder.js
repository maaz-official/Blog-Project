import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';  // Assuming you have a db.js file for database connection
import Post from './model/postModel.js'; // Assuming you have a Post model
import {User} from './model/userModel.js'; // Assuming you have a User model
import postData from './data/post.js'; // Your static post data

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const users = [
  {
    fullName: 'Muhammad Maaz',
    username: 'muhammadmaaz',
    email: 'maaz@example.com',
    password: bcrypt.hashSync('password123', 10),
    profileImage: 'https://example.com/profile1.jpg',
    bio: 'Web Developer & Designer based in Pakistan. Passionate about building dynamic and scalable web applications.',
    location: 'Karachi, Pakistan',
  },
  {
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    profileImage: 'https://example.com/profile2.jpg',
    bio: 'Full-Stack Developer with a love for creating interactive web experiences.',
    location: 'New York, USA',
  },
  {
    fullName: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password123', 10),
    profileImage: 'https://example.com/profile3.jpg',
    bio: 'Front-end developer with a passion for UX/UI design.',
    location: 'London, UK',
  },
];

const importData = async () => {
  try {
    // Clear existing data
    await Post.deleteMany();  // Delete all existing posts
    await User.deleteMany();  // Delete all existing users

    // Insert user profiles first
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;  // Assuming the first user is an admin

    // Attach admin user to all posts (or choose randomly)
    const postsWithUsers = postData.map((post) => {
      return { ...post, user: adminUser };  // Attach user to the posts
    });

    // Insert posts
    await Post.insertMany(postsWithUsers);

    console.log('Users and Posts Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear all posts and users
    await Post.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for command-line arguments to either import or destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
