import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  FireIcon,
  TrendingUpIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Trending = () => {
  const { darkMode } = useTheme();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [mostLiked, setMostLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true);
        
        // Fetch trending products (mock data for now)
        const trendingResponse = await getProducts({ 
          limit: 12,
          sort: 'popularity',
          order: 'desc'
        });
        
        const recentResponse = await getProducts({ 
          limit: 8,
          sort: 'createdAt',
          order: 'desc'
        });
        
        const likedResponse = await getProducts({ 
          limit: 8,
          sort: 'rating',
          order: 'desc'
        });
        
        if (trendingResponse.success) {
          setTrendingProducts(trendingResponse.data || []);
        }
        
        if (recentResponse.success) {
          setRecentlyViewed(recentResponse.data || []);
        }
        
        if (likedResponse.success) {
          setMostLiked(likedResponse.data || []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending data:', err);
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  const tabs = [
    { id: 'trending', label: 'Trending Now', icon: FireIcon, data: trendingProducts },
    { id: 'recent', label: 'Recently Added', icon: ClockIcon, data: recentlyViewed },
    { id: 'popular', label: 'Most Popular', icon: StarIcon, data: mostLiked }
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || [];

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
            <FireIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🔥 Trending Products
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Discover what's hot in the rental market right now
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`flex rounded-2xl p-2 shadow-xl border-2 ${
            darkMode 
              ? 'bg-[#6f4518] border-[#8b5e34]' 
              : 'bg-[#f3d5b5] border-[#d4a276]'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center ${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'bg-[#a47148] text-[#ffedd8] shadow-lg'
                      : 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                    : darkMode
                    ? 'text-[#f3d5b5] hover:bg-[#8b5e34]/30'
                    : 'text-[#6f4518] hover:bg-[#e7bc91]/50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : currentData.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentData.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
                
                {/* Trending Badge */}
                {activeTab === 'trending' && index < 3 && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      'bg-orange-600 text-white'
                    }`}>
                      #{index + 1} Trending
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">📭</div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              No {tabs.find(tab => tab.id === activeTab)?.label} Found
            </h3>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Check back later for trending products
            </p>
            <Link 
              to="/products" 
              className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
              }`}
            >
              Browse All Products
            </Link>
          </motion.div>
        )}

        {/* Trending Stats */}
        <motion.div
          className={`mt-16 p-8 rounded-2xl backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            📊 Trending Statistics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUpIcon, label: 'Most Searched', value: 'Photography Equipment', color: 'text-blue-500' },
              { icon: EyeIcon, label: 'Most Viewed', value: 'Professional Cameras', color: 'text-green-500' },
              { icon: HeartIcon, label: 'Most Liked', value: 'DJ Equipment', color: 'text-red-500' },
              { icon: CurrencyRupeeIcon, label: 'Best Value', value: 'Gaming Consoles', color: 'text-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <p className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                }`}>
                  {stat.label}
                </p>
                <p className={`font-bold ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Trending;