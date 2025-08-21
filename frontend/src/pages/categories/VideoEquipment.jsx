import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

const VideoEquipment = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Video Equipment' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load video equipment');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load video equipment');
        setLoading(false);
        console.error('Error fetching video products:', err);
      }
    };

    fetchVideoProducts();
  }, []);

  const subcategories = [
    {
      name: 'Video Cameras',
      description: 'Professional video cameras and camcorders',
      icon: '📹',
      count: 20
    },
    {
      name: 'Drones',
      description: 'Aerial photography and videography drones',
      icon: '🚁',
      count: 15
    },
    {
      name: 'Stabilizers & Gimbals',
      description: 'Smooth footage with professional stabilizers',
      icon: '⚖️',
      count: 18
    },
    {
      name: 'Lighting Kits',
      description: 'Professional lighting setups for video production',
      icon: '💡',
      count: 25
    },
    {
      name: 'Monitors & Recorders',
      description: 'External monitors and recording devices',
      icon: '📺',
      count: 12
    },
    {
      name: 'Accessories',
      description: 'Batteries, memory cards, and other essentials',
      icon: '🎒',
      count: 30
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VideoCameraIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Video Equipment</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional video production equipment for creators and filmmakers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategories */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Video Equipment Categories</h2>
            <p className="text-lg">Everything you need for professional video production</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((category, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{category.description}</p>
                <div className="text-primary-600 font-medium">{category.count} items available</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Available Video Equipment</h2>
            <p className="text-lg">Professional gear for content creators and filmmakers</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-secondary"
              >
                Try Again
              </button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg mb-4">No video equipment available at the moment</p>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new additions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Video Equipment */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Video Equipment?</h2>
            <p className="text-lg">Perfect for content creators and production teams</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Professional Quality',
                description: 'Cinema-grade equipment for high-quality productions',
                icon: '🎬'
              },
              {
                title: 'Latest Technology',
                description: 'Access to newest cameras and recording technology',
                icon: '🚀'
              },
              {
                title: 'Complete Packages',
                description: 'Full production setups with all necessary accessories',
                icon: '📦'
              },
              {
                title: 'Expert Support',
                description: 'Technical guidance and setup assistance included',
                icon: '🛠️'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoEquipment;