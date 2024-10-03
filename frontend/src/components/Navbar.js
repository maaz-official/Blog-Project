import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { Menu, MenuItem } from '@mui/material';
import { logout } from '../slices/authSlice';

function Navbar() {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
    };

    // Check if user has a specific role
    const hasRole = (role) => userInfo?.roles?.includes(role);

    return (
        <div>
            <nav className='navbar flex items-center justify-between p-4 bg-white shadow-md'>
                <Link to='/' className='flex-none w-10'>
                    <img src={logo} alt="Logo" className='w-full' />
                </Link>

                <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                    {/* Search Icon for Mobile */}
                    <button
                        className='md:hidden bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-105'
                        onClick={() => setSearchBoxVisibility(!searchBoxVisibility)}
                        aria-label="Toggle Search"
                    >
                        <i className='fi fi-rr-search text-xl'></i>
                    </button>

                    {/* Editor Link for Authenticated Users */}
                    <Link to='/editor' className='hidden md:flex gap-2 link text-gray-700 hover:text-gray-900 transition-colors'>
                        <i className='fi fi-rr-file-edit'></i>
                        <p>Write</p>
                    </Link>

                    {/* Notifications */}
                    <Link to='/notifications' className='relative hidden md:flex gap-2 link text-gray-700 hover:text-gray-900 transition-colors'>
                        <i className="fi fi-rr-bell text-xl"></i>
                        <span className='absolute -top-3 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
                            3
                        </span>
                    </Link>

                    {/* User Not Logged In */}
                    {!userInfo ? (
                        <>
                            <Link
                                className='py-2 px-6 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all'
                                to='/signin'
                            >
                                Sign In
                            </Link>

                            <Link
                                className='py-2 px-6 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all hidden md:block'
                                to='/signup'
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        /* User Logged In */
                        <div className="relative flex items-center">
                            <FaUserCircle
                                size={30}
                                className='cursor-pointer text-gray-700 hover:text-gray-900 transition-colors'
                                onClick={handleMenuOpen}
                                aria-label="Open Profile Menu"
                            />
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>
                                    <Link to="/profile" className='block text-gray-700 hover:text-gray-900'>
                                        Profile
                                    </Link>
                                </MenuItem>

                                {/* Show Dashboard for Admin/Moderator */}
                                {hasRole('admin') || hasRole('moderator') ? (
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link to="/admin/dashboard" className='block text-gray-700 hover:text-gray-900'>
                                            Dashboard
                                        </Link>
                                    </MenuItem>
                                ) : null}

                                {/* Log Out */}
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            </nav>

            {/* Search Box */}
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
