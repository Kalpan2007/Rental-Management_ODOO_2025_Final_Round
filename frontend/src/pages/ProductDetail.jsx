import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById, checkProductAvailability } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import StripeCheckout from '../components/StripeCheckout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  HeartIcon,
  ShareIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        
        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.error || 'Failed to load product details');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRentNow = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to book this product');
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }

    setShowCheckout(true);
  };

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to add favorites');
      return;
    }
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.category} on RentalHub!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const checkAvailability = async () => {
    if (!product) return;
    
    setCheckingAvailability(true);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      
      const response = await checkProductAvailability(product._id, { startDate, endDate });
      if (response.success) {
        setAvailability(response.data);
        toast.success(response.data.isAvailable ? 'Product is available!' : 'Product is not available for selected dates');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Failed to check availability');
    } finally {
      setCheckingAvailability(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode 
          ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
          : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-6">😞</div>
          <h2 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            Product Not Found
          </h2>
          <p className="text-red-500 mb-8 text-lg">{error || 'The product you are looking for does not exist'}</p>
          <Link 
            to="/products" 
            className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5 inline mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && product.owner && (user._id === product.owner._id || user._id === product.owner);

  return (
    <>
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/products" 
            className={`flex items-center transition-colors font-medium ${
              darkMode 
                ? 'text-[#bc8a5f] hover:text-[#f3d5b5]' 
                : 'text-[#8b5e34] hover:text-[#6f4518]'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border ${
          darkMode 
            ? 'bg-[#603808]/90 border-[#8b5e34]/50' 
            : 'bg-white/90 border-[#d4a276]/30'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <motion.div 
              className="relative h-96 lg:h-auto overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={product.images?.[currentImageIndex] || product.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format'} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full backdrop-blur-md transition-all ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  onClick={shareProduct}
                  className="p-3 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-md transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShareIcon className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md ${
                  product.status === 'approved' 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  {product.status === 'approved' ? '✅ Available' : '❌ Unavailable'}
                </span>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              className="p-8 lg:p-12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Product Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    darkMode 
                      ? 'bg-[#8b5e34]/30 text-[#e7bc91]' 
                      : 'bg-[#f3d5b5]/50 text-[#6f4518]'
                  }`}>
                    {product.category}
                  </span>
                  {product.rating && (
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className={`text-sm ${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                
                <h1 className={`text-4xl font-bold mb-6 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {product.name}
                </h1>
                
                {/* Price */}
                <div className="mb-6">
                  <div className={`text-4xl font-bold ${
                    darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                  }`}>
                    ₹{product.basePrice || product.price || 100}
                    <span className={`text-xl font-normal ml-2 ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      per day
                    </span>
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                  }`}>
                    💡 Suggested price • You can set your own price during checkout
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  Description
                </h3>
                <p className={`text-lg leading-relaxed ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {product.description}
                </p>
              </div>

              {/* Product Details Grid */}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {product.owner && (
                    <div className={`p-4 rounded-xl ${
                      darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <UserCircleIcon className={`h-8 w-8 ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`} />
                        <div>
                          <p className={`text-sm font-medium ${
                            darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                          }`}>
                            Owner
                          </p>
                          <p className={`font-semibold ${
                            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                          }`}>
                            {typeof product.owner === 'object' ? product.owner.name : 'Product Owner'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <MapPinIcon className={`h-8 w-8 ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                        }`}>
                          Location
                        </p>
                        <p className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          {product.location || 'Mumbai, India'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className={`h-8 w-8 ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                        }`}>
                          Condition
                        </p>
                        <p className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          {product.condition || 'Excellent'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <TruckIcon className={`h-8 w-8 ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                        }`}>
                          Delivery
                        </p>
                        <p className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          Available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    Features & Specifications
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.features.map((feature, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                        }`}
                      >
                        <span className={`font-medium ${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {feature.name}
                        </span>
                        <span className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {!isOwner && product.status === 'approved' ? (
                  <>
                    <motion.button
                      onClick={handleRentNow}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                        darkMode
                          ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                          : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CreditCardIcon className="h-6 w-6 inline mr-3" />
                      Rent Now with Custom Price
                    </motion.button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={checkAvailability}
                        disabled={checkingAvailability}
                        className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                          darkMode
                            ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                            : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                        }`}
                      >
                        {checkingAvailability ? (
                          <>
                            <LoadingSpinner size="small" />
                            <span className="ml-2">Checking...</span>
                          </>
                        ) : (
                          <>
                            <CalendarDaysIcon className="h-5 w-5 inline mr-2" />
                            Check Availability
                          </>
                        )}
                      </button>
                      
                      <button
                        className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                          darkMode
                            ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                            : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
                        }`}
                      >
                        <ChatBubbleLeftRightIcon className="h-5 w-5 inline mr-2" />
                        Contact Owner
                      </button>
                    </div>
                  </>
                ) : isOwner ? (
                  <div className={`p-6 rounded-xl text-center border-2 ${
                    darkMode 
                      ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                      : 'bg-[#f3d5b5]/30 border-[#d4a276]/30'
                  }`}>
                    <p className={`font-bold text-lg mb-4 ${
                      darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                    }`}>
                      🎉 This is your product!
                    </p>
                    <Link 
                      to={`/products/edit/${product._id}`}
                      className={`inline-block py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                        darkMode
                          ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                          : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                      }`}
                    >
                      ✏️ Edit Product
                    </Link>
                  </div>
                ) : (
                  <div className={`p-6 rounded-xl text-center border-2 ${
                    darkMode 
                      ? 'bg-red-900/20 border-red-800' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <p className="text-red-600 dark:text-red-400 font-bold text-lg">
                      {product.status !== 'approved' 
                        ? '⏳ Product is pending approval' 
                        : '❌ Currently not available for rent'
                      }
                    </p>
                  </div>
                )}

                {!isAuthenticated && (
                  <p className={`text-center text-sm ${
                    darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                  }`}>
                    <Link 
                      to="/login" 
                      className={`font-semibold hover:underline ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`}
                    >
                      🔐 Log in
                    </Link>
                    {' '}to rent this product and set custom prices
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rental Terms */}
          <motion.div
            className={`p-8 rounded-2xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              <ShieldCheckIcon className="h-6 w-6 mr-2" />
              Rental Terms
            </h3>
            <ul className={`space-y-3 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
            }`}>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Minimum rental period: 1 day
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Custom pricing available
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Secure payment via Stripe
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Pickup and delivery available
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                Insurance coverage included
              </li>
            </ul>
          </motion.div>

          {/* Safety & Trust */}
          <motion.div
            className={`p-8 rounded-2xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              <ShieldCheckIcon className="h-6 w-6 mr-2" />
              Safety & Trust
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-green-900/20' : 'bg-green-50'
              }`}>
                <p className={`font-semibold text-green-600 dark:text-green-400 mb-2`}>
                  ✅ Verified Product
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  This product has been verified by our team
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <p className={`font-semibold text-blue-600 dark:text-blue-400 mb-2`}>
                  🛡️ Damage Protection
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  Comprehensive damage protection included
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Owner */}
          <motion.div
            className={`p-8 rounded-2xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
              Contact Owner
            </h3>
            
            {product.owner && typeof product.owner === 'object' && (
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                  darkMode ? 'bg-[#8b5e34] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                }`}>
                  {product.owner.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className={`font-bold text-lg ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    {product.owner.name}
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    ⭐ Verified Owner
                  </p>
                </div>
              </div>
            )}
            
            <button
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                darkMode
                  ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                  : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
              }`}
            >
              💬 Send Message
            </button>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Stripe Checkout Modal */}
    {showCheckout && (
      <StripeCheckout 
        product={product} 
        onClose={() => setShowCheckout(false)} 
      />
    )}
    </>
  );
};

export default ProductDetail;