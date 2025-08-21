import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SparklesIcon } from '@heroicons/react/24/outline';

const PartySupplies = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartyProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Party Supplies' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load party supplies');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load party supplies');
        setLoading(false);
        console.error('Error fetching party products:', err);
      }
    };

    fetchPartyProducts();
  }, []);

  const subcategories = [
    {
      name: 'Decorations',
      description: 'Beautiful decorations for all types of celebrations',
      icon: '🎈',
      count: 50
    },
    {
      name: 'Tables & Chairs',
      description: 'Elegant furniture for events and parties',
      icon: '🪑',
      count: 40
    },
    {
      name: 'Lighting',
      description: 'Ambient and decorative lighting solutions',
      icon: '💡',
      count: 25
    },
    {
      name: 'Tents & Canopies',
      description: 'Weather protection for outdoor events',
      icon: '⛺',
      count: 20
    },
    {
      name: 'Entertainment',
      description: 'Games, photo booths, and entertainment equipment',
      icon: '🎪',
      count: 30
    },
    {
      name: 'Catering Equipment',
      description: 'Serving dishes, warmers, and catering supplies',
      icon: '🍽️',
      count: 35
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
            <SparklesIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Party Supplies</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Make your celebrations memorable with our party rental collection
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
            <h2 className="text-3xl font-bold mb-4">Party Categories</h2>
            <p className="text-lg">Everything you need for the perfect celebration</p>
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
            <h2 className="text-3xl font-bold mb-4">Available Party Supplies</h2>
            <p className="text-lg">Create unforgettable celebrations</p>
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
              <p className="text-lg mb-4">No party supplies available at the moment</p>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new additions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Party Supplies */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Party Supplies?</h2>
            <p className="text-lg">Smart party planning made easy</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Cost Effective',
                description: 'Save money on one-time party expenses',
                icon: '💰'
              },
              {
                title: 'No Storage Hassle',
                description: 'No need to store party items after use',
                icon: '📦'
              },
              {
                title: 'Professional Quality',
                description: 'High-quality items for impressive events',
                icon: '⭐'
              },
              {
                title: 'Variety',
                description: 'Access to wide range of party themes and styles',
                icon: '🎨'
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

export default PartySupplies;