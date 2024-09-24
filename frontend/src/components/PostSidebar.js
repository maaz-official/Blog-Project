import React, { useEffect, useState } from 'react';

const Sidebar = () => {
  const [sidebarTop, setSidebarTop] = useState(0); // State to track the top position of the sidebar

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = Math.min(100, scrollY); // Maximum offset is set to 100px for smooth scrolling
      setSidebarTop(offset);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sidebar p-6 bg-white" style={{ transform: `translateY(${sidebarTop}px)` }}>
      {/* Staff Picks */}
      <div className="staff-picks mb-6">
        <h3 className="text-xl font-bold mb-4">Staff Picks</h3>
        <ul>
          <li className="mb-4">
            <div className="flex items-center mb-1">
              <img
                src="/assets/avatar1.png"
                alt="Mia Lazarewicz"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-500">Mia Lazarewicz in Human Parts</span>
            </div>
            <p className="font-semibold text-sm">A Comprehensive Review of Shattering Both Legs</p>
          </li>
          <li className="mb-4">
            <div className="flex items-center mb-1">
              <img
                src="/assets/avatar2.png"
                alt="Andrew Jazprose Hill"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-500">Andrew Jazprose Hill in Counter Arts</span>
            </div>
            <p className="font-semibold text-sm">Keeping Up With The Joneses</p>
          </li>
          <li className="mb-4">
            <div className="flex items-center mb-1">
              <img
                src="/assets/avatar3.png"
                alt="The Medium Newsletter"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm text-gray-500">The Medium Newsletter in The Medium Blog</span>
            </div>
            <p className="font-semibold text-sm">Find opportunity in what other people undervalue</p>
          </li>
        </ul>
        <a href="/" className="text-blue-500 hover:underline text-sm">
          See the full list
        </a>
      </div>

      {/* Writing on Medium */}
      <div className="writing-on-medium p-4 mb-6 bg-blue-50 rounded-lg">
        <h3 className="text-md font-semibold">Writing on Medium</h3>
        <ul className="text-sm text-gray-600 mb-4">
          <li>New writer FAQ</li>
          <li>Expert writing advice</li>
          <li>Grow your readership</li>
        </ul>
        <button className="bg-black text-white py-2 px-4 rounded-lg text-sm">
          Start writing
        </button>
      </div>

      {/* Recommended Topics */}
      <div className="recommended-topics mb-6">
        <h3 className="text-md font-semibold mb-3">Recommended topics</h3>
        <div className="flex flex-wrap gap-2">
          {['Programming', 'Relationships', 'Data Science', 'Self Improvement', 'Technology', 'Politics', 'Cryptocurrency'].map(
            (topic) => (
              <span
                key={topic}
                className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {topic}
              </span>
            )
          )}
        </div>
        <a href="/" className="text-blue-500 hover:underline text-sm mt-3 block">
          See more topics
        </a>
      </div>

      {/* Who to Follow */}
      <div className="who-to-follow">
        <h3 className="text-md font-semibold mb-4">Who to follow</h3>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src="/assets/avatar4.png"
              alt="Tari Ibaba"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">Tari Ibaba</p>
              <p className="text-sm text-gray-500">Software developer, writer, and entrepreneur.</p>
            </div>
          </div>
          <button className="bg-gray-100 text-black py-1 px-3 rounded-lg text-sm">Follow</button>
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src="/assets/avatar5.png"
              alt="JavaScript in Plain English"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">JavaScript in Plain English</p>
              <p className="text-sm text-gray-500">Publication with JavaScript content every day.</p>
            </div>
          </div>
          <button className="bg-gray-100 text-black py-1 px-3 rounded-lg text-sm">Follow</button>
        </div>
        <a href="/" className="text-blue-500 hover:underline text-sm">
          See more suggestions
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
