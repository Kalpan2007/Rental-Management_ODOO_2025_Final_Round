import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        // Mock wishlist data - in real app, this would come from API
        const mockWishlist = [
          {
            _id: '1',
            name: 'Professional DSLR Camera',
            price: 500,
            category: 'Photography',
            imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
            availability: true,
            rating: 4.8,
            owner: 'owner1',
            status: 'approved',
            addedAt: new Date(Date.now() - 86400000) // 1 day ago
          },
          {
            _id: '2',
            name: 'Professional DJ Equipment',
            price: 800,
            category: 'Audio Equipment',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
            availability: true,
            rating: 4.9,
            owner: 'owner2',
            status: 'approved',
            addedAt: new Date(Date.now() - 172800000) // 2 days ago
          },
          {
            _id: '3',
            name: 'Gaming Console Setup',
            price: 300,
            category: 'Gaming',
            imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
            availability: false,
            rating: 4.7,
            owner: 'owner3',
            status: 'approved',
            addedAt: new Date(Date.now() - 259200000) // 3 days ago
          }
        ];
        
        setWishlistItems(mockWishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    toast.success('Removed from wishlist');
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
      toast.success('Wishlist cleared');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={clearWishlist}
                className="btn-outline-red flex items-center"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {/* Wishlist Grid */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <ProductCard product={product} />
                
                {/* Remove Button */}
                <motion.button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HeartIcon className="h-5 w-5 text-red-500 fill-current" />
                </motion.button>

                {/* Added Date */}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Added {new Date(product.addedAt).toLocaleDateString()}
                </div>

                {/* Availability Badge */}
                {!product.availability && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Unavailable
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">Your Wishlist is Empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start browsing products and add them to your wishlist for quick access
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </motion.div>
        )}

        {/* Wishlist Tips */}
        {wishlistItems.length > 0 && (
          <motion.div
            className={`mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold mb-4">💡 Wishlist Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className="font-medium mb-2">Get Notified</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We'll notify you when wishlist items become available or go on sale
                </p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className="font-medium mb-2">Share Your Wishlist</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your wishlist with friends and family for gift ideas
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;