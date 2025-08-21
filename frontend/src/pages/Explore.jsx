import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  GlobeAltIcon,
  MapPinIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Explore = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const locations = [
    { id: 'all', name: 'All Locations', count: 1250 },
    { id: 'mumbai', name: 'Mumbai', count: 350 },
    { id: 'delhi', name: 'Delhi', count: 280 },
    { id: 'bangalore', name: 'Bangalore', count: 220 },
    { id: 'chennai', name: 'Chennai', count: 180 },
    { id: 'kolkata', name: 'Kolkata', count: 120 },
    { id: 'hyderabad', name: 'Hyderabad', count: 100 }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌟', count: 1250 },
    { id: 'electronics', name: 'Electronics', icon: '📱', count: 350 },
    { id: 'photography', name: 'Photography', icon: '📷', count: 180 },
    { id: 'audio', name: 'Audio Equipment', icon: '🎵', count: 150 },
    { id: 'tools', name: 'Tools', icon: '🔧', count: 200 },
    { id: 'gaming', name: 'Gaming', icon: '🎮', count: 120 },
    { id: 'fashion', name: 'Fashion', icon: '👗', count: 90 },
    { id: 'sports', name: 'Sports', icon: '⚽', count: 160 }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {};
        
        if (selectedLocation !== 'all') {
          params.location = selectedLocation;
        }
        
        if (selectedCategory !== 'all') {
          params.category = selectedCategory;
        }
        
        params.minPrice = priceRange[0];
        params.maxPrice = priceRange[1];
        
        const response = await getProducts(params);
        
        if (response.success) {
          setProducts(response.data || []);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedLocation, selectedCategory, priceRange]);

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlobeAltIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🌍 Explore Rentals
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Discover amazing rental products across India with custom pricing
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Location Filter */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={`text-lg font-bold mb-4 flex items-center ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            <MapPinIcon className="h-5 w-5 mr-2" />
            Browse by Location
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`p-3 rounded-lg text-center transition-all duration-300 ${
                  selectedLocation === location.id
                    ? darkMode
                      ? 'bg-[#bc8a5f] text-[#ffedd8] shadow-lg'
                      : 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                    : darkMode
                    ? 'bg-[#8b5e34]/20 text-[#e7bc91] hover:bg-[#8b5e34]/40'
                    : 'bg-[#f3d5b5]/50 text-[#6f4518] hover:bg-[#e7bc91]/50'
                }`}
              >
                <p className="font-medium text-sm">{location.name}</p>
                <p className="text-xs opacity-75">{location.count} items</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className={`mb-8 p-6 rounded-2xl backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={`text-lg font-bold mb-4 flex items-center ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            <FunnelIcon className="h-5 w-5 mr-2" />
            Browse by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? darkMode
                      ? 'bg-[#bc8a5f] text-[#ffedd8] shadow-lg'
                      : 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                    : darkMode
                    ? 'bg-[#8b5e34]/20 text-[#e7bc91] hover:bg-[#8b5e34]/40'
                    : 'bg-[#f3d5b5]/50 text-[#6f4518] hover:bg-[#e7bc91]/50'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="font-medium text-xs">{category.name}</p>
                <p className="text-xs opacity-75">{category.count}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              No Products Found
            </h3>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Try adjusting your location or category filters
            </p>
            <button
              onClick={() => {
                setSelectedLocation('all');
                setSelectedCategory('all');
                setPriceRange([0, 10000]);
              }}
              className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
              }`}
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Explore More */}
        <motion.div
          className={`mt-16 p-8 rounded-2xl backdrop-blur-sm border text-center ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            🚀 Want to List Your Products?
          </h3>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Join thousands of product owners earning money through rentals
          </p>
          <Link 
            to="/products/new" 
            className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}
          >
            📦 List Your Product
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;