import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createBooking } from '../../api/bookings';
import { createPaymentIntent } from '../../api/payments';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe outside of component to avoid recreating it on renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});

const BookingModal = ({ product, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [clientSecret, setClientSecret] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  // Calculate total days and price
  const calculateDays = () => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Minimum 1 day
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return days * product.price;
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onSubmitUserDetails = async (data) => {
    try {
      setIsProcessing(true);
      
      // Create booking
      const bookingPayload = {
        productId: product._id,
        startDate,
        endDate,
        totalPrice: calculateTotal(),
        customerDetails: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        }
      };
      
      const bookingResponse = await createBooking(bookingPayload);
      setBookingData(bookingResponse.data);
      
      // Create payment intent
      const paymentResponse = await createPaymentIntent({
        amount: calculateTotal() * 100, // Convert to cents for Stripe
        bookingId: bookingResponse.data._id
      });
      
      setClientSecret(paymentResponse.data.clientSecret);
      setStep(3); // Move to payment step
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
      console.error('Booking creation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={handleClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay 
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black opacity-30" 
            />
            
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
            >
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                {step === 1 && 'Select Dates'}
                {step === 2 && 'Enter Your Details'}
                {step === 3 && 'Payment'}
                {step === 4 && 'Booking Confirmed'}
              </Dialog.Title>
              
              <div className="mt-4">
                {/* Step 1: Date Selection */}
                {step === 1 && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Rental Period
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        minDate={new Date()}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Booking Summary</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Product:</span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                        <span className="font-medium">{calculateDays()} days</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Price per day:</span>
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: User Details */}
                {step === 2 && (
                  <form onSubmit={handleSubmit(onSubmitUserDetails)}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          {...register('firstName')}
                          className="input w-full"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className="input w-full"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="input w-full"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="input w-full"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Booking Summary</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Product:</span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                        <span className="font-medium">{calculateDays()} days</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-secondary"
                        disabled={isProcessing}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Continue to Payment'}
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Step 3: Payment */}
                {step === 3 && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm 
                      bookingData={bookingData} 
                      onSuccess={() => setStep(4)}
                      onBack={() => setStep(2)}
                    />
                  </Elements>
                )}
                
                {/* Step 4: Confirmation */}
                {step === 4 && (
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Your booking has been successfully confirmed. You will receive a confirmation email shortly.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="btn-primary w-full"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step navigation for step 1 */}
                {step === 1 && (
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// Payment Form Component
const PaymentForm = ({ bookingData, onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(undefined, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${bookingData.customerDetails.firstName} ${bookingData.customerDetails.lastName}`,
          email: bookingData.customerDetails.email,
        },
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      onSuccess();
    } else {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-md bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment Summary</h4>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">Product:</span>
          <span className="font-medium">{bookingData.productName}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">Duration:</span>
          <span className="font-medium">
            {new Date(bookingData.startDate).toLocaleDateString()} - {new Date(bookingData.endDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <span>Total:</span>
          <span>${bookingData.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary"
          disabled={processing}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn-primary"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
};

export default BookingModal;