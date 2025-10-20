import React, { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaSearch, FaShoppingCart, FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = ({ isUser }) => {
    console.log(isUser);
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
        navigate('/login')
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <img className="w-8" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden xl:flex absolute left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-8">
                            {/* <div className="hidden lg:flex flex-1 justify-center">
                        <div className="flex items-center space-x-8"> */}
                            <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Home
                            </Link>
                            
                            <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Services
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                About
                            </Link>
                            {isUser ? <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Dashboard
                            </Link> : null}
                            {isUser ? <Link to="/create-pitch" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Create Pitch
                            </Link> : null}
                            
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Contact
                            </Link>
                            {!isUser ? <Link to="/signup" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Signup
                            </Link> : null}

                        </div>
                    </div>

                    {/* Right side icons - Hidden on mobile */}
                    <div className="hidden xl:flex items-center space-x-4">
                        {/* Search */}
                        {/* <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                            <FaSearch className="w-5 h-5" />
                        </button> */}

                        {/* Cart */}
                        {/* <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative">
                            <FaShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button> */}

                        {/* Notifications */}
                        {/* <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative">
                            <FaBell className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                2
                            </span>
                        </button> */}

                        {/* User/Auth - Desktop */}
                        {isUser ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FaUser className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{isUser.email}</span>
                                </div>
                                <LogoutButton />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleLogin}
                                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button - Show only on mobile */}
                    <div className="xl:hidden flex items-center space-x-3">
                        {/* Show cart icon on mobile */}
                        {/* <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative">
                            <FaShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button> */}

                        {/* Show user icon if logged in on mobile */}
                        {/* {isLoggedIn && (
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FaUser className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                        )} */}

                        {/* Hamburger menu */}
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2"
                        >
                            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="xl:hidden bg-white border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* Navigation Links */}

                            <Link to="/" className="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                           
                            <Link to="/services" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Services
                            </Link>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Contact
                            </Link>
                            {!isUser ? <Link to="/signup" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Signup
                            </Link> : null}

                            {/* Auth Section */}
                            <div className="border-t border-gray-200 pt-4">
                                {isUser ? (
                                    <div className="px-3 py-2">
                                        <div className="flex items-center justify-center mb-3 ">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <FaUser className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{isUser.email}</span>
                                            </div>
                                        </div>
                                        <LogoutButton />
                                    </div>
                                ) : (
                                    <div className="px-3 py-2">
                                        <button
                                            onClick={handleLogin}
                                            className="cursor-pointer w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Login
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;