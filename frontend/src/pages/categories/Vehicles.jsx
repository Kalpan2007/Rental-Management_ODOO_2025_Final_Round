import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { TruckIcon } from '@heroicons/react/24/outline';

const Vehicles = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Vehicles' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load vehicles');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load vehicles');
        setLoading(false);
        console.error('Error fetching vehicles:', err);
      }
    };

    fetchVehicles();
  }, []);

  const subcategories = [
    {
      name: 'Cars',
      description: 'Sedans, hatchbacks, and luxury cars',
      icon: '🚗',
      count: 50
    },
    {
      name: 'Bikes & Scooters',
      description: 'Motorcycles, scooters, and electric bikes',
      icon: '🏍️',
      count: 75
    },
    {
      name: 'Commercial Vehicles',
      description: 'Trucks, vans, and delivery vehicles',
      icon: '🚚',
      count: 25
    },
    {
      name: 'Luxury Vehicles',
      description: 'Premium cars and exotic vehicles',
      icon: '🏎️',
      count: 15
    },
    {
      name: 'Electric Vehicles',
      description: 'Eco-friendly electric cars and bikes',
      icon: '⚡',
      count: 30
    },
    {
      name: 'Recreational Vehicles',
      description: 'ATVs, boats, and adventure vehicles',
      icon: '🛥️',
      count: 20
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
            <TruckIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Vehicles</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Rent cars, bikes, and commercial vehicles for any occasion
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
            <h2 className="text-3xl font-bold mb-4">Vehicle Categories</h2>
            <p className="text-lg">Choose from our diverse fleet of vehicles</p>
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
                <div className="text-primary-600 font-medium">{category.count} vehicles available</div>
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
            <h2 className="text-3xl font-bold mb-4">Available Vehicles</h2>
            <p className="text-lg">Well-maintained vehicles for every need</p>
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
              <p className="text-lg mb-4">No vehicles available at the moment</p>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new additions!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Vehicles */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Vehicles?</h2>
            <p className="text-lg">Smart mobility solutions for every situation</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'No Ownership Costs',
                description: 'Avoid insurance, maintenance, and depreciation costs',
                icon: '💰'
              },
              {
                title: 'Flexible Duration',
                description: 'Rent for hours, days, weeks, or months',
                icon: '⏰'
              },
              {
                title: 'Try Different Models',
                description: 'Experience various vehicles before buying',
                icon: '🔄'
              },
              {
                title: 'Always Serviced',
                description: 'Well-maintained vehicles with regular servicing',
                icon: '🔧'
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

export default Vehicles;