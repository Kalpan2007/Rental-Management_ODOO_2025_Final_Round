import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getProductById, checkProductAvailability } from '../api/products';
import { createBooking } from '../api/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 3)));
  const [isAvailable, setIsAvailable] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Default placeholder image
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDQwMFYyNTBIMjAwVjE1MFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB4PSIyNzUiIHk9IjE3NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOSAzSDVDMy44OSAzIDMgMy44OSAzIDVWMTlDMyAyMC4xMSAzLjg5IDIxIDUgMjFIMTlDMjAuMTEgMjEgMjEgMjAuMTEgMjEgMTlWNUMyMSAzLjg5IDIwLjExIDMgMTkgM1pNMTkgNUg1VjE5SDE5VjVaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xNCAxMUMxNC45MyAxMSAxNS42NyAxMC4yNiAxNS42NyA5LjMzQzE1LjY3IDguNCAxNC45MyA3LjY3IDE0IDcuNjdDMTMuMDcgNy42NyAxMi4zMyA4LjQgMTIuMzMgOS4zM0MxMi4zMyAxMC4yNiAxMy4wNyAxMSAxNCAxMVoiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTE0IDEzQzExLjI0IDEzIDkgMTUuMjQgOSAxOEgxOUMxOSAxNS4yNCAxNi43NiAxMyAxNCAxM1oiIGZpbGw9IiM5QjlCQTAiLz4KPC9zdmc+Cjx0ZXh0IHg9IjMwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2QjZGNzEiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';

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
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Memoized price calculation
  const calculateTotalPrice = useMemo(() => {
    if (!product || !startDate || !endDate) return 0;
    
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    let finalPrice = (product.basePrice || (product.pricingRules?.[0]?.price) || 0) * days;

    // Apply pricing rules
    if (product.pricingRules?.length) {
      const matchingRule = product.pricingRules.find(rule => 
        rule.durationType === 'day' || 
        (rule.durationType === 'week' && days >= 7) || 
        (rule.durationType === 'month' && days >= 30)
      );
      
      if (matchingRule?.price) {
        if (matchingRule.durationType === 'day') {
          finalPrice = matchingRule.price * days;
        } else if (matchingRule.durationType === 'week') {
          finalPrice = matchingRule.price * Math.ceil(days / 7);
        } else if (matchingRule.durationType === 'month') {
          finalPrice = matchingRule.price * Math.ceil(days / 30);
        }
      }
    }

    // Apply seasonal pricing
    if (product.seasonalPricing?.length) {
      const applicableSeason = product.seasonalPricing.find(season => {
        const seasonStart = new Date(season.startDate);
        const seasonEnd = new Date(season.endDate);
        return startDate >= seasonStart && endDate <= seasonEnd;
      });
      if (applicableSeason) {
        finalPrice = applicableSeason.price * days;
      }
    }

    // Apply discounts
    if (product.discounts?.length) {
      const applicableDiscount = product.discounts.find(discount => {
        const discountStart = discount.startDate ? new Date(discount.startDate) : null;
        const discountEnd = discount.endDate ? new Date(discount.endDate) : null;
        return (
          (!discountStart || startDate >= discountStart) &&
          (!discountEnd || endDate <= discountEnd) &&
          (!discount.minimumDuration || days >= discount.minimumDuration)
        );
      });
      
      if (applicableDiscount) {
        finalPrice = applicableDiscount.type === 'percentage'
          ? finalPrice * (1 - applicableDiscount.value / 100)
          : finalPrice - applicableDiscount.value;
      }
    }

    return Math.max(0, finalPrice);
  }, [product, startDate, endDate]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice);
  }, [calculateTotalPrice]);

  const handleCheckAvailability = async () => {
    setIsAvailable(null);
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
    const selectedEndDate = new Date(endDate).setHours(0, 0, 0, 0);

    if (selectedStartDate < today) {
      toast.error('Start date cannot be in the past');
      return;
    }
    if (selectedStartDate >= selectedEndDate) {
      toast.error('End date must be after start date');
      return;
    }
    if (Math.ceil((selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24)) > 90) {
      toast.error('Maximum rental period is 90 days');
      return;
    }

    try {
      setCheckingAvailability(true);
      const response = await checkProductAvailability(id, {
        startDate: new Date(selectedStartDate).toISOString(),
        endDate: new Date(selectedEndDate).toISOString()
      });
      
      setIsAvailable(response.success && response.data?.isAvailable);
      toast[response.success && response.data?.isAvailable ? 'success' : 'error'](
        response.success && response.data?.isAvailable 
          ? 'Product is available for selected dates!' 
          : response.error || 'Product is not available for selected dates'
      );
    } catch (err) {
      console.error('Error checking availability:', err);
      setIsAvailable(false);
      toast.error('Failed to check availability. Please try again.');
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to book this product');
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }
    if (isAvailable === null) {
      toast.warning('Please check availability before booking');
      return;
    }
    if (!isAvailable) {
      toast.error('Product is not available for selected dates');
      return;
    }
    if (totalPrice <= 0) {
      toast.error('Invalid price calculation. Please try again.');
      return;
    }

    try {
      setBookingLoading(true);
      const response = await createBooking({
        productId: id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        totalPrice: parseFloat(totalPrice.toFixed(2))
      });
      
      if (response.success) {
        toast.success('Booking created successfully!');
        navigate(`/my-bookings`);
      } else {
        throw new Error(response.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create booking. Please try again later.';
      toast.error(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-50 dark:bg-gray-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-50 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-text-900 dark:text-text-50">Error</h2>
          <p className="text-error-600 mb-6">{error || 'Product not found'}</p>
          <Link to="/products" className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-text-50 rounded-lg transition-colors">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-text-50' : 'bg-primary-50 text-text-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/products" className="inline-flex items-center mb-6 text-accent-600 hover:text-accent-700">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </Link>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          <motion.div 
            className="h-80 lg:h-full overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.imageUrl || placeholderImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = placeholderImage;
              }}
            />
          </motion.div>

          <motion.div 
            className="p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                {product.pricingRules?.length > 0 && (
                  <div className="text-accent-600 dark:text-accent-500">
                    {product.pricingRules.map((rule, index) => (
                      <p key={index}>
                        ${rule.price} / {rule.durationType}
                        {rule.minimumDuration > 1 ? ` (min ${rule.minimumDuration} ${rule.durationType}s)` : ''}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.status === 'approved' 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-error-100 text-error-800'
              }`}>
                {product.status === 'approved' ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-text-700 dark:text-text-300">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-text-600 dark:text-text-400">Category</h3>
                  <p>{product.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-600 dark:text-text-400">Condition</h3>
                  <p>{product.condition}</p>
                </div>
                {product.brand && (
                  <div>
                    <h3 className="text-sm font-medium text-text-600 dark:text-text-400">Brand</h3>
                    <p>{product.brand}</p>
                  </div>
                )}
                {product.model && (
                  <div>
                    <h3 className="text-sm font-medium text-text-600 dark:text-text-400">Model</h3>
                    <p>{product.model}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-secondary-50'}`}>
              <h2 className="text-xl font-semibold mb-4">Book This Product</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-text-600 dark:text-text-400">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-600 dark:text-text-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-text-600 dark:text-text-400">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-600 dark:text-text-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-text-600 dark:text-text-400">Total Price</p>
                  <p className="text-2xl font-bold text-text-900 dark:text-text-50">${totalPrice.toFixed(2)}</p>
                </div>
                <button 
                  onClick={handleCheckAvailability}
                  disabled={checkingAvailability}
                  className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-text-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={!isAvailable || checkingAvailability || bookingLoading}
                className="w-full px-4 py-2 bg-accent-600 hover:bg-accent-700 text-text-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Creating Booking...</span>
                  </>
                ) : 'Book Now'}
              </button>

              {!isAuthenticated && (
                <p className="text-sm mt-2 text-center text-text-600 dark:text-text-400">
                  You need to <Link to="/login" className="text-accent-600 hover:underline">log in</Link> to book this product
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;