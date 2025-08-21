import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';
import {
  ShieldCheckIcon,
  TruckIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ 
          limit: 6,
          status: 'approved',
          sort: 'createdAt',
          order: 'desc'
        });
        
        if (response.success) {
          setFeaturedProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load featured products');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setLoading(false);
        console.error('Error fetching featured products:', err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Trusted',
      description: 'All products are verified and insured for your peace of mind.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Quick pickup and delivery service across all major cities.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: CurrencyRupeeIcon,
      title: 'Custom Pricing',
      description: 'Set your own rental price and negotiate with owners.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Driven',
      description: 'Join thousands of satisfied customers in our rental community.',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '5,000+', label: 'Products Available' },
    { number: '50+', label: 'Cities Covered' },
    { number: '99.9%', label: 'Customer Satisfaction' }
  ];

  const testimonials = [
    {
      name: "Kalpan Kaneriya",
      role: "Photographer",
      text: "The camera quality was exceptional and the custom pricing feature helped me get the best deal. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Isha Patel",
      role: "Event Organizer",
      text: "Rented DJ equipment for my event. Everything worked perfectly and the booking process was seamless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Dax Sharma",
      role: "Content Creator",
      text: "Great platform for renting tech equipment. The custom pricing feature is a game-changer!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
            darkMode ? 'bg-[#a47148]' : 'bg-[#bc8a5f]'
          }`} />
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
            darkMode ? 'bg-[#8b5e34]' : 'bg-[#d4a276]'
          }`} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 ${
            darkMode ? 'bg-[#bc8a5f]' : 'bg-[#a47148]'
          }`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h1
            className={`text-5xl md:text-7xl font-bold mb-8 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}
            variants={itemVariants}
          >
            Rent Everything You Need
            <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${
              darkMode 
                ? 'from-[#bc8a5f] to-[#f3d5b5]' 
                : 'from-[#8b5e34] to-[#6f4518]'
            }`}>
              At Your Own Price
            </span>
          </motion.h1>
          
          <motion.p
            className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}
            variants={itemVariants}
          >
            India's first peer-to-peer rental marketplace with custom pricing. 
            From cameras to camping gear, rent anything at prices you set.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mb-12">
            <SearchBar />
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <Link 
              to="/products" 
              className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
              }`}
            >
              🔍 Browse Products
            </Link>
            <Link 
              to="/categories" 
              className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                  : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
              }`}
            >
              📂 Explore Categories
            </Link>
            <Link 
              to="/how-it-works" 
              className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
              }`}
            >
              <PlayCircleIcon className="h-6 w-6 inline mr-2" />
              How It Works
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-[#603808]/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Why Choose RentalHub?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Experience the future of rentals with our innovative platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-8 text-center backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {feature.description}
                </p>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Trusted by Thousands
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Numbers that speak for our success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`text-5xl font-bold mb-2 ${
                  darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-lg font-medium ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-[#603808]/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className={`text-4xl font-bold mb-4 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Featured Products
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
              }`}>
                Discover our most popular rental items
              </p>
            </div>
            <Link 
              to="/products" 
              className={`font-bold text-lg transition-colors flex items-center ${
                darkMode 
                  ? 'text-[#bc8a5f] hover:text-[#f3d5b5]' 
                  : 'text-[#8b5e34] hover:text-[#6f4518]'
              }`}
            >
              View All Products
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts && featuredProducts.length > 0 ? (
                featuredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="text-6xl mb-6">📦</div>
                  <p className={`text-xl mb-6 ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    No featured products available at the moment.
                  </p>
                  <Link 
                    to="/products/new" 
                    className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                      darkMode
                        ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                        : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                    }`}
                  >
                    List Your First Product
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              How RentalHub Works
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Simple steps to rent anything you need
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Browse & Select",
                description: "Explore thousands of products or search for specific items. Filter by category, location, and price range.",
                icon: "🔍",
                color: "from-blue-500 to-cyan-600"
              },
              {
                step: "02",
                title: "Set Your Price",
                description: "Choose your rental dates and set a custom price. Negotiate directly with product owners for the best deals.",
                icon: "💰",
                color: "from-purple-500 to-violet-600"
              },
              {
                step: "03",
                title: "Pay & Enjoy",
                description: "Secure payment through Stripe, get your product delivered, and enjoy your rental experience.",
                icon: "🎉",
                color: "from-green-500 to-emerald-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative p-8 text-center backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {step.step}
                </div>
                <div className="text-5xl mb-6 mt-4">{step.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-lg ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-[#603808]/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              What Our Users Say
            </h2>
            <p className={`text-xl ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Real experiences from our community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className={`font-bold text-lg ${
                      darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                    }`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                    }`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                
                <p className={`text-lg italic ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className={`p-12 rounded-3xl backdrop-blur-sm border shadow-2xl ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Ready to Start Renting?
            </h2>
            <p className={`text-xl mb-10 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Join thousands of satisfied customers and experience the future of rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/signup" 
                className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                🚀 Get Started Free
              </Link>
              <Link 
                to="/products/new" 
                className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                📦 List Your Product
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;