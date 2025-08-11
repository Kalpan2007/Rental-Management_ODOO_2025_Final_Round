import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../data/mockData';
import { toast } from 'react-toastify';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  UserIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingFlow = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    endUser: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    paymentType: 'full'
  });

  const steps = [
    { id: 1, name: 'Select Dates', icon: CalendarIcon },
    { id: 2, name: 'End User Details', icon: UserIcon },
    { id: 3, name: 'Payment', icon: CreditCardIcon },
    { id: 4, name: 'Confirmation', icon: CheckCircleIcon }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await mockApi.getProduct(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const calculatePrice = () => {
    if (!bookingData.startDate || !bookingData.endDate || !product) return 0;
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return days * product.pricePerDay;
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      const totalAmount = calculatePrice();
      const bookingPayload = {
        productId: parseInt(productId),
        product: product,
        customerId: user.id,
        customerName: user.name,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        endUser: bookingData.endUser,
        totalAmount,
        deposit: product.deposit
      };

      const response = await mockApi.createBooking(bookingPayload);
      toast.success('Booking created successfully!');
      navigate('/my-rentals');
    } catch (error) {
      toast.error('Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(`/products/${productId}`)}
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Product</span>
          </button>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-white' : 'text-slate-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-violet-600' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              {/* Step 1: Select Dates */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Select Rental Dates</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label="Start Date"
                      value={bookingData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      required
                    />
                    <Input
                      type="date"
                      label="End Date"
                      value={bookingData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <h3 className="text-blue-300 font-medium mb-2">Availability Info</h3>
                    <p className="text-slate-400 text-sm">
                      This product is currently available for the selected dates. 
                      Pricing is calculated per day basis.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: End User Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">End User Details</h2>
                  <p className="text-slate-400">
                    Provide details of the person who will be using the rented item.
                  </p>

                  <div className="space-y-4">
                    <Input
                      type="text"
                      label="Full Name"
                      placeholder="Enter end user's name"
                      value={bookingData.endUser.name}
                      onChange={(e) => handleInputChange('endUser.name', e.target.value)}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="tel"
                        label="Phone Number"
                        placeholder="+91 12345 67890"
                        value={bookingData.endUser.phone}
                        onChange={(e) => handleInputChange('endUser.phone', e.target.value)}
                        required
                      />
                      <Input
                        type="email"
                        label="Email Address"
                        placeholder="enduser@example.com"
                        value={bookingData.endUser.email}
                        onChange={(e) => handleInputChange('endUser.email', e.target.value)}
                        required
                      />
                    </div>

                    <Input
                      type="text"
                      label="Address"
                      placeholder="Complete address for delivery/pickup"
                      value={bookingData.endUser.address}
                      onChange={(e) => handleInputChange('endUser.address', e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Payment Options</h2>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentType"
                          value="full"
                          checked={bookingData.paymentType === 'full'}
                          onChange={(e) => handleInputChange('paymentType', e.target.value)}
                          className="text-violet-600 focus:ring-violet-500"
                        />
                        <div>
                          <span className="text-white font-medium">Pay Full Amount</span>
                          <p className="text-slate-400 text-sm">
                            Pay the complete rental amount now
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentType"
                          value="partial"
                          checked={bookingData.paymentType === 'partial'}
                          onChange={(e) => handleInputChange('paymentType', e.target.value)}
                          className="text-violet-600 focus:ring-violet-500"
                        />
                        <div>
                          <span className="text-white font-medium">Pay Deposit Only</span>
                          <p className="text-slate-400 text-sm">
                            Pay security deposit now, remaining on delivery
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <h3 className="text-green-300 font-medium mb-2">Secure Payment</h3>
                    <p className="text-slate-400 text-sm">
                      Your payment is processed securely through our payment gateway.
                      We support all major credit/debit cards and UPI.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircleIcon className="w-10 h-10 text-green-400" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
                    <p className="text-slate-400">
                      Your rental request has been submitted successfully.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button onClick={handleBookingSubmit} size="lg">
                      Complete Booking
                    </Button>
                    <Button variant="ghost" onClick={() => navigate('/my-rentals')}>
                      View My Rentals
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
                  <Button
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    icon={<ArrowLeftIcon className="w-4 h-4" />}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && (!bookingData.startDate || !bookingData.endDate)) ||
                      (currentStep === 2 && (!bookingData.endUser.name || !bookingData.endUser.phone || !bookingData.endUser.email || !bookingData.endUser.address))
                    }
                    icon={<ArrowRightIcon className="w-4 h-4" />}
                  >
                    Next
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-white">{product.name}</h4>
                    <p className="text-sm text-slate-400">₹{product.pricePerDay}/day</p>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4 space-y-2">
                  {bookingData.startDate && bookingData.endDate && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white">
                          {Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))} days
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Rental Amount:</span>
                        <span className="text-white">₹{calculatePrice().toLocaleString()}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Security Deposit:</span>
                    <span className="text-white">₹{product.deposit.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-white border-t border-slate-700 pt-2">
                    <span>Total Amount:</span>
                    <span>₹{(calculatePrice() + product.deposit).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;