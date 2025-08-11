import { useState, useEffect } from 'react';
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

  // Calculate total price when dates or product changes
  useEffect(() => {
    if (product && startDate && endDate) {
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      if (days <= 0) {
        setTotalPrice(0);
        return;
      }
      
      // Get the base price from either basePrice or first pricing rule
      const basePrice = product.basePrice || (product.pricingRules?.[0]?.price) || 0;
      let finalPrice = basePrice * days;

      // Check if there are pricing rules
      if (product.pricingRules && product.pricingRules.length > 0) {
        const matchingRule = product.pricingRules.find(rule => 
          rule.durationType === 'day' || 
          (rule.durationType === 'week' && days >= 7) || 
          (rule.durationType === 'month' && days >= 30)
        );
        
        if (matchingRule && matchingRule.price) {
          if (matchingRule.durationType === 'day') {
            finalPrice = matchingRule.price * days;
          } else if (matchingRule.durationType === 'week') {
            finalPrice = matchingRule.price * Math.ceil(days / 7);
          } else if (matchingRule.durationType === 'month') {
            finalPrice = matchingRule.price * Math.ceil(days / 30);
          }
        }
      }

      // Apply seasonal pricing if applicable
      if (product.seasonalPricing && product.seasonalPricing.length > 0) {
        const applicableSeason = product.seasonalPricing.find(season => {
          const seasonStart = new Date(season.startDate);
          const seasonEnd = new Date(season.endDate);
          return startDate >= seasonStart && endDate <= seasonEnd;
        });

        if (applicableSeason) {
          finalPrice = applicableSeason.price * days;
        }
      }

      // Apply discounts if applicable
      if (product.discounts && product.discounts.length > 0) {
        const applicableDiscount = product.discounts.find(discount => {
          const discountStart = discount.startDate ? new Date(discount.startDate) : null;
          const discountEnd = discount.endDate ? new Date(discount.endDate) : null;
          const meetsDateCriteria = (!discountStart || startDate >= discountStart) && 
                                  (!discountEnd || endDate <= discountEnd);
          const meetsDurationCriteria = !discount.minimumDuration || days >= discount.minimumDuration;
          return meetsDateCriteria && meetsDurationCriteria;
        });

        if (applicableDiscount) {
          if (applicableDiscount.type === 'percentage') {
            finalPrice = finalPrice * (1 - applicableDiscount.value / 100);
          } else if (applicableDiscount.type === 'fixed') {
            finalPrice = finalPrice - applicableDiscount.value;
          }
        }
      }

      setTotalPrice(Math.max(0, finalPrice)); // Ensure price is never negative
    }
  }, [product, startDate, endDate]);

  const handleCheckAvailability = async () => {
    // Reset availability state
    setIsAvailable(null);
    
    if (!startDate || !endDate) {
      toast.error('Please select start and end dates');
      return;
    }

    // Ensure dates are valid
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedStartDate = new Date(startDate);
    selectedStartDate.setHours(0, 0, 0, 0);
    
    const selectedEndDate = new Date(endDate);
    selectedEndDate.setHours(0, 0, 0, 0);

    if (selectedStartDate < today) {
      toast.error('Start date cannot be in the past');
      return;
    }

    if (selectedStartDate >= selectedEndDate) {
      toast.error('End date must be after start date');
      return;
    }

    const diffTime = Math.abs(selectedEndDate - selectedStartDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 90) {  // Assuming max rental period is 90 days
      toast.error('Maximum rental period is 90 days');
      return;
    }

    try {
      setCheckingAvailability(true);
      const response = await checkProductAvailability(id, {
        startDate: selectedStartDate.toISOString(),
        endDate: selectedEndDate.toISOString()
      });
      
      if (response.success) {
        const isAvail = response.data?.isAvailable || false;
        setIsAvailable(isAvail);
        
        if (isAvail) {
          toast.success('Product is available for selected dates!');
        } else {
          toast.error('Product is not available for selected dates');
        }
      } else {
        toast.error(response.error || 'Failed to check availability');
        setIsAvailable(false);
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      toast.error('Failed to check availability. Please try again.');
      setIsAvailable(false);
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

    if (!user) {
      toast.error('User information not available');
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

    // Validate totalPrice
    const calculatedTotalPrice = parseFloat(totalPrice.toFixed(2));
    if (isNaN(calculatedTotalPrice) || calculatedTotalPrice <= 0) {
      toast.error('Invalid price calculation. Please try again.');
      return;
    }

    try {
      // Validate dates
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      if (startDateTime >= endDateTime) {
        toast.error('End date must be after start date');
        return;
      }

      // Format dates to match the expected format (start of day)
      startDateTime.setHours(0, 0, 0, 0);
      endDateTime.setHours(0, 0, 0, 0);

      const bookingData = {
        productId: id,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        totalPrice: calculatedTotalPrice,
        endUser: {
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }
        // userId is not needed as the backend will get it from the JWT token
      };

      const response = await createBooking(bookingData);
      
      if (response.success) {
        toast.success('Booking created successfully!');
        navigate(`/my-bookings/${response.data._id}`);
      } else {
        toast.error(response.error || 'Failed to create booking. Please try again.');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      if (err.response?.status === 400) {
        toast.error(err.response.data.message || 'Invalid booking request');
      } else if (err.response?.status === 403) {
        toast.error('You are not authorized to make this booking');
      } else {
        toast.error('Failed to create booking. Please try again later.');
      }
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
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-6">{error || 'Product not found'}</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/products" className="text-primary-600 hover:text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          {/* Product Image */}
          <motion.div 
            className="h-96 lg:h-auto overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/600x400?text=No+Image+Available'} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
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