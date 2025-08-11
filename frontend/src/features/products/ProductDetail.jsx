import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import BookingModal from '../bookings/BookingModal';

const ProductDetail = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const {
    name,
    description,
    price,
    images,
    category,
    availability,
    specifications,
  } = product;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${product._id}` } });
      return;
    }
    setIsBookingModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Product Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <div className="relative h-80 rounded-lg overflow-hidden mb-4">
            <img
              src={images && images.length > 0 ? images[currentImage] : 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={name}
              className="w-full h-full object-cover"
            />
            {!availability && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full">
                  Currently Unavailable
                </span>
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          {images && images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden ${index === currentImage ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <img src={image} alt={`${name} - view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {category}
              </span>
              <span className="ml-4 text-xl font-bold text-primary-600 dark:text-primary-400">
                ${typeof price === 'number' ? price.toFixed(2) : price}/day
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>
            
            {specifications && Object.keys(specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Specifications</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(specifications).map(([key, value]) => (
                    <li key={key} className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-8">
              <button
                onClick={handleBookNow}
                disabled={!availability}
                className={`w-full py-3 rounded-md font-medium ${availability ? 'btn-primary' : 'bg-gray-400 text-white cursor-not-allowed'}`}
              >
                {availability ? 'Book Now' : 'Currently Unavailable'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal 
          product={product}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;