import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when authenticated state changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Navigation items
  const navigationItems = [
    { label: 'Browse Products', href: '/products', icon: ShoppingBagIcon },
    { label: 'List Product', href: '/products/new', icon: PlusCircleIcon, authRequired: true },
  ];

  const userMenuItems = [
    { label: 'My Profile', href: '/profile', icon: UserCircleIcon },
    { label: 'My Bookings', href: '/my-bookings', icon: ShoppingBagIcon },
    { label: 'My Products', href: '/my-products', icon: Cog6ToothIcon },
  ];

  const adminMenuItem = { label: 'Admin Dashboard', href: '/admin/dashboard', icon: Cog6ToothIcon };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-[#d4a276]/30'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-colors duration-200 text-[#583101] hover:text-[#6f4518]`}
            >
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#8b5e34]">
                  <span className="text-[#ffedd8] font-bold text-sm">R</span>
                </div>
                RentalHub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              if (item.authRequired && !isAuthenticated) return null;
              
              return (
                <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                        : 'text-[#6f4518] hover:text-[#583101] hover:bg-[#f3d5b5]/50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-4">

            {/* Authentication Section */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
                </motion.div>
              ) : isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* User Menu */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 bg-[#f3d5b5]/50 text-[#583101] hover:bg-[#e7bc91]/50 border border-[#d4a276]/30">
                      <UserCircleIcon className="w-5 h-5" />
                      <span className="hidden md:block">{user?.name || 'Account'}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    
                    <Transition
                      enter="transition duration-200 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-150 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl py-2 z-50 border backdrop-blur-md bg-white/95 border-[#d4a276]/30">
                        
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-[#d4a276]/30">
                          <p className="text-sm font-medium text-[#583101]">
                            {user?.name}
                          </p>
                          <p className="text-xs text-[#8b5e34]">
                            {user?.email}
                          </p>
                        </div>

                        {/* Menu Items */}
                        {userMenuItems.map((item) => (
                          <Menu.Item key={item.href}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                                  active
                                    ? 'bg-[#f3d5b5]/50 text-[#583101]'
                                    : 'text-[#6f4518] hover:text-[#583101]'
                                }`}
                              >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        
                        {/* Admin Menu Item */}
                        {isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={adminMenuItem.href}
                                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                                  active
                                    ? 'bg-[#f3d5b5]/50 text-[#583101]'
                                    : 'text-[#6f4518] hover:text-[#583101]'
                                }`}
                              >
                                <adminMenuItem.icon className="w-4 h-4" />
                                {adminMenuItem.label}
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        
                        {/* Logout */}
                        <div className="border-t mt-2 pt-2 border-[#d4a276]/30">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors ${
                                  active
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-[#6f4518] hover:text-red-600'
                                }`}
                              >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                Sign Out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-[#6f4518] hover:text-[#583101] hover:bg-[#f3d5b5]/50`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]">
                  >
                    Get Started
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg transition-colors text-[#6f4518] hover:bg-[#f3d5b5]/50"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden border-t overflow-hidden border-[#d4a276]/30">
            >
              <div className="py-4 space-y-2">
                
                {/* Navigation Links */}
                {navigationItems.map((item, index) => {
                  if (item.authRequired && !isAuthenticated) return null;
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          location.pathname === item.href
                            ? 'bg-[#8b5e34] text-[#ffedd8]'
                            : 'text-[#6f4518] hover:bg-[#f3d5b5]/50'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Authentication Section */}
                <div className="border-t pt-4 mt-4 border-[#d4a276]/30">
                  <AnimatePresence mode="wait">
                    {isAuthenticated ? (
                      <motion.div
                        key="authenticated"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-2"
                      >
                        {/* User Info */}
                        <div className="px-4 py-2">
                          <p className="text-sm font-medium text-[#583101]">
                            {user?.name}
                          </p>
                          <p className="text-xs text-[#8b5e34]">
                            {user?.email}
                          </p>
                        </div>

                        {/* User Menu Items */}
                        {userMenuItems.map((item, index) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + 2) * 0.1, duration: 0.3 }}
                          >
                            <Link
                              to={item.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-[#6f4518] hover:bg-[#f3d5b5]/50">
                            >
                              <item.icon className="w-5 h-5" />
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}

                        {/* Admin Link */}
                        {isAdmin && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                          >
                            <Link
                              to={adminMenuItem.href}
                              onClick={closeMobileMenu}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-[#6f4518] hover:bg-[#f3d5b5]/50">
                            >
                              <adminMenuItem.icon className="w-5 h-5" />
                              {adminMenuItem.label}
                            </Link>
                          </motion.div>
                        )}

                        {/* Logout Button */}
                        <motion.button
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-[#6f4518] hover:bg-red-50 hover:text-red-600">
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          Sign Out
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unauthenticated"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <Link
                          to="/login"
                          onClick={closeMobileMenu}
                          className="block px-4 py-3 rounded-lg font-medium transition-all duration-200 text-[#6f4518] hover:bg-[#f3d5b5]/50">
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          onClick={closeMobileMenu}
                          className="block px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]">
                        >
                          Get Started
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Remove theme toggle from mobile menu completely */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;