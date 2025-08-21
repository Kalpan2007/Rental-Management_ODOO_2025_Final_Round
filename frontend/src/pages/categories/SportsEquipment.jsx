import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const SportsEquipment = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportsProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Sports Equipment' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load sports equipment');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load sports equipment');
        setLoading(false);
        console.error('Error fetching sports products:', err);
      }
    };

    fetchSportsProducts();
  }, []);

  const subcategories = [
    {
      name: 'Fitness Equipment',
      description: 'Gym equipment, weights, and fitness accessories',
      icon: '🏋️',
      count: 45
    },
    {
      name: 'Outdoor Sports',
      description: 'Cricket, football, tennis, and outdoor games',
      icon: '⚽',
      count: 60
    },
    {
      name: 'Water Sports',
      description: 'Swimming, surfing, and water activity gear',
      icon: '🏄',
      count: 25
    },
    {
      name: 'Cycling',
      description: 'Bicycles, helmets, and cycling accessories',
      icon: '🚴',
      count: 35
    },
    {
      name: 'Adventure Sports',
      description: 'Rock climbing, trekking, and adventure gear',
      icon: '🧗',
      count: 30
    },
    {
      name: 'Team Sports',
      description: 'Equipment for basketball, volleyball, and team games',
      icon: '🏀',
      count: 40
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
            <div className="text-6xl mb-6">🏃‍♂️</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sports Equipment</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get fit and stay active with our wide range of sports equipment
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
            <h2 className="text-3xl font-bold mb-4">Sports Categories</h2>
            <p className="text-lg">Find equipment for your favorite sports and activities</p>
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
            <h2 className="text-3xl font-bold mb-4">Available Sports Equipment</h2>
            <p className="text-lg">Quality gear for athletes and fitness enthusiasts</p>
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
              <p className="text-lg mb-4">No sports equipment available at the moment</p>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new additions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Sports Equipment */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Sports Equipment?</h2>
            <p className="text-lg">Perfect for fitness enthusiasts and athletes</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Try Before Buy',
                description: 'Test equipment before making expensive purchases',
                icon: '🔍'
              },
              {
                title: 'Seasonal Sports',
                description: 'Perfect for seasonal activities and sports',
                icon: '🌟'
              },
              {
                title: 'Space Saving',
                description: 'No need to store bulky sports equipment',
                icon: '📦'
              },
              {
                title: 'Always Updated',
                description: 'Access to latest sports technology and gear',
                icon: '🚀'
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

export default SportsEquipment;