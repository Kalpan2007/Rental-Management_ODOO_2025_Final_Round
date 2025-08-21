import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  CalendarDaysIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const Marketplace = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    availability: 'available',
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Electronics', 'Photography', 'Audio Equipment', 'Video Equipment',
    'Camping Gear', 'Party Supplies', 'Tools', 'Sports Equipment',
    'Musical Instruments', 'Vehicles', 'Home Appliances', 'Fashion',
    'Books', 'Gaming'
  ];

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
          if (value && value !== '') acc[key] = value;
          return acc;
        }, {});
        
        const response = await getProducts(queryParams);
        
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
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      availability: 'available',
      sortBy: 'newest'
    });
  };

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
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🛒 Marketplace
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Discover thousands of products available for rent with custom pricing
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search and Filters */}
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
          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products, brands, or keywords..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                  : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
              }`}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center py-2 px-4 rounded-lg font-medium transition-colors ${
                darkMode
                  ? 'bg-[#8b5e34]/30 text-[#e7bc91] hover:bg-[#8b5e34]/50'
                  : 'bg-[#f3d5b5]/50 text-[#6f4518] hover:bg-[#e7bc91]/50'
              }`}
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
              }`}>
                {products.length} products found
              </span>
              <button
                onClick={clearFilters}
                className={`text-sm font-medium transition-colors ${
                  darkMode
                    ? 'text-[#bc8a5f] hover:text-[#f3d5b5]'
                    : 'text-[#8b5e34] hover:text-[#6f4518]'
                }`}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                      : 'border-[#d4a276] bg-white text-[#583101]'
                  }`}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                      : 'border-[#d4a276] bg-white text-[#583101]'
                  }`}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  Min Price (₹/day)
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                      : 'border-[#d4a276] bg-white text-[#583101]'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  Max Price (₹/day)
                </label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                      : 'border-[#d4a276] bg-white text-[#583101]'
                  }`}
                />
              </div>
            </motion.div>
          )}
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
            transition={{ duration: 0.5, delay: 0.3 }}
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
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
              }`}
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Quick Categories */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(0, 7).map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`p-4 rounded-xl text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  filters.category === category
                    ? darkMode
                      ? 'bg-[#bc8a5f] text-[#ffedd8]'
                      : 'bg-[#8b5e34] text-[#ffedd8]'
                    : darkMode
                    ? 'bg-[#603808]/80 border border-[#8b5e34]/50 text-[#e7bc91] hover:bg-[#8b5e34]/30'
                    : 'bg-white/80 border border-[#d4a276]/30 text-[#6f4518] hover:bg-[#f3d5b5]/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl mb-2">
                  {category === 'Electronics' && '📱'}
                  {category === 'Photography' && '📷'}
                  {category === 'Audio Equipment' && '🎵'}
                  {category === 'Video Equipment' && '📹'}
                  {category === 'Camping Gear' && '⛺'}
                  {category === 'Party Supplies' && '🎉'}
                  {category === 'Tools' && '🔧'}
                </div>
                <p className="text-sm font-medium">{category}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace;