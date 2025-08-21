import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const Tools = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToolsProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Tools' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load tools');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load tools');
        setLoading(false);
        console.error('Error fetching tools products:', err);
      }
    };

    fetchToolsProducts();
  }, []);

  const subcategories = [
    {
      name: 'Power Tools',
      description: 'Electric drills, saws, sanders, and more',
      icon: '⚡',
      count: 45
    },
    {
      name: 'Hand Tools',
      description: 'Essential hand tools for various projects',
      icon: '🔨',
      count: 60
    },
    {
      name: 'Garden Tools',
      description: 'Lawn mowers, trimmers, and gardening equipment',
      icon: '🌱',
      count: 30
    },
    {
      name: 'Construction Tools',
      description: 'Heavy-duty tools for construction projects',
      icon: '🏗️',
      count: 25
    },
    {
      name: 'Automotive Tools',
      description: 'Car maintenance and repair equipment',
      icon: '🚗',
      count: 20
    },
    {
      name: 'Measuring Tools',
      description: 'Precision measuring and leveling instruments',
      icon: '📏',
      count: 15
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
            <WrenchScrewdriverIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tools & Equipment</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional tools for DIY projects, construction, and maintenance
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
            <h2 className="text-3xl font-bold mb-4">Tool Categories</h2>
            <p className="text-lg">Find the right tools for your project</p>
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
            <h2 className="text-3xl font-bold mb-4">Available Tools</h2>
            <p className="text-lg">Professional tools for every project</p>
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
              <p className="text-lg mb-4">No tools available at the moment</p>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new additions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Tools */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Tools?</h2>
            <p className="text-lg">Smart solution for DIY and professional projects</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Save Money',
                description: 'Avoid expensive tool purchases for one-time projects',
                icon: '💰'
              },
              {
                title: 'Always Sharp',
                description: 'Get well-maintained tools in perfect condition',
                icon: '⚡'
              },
              {
                title: 'No Maintenance',
                description: 'No need to worry about tool maintenance and storage',
                icon: '🔧'
              },
              {
                title: 'Professional Grade',
                description: 'Access to high-quality professional tools',
                icon: '⭐'
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

export default Tools;