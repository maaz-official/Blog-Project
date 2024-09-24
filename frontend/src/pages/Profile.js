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
