import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  TagIcon,
  SparklesIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  GiftIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const Deals = () => {
  const { darkMode } = useTheme();
  const [deals, setDeals] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [weeklyDeals, setWeeklyDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        
        // Fetch discounted products
        const dealsResponse = await getProducts({ 
          limit: 12,
          hasDiscount: true,
          sort: 'discount',
          order: 'desc'
        });
        
        const flashResponse = await getProducts({ 
          limit: 6,
          flashDeal: true
        });
        
        const weeklyResponse = await getProducts({ 
          limit: 8,
          weeklyDeal: true
        });
        
        if (dealsResponse.success) {
          setDeals(dealsResponse.data || []);
        }
        
        if (flashResponse.success) {
          setFlashDeals(flashResponse.data || []);
        }
        
        if (weeklyResponse.success) {
          setWeeklyDeals(weeklyResponse.data || []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealCategories = [
    { name: 'Flash Deals', icon: BoltIcon, color: 'from-red-500 to-pink-600', count: 25 },
    { name: 'Weekly Specials', icon: GiftIcon, color: 'from-purple-500 to-violet-600', count: 40 },
    { name: 'Bulk Discounts', icon: TagIcon, color: 'from-blue-500 to-cyan-600', count: 30 },
    { name: 'New User Offers', icon: SparklesIcon, color: 'from-green-500 to-emerald-600', count: 15 }
  ];

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
            <TagIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🏷️ Amazing Deals
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Discover incredible discounts and special offers on premium rental products
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Flash Deals Timer */}
        <motion.div
          className={`mb-12 p-8 rounded-2xl backdrop-blur-sm border text-center ${
            darkMode 
              ? 'bg-red-900/30 border-red-800' 
              : 'bg-red-50 border-red-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={`text-3xl font-bold mb-4 flex items-center justify-center ${
            darkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            <BoltIcon className="h-8 w-8 mr-3" />
            ⚡ Flash Deals Ending Soon!
          </h2>
          
          <div className="flex justify-center space-x-8 mb-6">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((time, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {time.value.toString().padStart(2, '0')}
                </div>
                <div className={`text-sm font-medium ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {time.label}
                </div>
              </div>
            ))}
          </div>
          
          <p className={`text-lg ${
            darkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            Hurry up! These deals won't last long
          </p>
        </motion.div>

        {/* Deal Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            🎯 Deal Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-6 text-center text-white bg-gradient-to-r ${category.color} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <category.icon className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80 mb-4">{category.count} deals available</p>
                <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors">
                  View Deals
                </button>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Deals */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : deals.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🔥 Featured Deals
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {deals.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <ProductCard product={product} index={index} />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      🏷️ {Math.floor(Math.random() * 50 + 10)}% OFF
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🎁</div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              No Deals Available
            </h3>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Check back soon for amazing deals and discounts
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

        {/* Newsletter Signup */}
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
            📧 Never Miss a Deal
          </h3>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Subscribe to get notified about exclusive deals and flash sales
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                  : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
              }`}
            />
            <button className={`py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}>
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Deals;