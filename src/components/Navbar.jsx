import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { signOutUser } from '../redux/authSlice';
import { setSearchQuery } from '../redux/productSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setSearchQuery(searchTerm));
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate('/');
  };

  return (
    <nav className="bg-amazon-dark text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-amazon-orange"
            >
              Amazon
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-amazon-orange hover:bg-yellow-500 rounded-r-md transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="hover:text-amazon-orange transition-colors duration-200">
              Shop            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="hover:text-amazon-orange transition-colors duration-200">
                  Orders
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-1 hover:text-amazon-orange transition-colors duration-200">
                    <span>Hello, {user?.displayName || user?.email}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-amazon-orange transition-colors duration-200">
                  Sign In
                </Link>
                <Link to="/signup" className="hover:text-amazon-orange transition-colors duration-200">
                  Sign Up
                </Link>
              </>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-amazon-orange transition-colors duration-200">
              <div className="flex items-center space-x-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                </svg>
                <span>Cart</span>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-amazon-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </div>
            </Link>
          </div>
          
          

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amazon-orange transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-300">
                    Hello, {user?.displayName || user?.email}
                  </div>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 hover:text-amazon-orange transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:text-amazon-orange transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 hover:text-amazon-orange transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 hover:text-amazon-orange transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
      {/* Mini Nav (Category Bar) */}
      {/* <div className="bg-[#758A93] text-sm px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button className="flex items-center gap-1 hover:underline cursor-pointer">
          <span>☰</span> All
        </button>
        <p className="hover:underline cursor-pointer">Amazon Home</p>
        <p className="hover:underline cursor-pointer">Kitchen</p>
        <p className="hover:underline cursor-pointer">Home Appliances</p>
        <p className="hover:underline cursor-pointer">Today’s Deals</p>
        <p className="hover:underline cursor-pointer">Mobiles</p>
        <p className="hover:underline cursor-pointer">Customer Service</p>
        <p className="hover:underline cursor-pointer">Prime ▾</p>
        <p className="hover:underline cursor-pointer">Electronics</p>
        <p className="hover:underline cursor-pointer">Fashion</p>
        <p className="hover:underline cursor-pointer">New Releases</p>
        <p className="hover:underline cursor-pointer">Home & Kitchen</p>
      </div> */}
    </nav>
    
  );
};

export default Navbar;
