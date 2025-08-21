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
  ShareIcon
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
          <h2 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            Error
          </h2>
          <p className="text-red-500 mb-6">{error || 'Product not found'}</p>
          <Link 
            to="/products" 
            className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && product.owner && user._id === product.owner._id;

  return (
    <>
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className={`flex items-center transition-colors ${
              darkMode 
                ? 'text-[#bc8a5f] hover:text-[#f3d5b5]' 
                : 'text-[#8b5e34] hover:text-[#6f4518]'
            }`}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border ${
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
                src={product.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format'} 
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

              {/* Favorite & Share Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full backdrop-blur-md transition-all ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={shareProduct}
                  className="p-3 rounded-full bg-white/80 text-gray-700 hover:bg-white backdrop-blur-md transition-all"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
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
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    product.status === 'approved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {product.status === 'approved' ? '✅ Available' : '❌ Unavailable'}
                  </span>
                </div>
                
                <h1 className={`text-4xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {product.name}
                </h1>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className={`text-3xl font-bold ${
                    darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                  }`}>
                    ₹{product.basePrice || 100}
                    <span className={`text-lg font-normal ml-2 ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      per day
                    </span>
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                  }`}>
                    Suggested price • You can negotiate
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

              {/* Product Details */}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.owner && (
                    <div>
                      <p className={`text-sm font-medium ${
                        darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                      }`}>
                        Owner
                      </p>
                      <p className={`${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        {product.owner.name}
                      </p>
                    </div>
                  )}
                  {product.location && (
                    <div>
                      <p className={`text-sm font-medium ${
                        darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                      }`}>
                        Location
                      </p>
                      <p className={`flex items-center ${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {product.location}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                    }`}>
                      Condition
                    </p>
                    <p className={`${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      {product.condition || 'Excellent'}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                    }`}>
                      Availability
                    </p>
                    <p className={`flex items-center ${
                      product.availability 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        product.availability ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {product.availability ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {!isOwner && product.status === 'approved' && product.availability ? (
                  <motion.button
                    onClick={handleRentNow}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                      darkMode
                        ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] shadow-lg hover:shadow-xl'
                        : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] shadow-lg hover:shadow-xl'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCardIcon className="h-6 w-6 inline mr-3" />
                    Rent Now with Custom Price
                  </motion.button>
                ) : isOwner ? (
                  <div className={`p-4 rounded-xl text-center ${
                    darkMode 
                      ? 'bg-[#8b5e34]/20 border border-[#bc8a5f]/30' 
                      : 'bg-[#f3d5b5]/30 border border-[#d4a276]/30'
                  }`}>
                    <p className={`font-medium ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      This is your product
                    </p>
                    <Link 
                      to={`/products/edit/${product._id}`}
                      className={`inline-block mt-2 py-2 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                        darkMode
                          ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                          : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                      }`}
                    >
                      Edit Product
                    </Link>
                  </div>
                ) : (
                  <div className={`p-4 rounded-xl text-center ${
                    darkMode 
                      ? 'bg-red-900/20 border border-red-800' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                      {product.status !== 'approved' 
                        ? 'Product is pending approval' 
                        : 'Currently not available for rent'
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
                      Log in
                    </Link>
                    {' '}to rent this product
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <motion.div
              className={`p-6 rounded-xl backdrop-blur-sm border ${
                darkMode 
                  ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                  : 'bg-white/80 border-[#d4a276]/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li 
                    key={index}
                    className={`flex items-center ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <span>{feature.name}: {feature.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Rental Terms */}
          <motion.div
            className={`p-6 rounded-xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Rental Terms
            </h3>
            <ul className={`space-y-2 text-sm ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
            }`}>
              <li>• Minimum rental period: 1 day</li>
              <li>• Security deposit may be required</li>
              <li>• Late return charges apply</li>
              <li>• Product must be returned in same condition</li>
              <li>• Pickup and delivery available</li>
            </ul>
          </motion.div>

          {/* Owner Information */}
          {product.owner && (
            <motion.div
              className={`p-6 rounded-xl backdrop-blur-sm border ${
                darkMode 
                  ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                  : 'bg-white/80 border-[#d4a276]/30'
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className={`text-xl font-bold mb-4 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Owner Information
              </h3>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  darkMode ? 'bg-[#8b5e34] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                }`}>
                  {product.owner.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className={`font-semibold ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    {product.owner.name}
                  </p>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    Verified Owner
                  </p>
                </div>
              </div>
            </motion.div>
          )}
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
          </motion.div>

          {/* Product Details */}
          <motion.div 
            className="p-6 lg:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {product.pricingRules && product.pricingRules.length > 0 && (
                  <div className="text- text-brown-600 dark:text-brown-500">
                    {product.pricingRules.map((rule, index) => (
                      <p key={index}>
                        ${rule.price} / {rule.durationType} 
                        {rule.minimumDuration > 1 ? ` (min ${rule.minimumDuration} ${rule.durationType}s)` : ''}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.status === 'approved' ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="mb-6">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium">Category</h3>
                  <p>{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Condition</h3>
                  <p>{product.condition}</p>
                </div>
                {product.brand && (
                  <div>
                    <h3 className="text-sm font-medium">Brand</h3>
                    <p>{product.brand}</p>
                  </div>
                )}
                {product.model && (
                  <div>
                    <h3 className="text-sm font-medium">Model</h3>
                    <p>{product.model}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Section */}
            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-4">Book This Product</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Total Price</p>
                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <button 
                  onClick={handleCheckAvailability}
                  disabled={checkingAvailability}
                  className="btn-secondary"
                >
                  {checkingAvailability ? (
                    <>
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Checking...</span>
                    </>
                  ) : 'Check Availability'}
                </button>
              </div>
              
              <button 
                onClick={handleBookNow}
                disabled={!isAvailable || checkingAvailability}
                className={`w-full btn-primary ${(!isAvailable && isAvailable !== null) || checkingAvailability ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Book Now
              </button>
              
              {!isAuthenticated && (
                <p className="text-sm mt-2 text-center">You need to <Link to="/login" className="text-primary-600 hover:underline">log in</Link> to book this product</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products would go here */}
      </div>
    </div>
  );
};

export default ProductDetail;