import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../data/mockData';
import { 
  StarIcon, 
  LocationMarkerIcon, 
  CalendarIcon,
  ArrowLeftIcon,
  CheckIcon,
  XIcon
} from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await mockApi.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBookNow = () => {
    navigate(`/booking/${product.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Products</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card padding="none" className="overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </Card>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-violet-500'
                      : 'border-transparent hover:border-slate-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-slate-400 text-lg">{product.description}</p>
            </div>

            {/* Rating & Location */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{product.rating}</span>
                  <span className="text-slate-400">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-400">
                <LocationMarkerIcon className="w-4 h-4" />
                <span>{product.location}</span>
              </div>
            </div>

            {/* Pricing */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Per Day</p>
                    <p className="text-2xl font-bold text-white">{formatPrice(product.pricePerDay)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Per Week</p>
                    <p className="text-xl font-bold text-violet-300">{formatPrice(product.pricePerWeek)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Per Month</p>
                    <p className="text-xl font-bold text-purple-300">{formatPrice(product.pricePerMonth)}</p>
                  </div>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Security Deposit</span>
                    <span className="text-white font-semibold">{formatPrice(product.deposit)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Availability Status */}
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {product.availability ? (
                    <>
                      <CheckIcon className="w-6 h-6 text-green-400" />
                      <span className="text-green-300 font-medium">Available for Rent</span>
                    </>
                  ) : (
                    <>
                      <XIcon className="w-6 h-6 text-red-400" />
                      <span className="text-red-300 font-medium">Currently Unavailable</span>
                    </>
                  )}
                </div>
                <span className="text-slate-400 text-sm">By {product.owner}</span>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.availability ? (
                <Button
                  onClick={handleBookNow}
                  size="lg"
                  className="w-full"
                  icon={<CalendarIcon className="w-5 h-5" />}
                >
                  Book Now
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  disabled
                >
                  Currently Unavailable
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                icon={<HeartIcon className="w-5 h-5" />}
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Specifications */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Specifications</h3>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">{key}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Features */}
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6">Key Features</h3>
            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;