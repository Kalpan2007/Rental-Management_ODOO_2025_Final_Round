import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';

const Favorites = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // Mock favorites data - in real app, this would come from API
        const mockFavorites = [
          {
            _id: '1',
            name: 'Professional Camera',
            price: 500,
            category: 'Photography',
            imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
            availability: true,
            rating: 4.8
          },
          {
            _id: '2',
            name: 'DJ Equipment Set',
            price: 800,
            category: 'Audio Equipment',
            imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
            availability: true,
            rating: 4.9
          }
        ];
        
        setFavorites(mockFavorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = (productId) => {
    setFavorites(favorites.filter(fav => fav._id !== productId));
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
          <div className="flex items-center mb-4">
            <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-3xl font-bold">My Favorites</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Products you've saved for later
          </p>
        </motion.div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <ProductCard product={product} />
                <button
                  onClick={() => removeFavorite(product._id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <HeartIcon className="h-5 w-5 text-red-500 fill-current" />
                </button>
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
            <h3 className="text-xl font-semibold mb-4">No Favorites Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start browsing products and add them to your favorites for quick access
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;