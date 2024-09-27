import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

    return (
        <div>
            {/* Navbar Section */}
            <nav className='navbar flex items-center justify-between p-4 bg-white shadow-md'>
                {/* Logo */}
                <Link to='/' className='flex-none w-10'>
                    <img src={logo} alt="Logo" className='w-full' />
                </Link>

                {/* Buttons and Search Toggle in a Flex Row */}
                <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                    {/* Search Toggle Button (Mobile) */}
                    <button
                        className='md:hidden bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-105'
                        onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
                    >
                        <i className='fi fi-rr-search text-xl'></i>
                    </button>

                    {/* Write/Edit Link */}
                    <Link to='/editor' className='hidden md:flex gap-2 link text-gray-700 hover:text-gray-900 transition-colors'>
                        <i className='fi fi-rr-file-edit'></i>
                        <p>Write</p>
                    </Link>

                    {/* Notification Icon Link */}
                    <Link to='/notifications' className='relative hidden md:flex gap-2 link text-gray-700 hover:text-gray-900 transition-colors'>
                        <i className="fi fi-rr-bell text-xl"></i>
                        <span className='absolute -top-3 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                            3
                        </span>
                    </Link>

                    {/* Sign In Button */}
                    <Link
                        className='py-2 px-6 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all'
                        to='/signin'
                    >
                        Sign In
                    </Link>

                    {/* Sign Up Button (hidden on mobile) */}
                    <Link
                        className='py-2 px-6 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all hidden md:block'
                        to='/signup'
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Search Box - Open Below Navbar */}
            {searchBoxVisibility && (
                <div className='w-full p-4 bg-white border-t border-grey transition-all duration-300 ease-in-out'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-full bg-gray-200 p-4 pl-6 rounded-full placeholder:text-gray-500'
                    />
                    <i className='fi fi-rr-search absolute right-14 top-[180px] transform -translate-y-9 text-2xl text-gray-600'></i>
                </div>
            )}
        </div>
    );
}

export default Navbar;
