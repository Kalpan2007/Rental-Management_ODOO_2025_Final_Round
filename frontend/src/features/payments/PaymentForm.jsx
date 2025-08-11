import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const PaymentForm = ({ amount, onSuccess, onError, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        if (onError) onError(error);
        return;
      }

      // Here you would typically send the payment method ID to your server
      // and create a payment intent or charge the customer
      
      // For demonstration purposes, we'll simulate a successful payment
      toast.success('Payment processed successfully!');
      if (onSuccess) onSuccess(paymentMethod);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      if (onError) onError(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
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
          {error && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">Total Amount:</span>
            <span className="text-lg font-bold">${(amount / 100).toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn-primary w-full flex justify-center items-center"
        >
          {processing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Pay Now'}
        </button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;