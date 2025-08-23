import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import StripeCheckout from './StripeCheckout';
import { PencilIcon, EyeIcon, CalendarDaysIcon, TagIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product, index = 0 }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Return null if product is undefined
  if (!product) {
    return null;
  }
  
  const {
    _id,
    name,
    basePrice,
    price,
    images,
    imageUrl,
    category,
    availability,
    owner,
    status,
    location,
    rating
  } = product;

  const isOwner = user && owner && user._id && owner === user._id;
  const productPrice = basePrice || price || 100;

  // Enhanced image handling with multiple fallbacks
  const getImageUrl = () => {
    if (images && images.length > 0) {
      return images[0];
    }
    if (imageUrl) {
      return imageUrl;
    }
    return `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format`;
  };

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
        text: 'Pending Review',
        icon: '⏳'
      },
      rejected: {
        bg: 'bg-gradient-to-r from-red-500 to-pink-500',
        text: 'Rejected',
        icon: '❌'
      },
      approved: {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        text: 'Available',
        icon: '✅'
      }
    };
    return configs[status] || configs.approved;
  };

  const statusConfig = getStatusConfig(status);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
        darkMode 
          ? 'bg-[#603808]/80 border-[#8b5e34]/50 shadow-lg shadow-[#583101]/30 hover:shadow-[#583101]/50' 
          : 'bg-white/90 border-[#d4a276]/30 shadow-lg shadow-[#bc8a5f]/20 hover:shadow-[#bc8a5f]/30'
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-[#f3d5b5] to-[#e7bc91]">
        <motion.img
          src={getImageUrl()}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability Overlay */}
        {availability === false && (
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🚫</div>
              <span className="text-white font-semibold px-4 py-2 bg-red-500/90 rounded-full backdrop-blur-sm">
                Currently Unavailable
              </span>
            </div>
          </motion.div>
        )}
        
        {/* Status Badge */}
        {status && status !== 'approved' && (
          <motion.div 
            className="absolute top-3 right-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <span className={`${statusConfig.bg} text-white font-semibold px-3 py-1.5 rounded-full text-sm backdrop-blur-sm shadow-lg flex items-center gap-1`}>
              <span>{statusConfig.icon}</span>
              {statusConfig.text}
            </span>
          </motion.div>
        )}

        {/* Price Badge */}
        <motion.div 
          className="absolute top-3 left-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className={`backdrop-blur-md rounded-xl px-3 py-2 ${
            darkMode 
              ? 'bg-[#8b5e34]/80 border border-[#bc8a5f]/30' 
              : 'bg-white/80 border border-[#d4a276]/30'
          }`}>
            <div className={`text-lg font-bold ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              ₹{typeof productPrice === 'number' ? productPrice.toFixed(2) : productPrice}
            </div>
            <div className={`text-xs ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              per day
            </div>
          </div>
        </motion.div>

        {/* Rating if available */}
        {rating && (
          <motion.div 
            className="absolute bottom-3 left-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className={`backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1 ${
              darkMode 
                ? 'bg-[#8b5e34]/80 border border-[#bc8a5f]/30' 
                : 'bg-white/80 border border-[#d4a276]/30'
            }`}>
              <span className="text-yellow-400">⭐</span>
              <span className={`text-sm font-semibold ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                {rating.toFixed(1)}
              </span>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <motion.h3 
          className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${
            darkMode 
              ? 'text-[#ffedd8] group-hover:from-[#f3d5b5] group-hover:to-[#ffedd8]' 
              : 'text-[#583101] group-hover:from-[#8b5e34] group-hover:to-[#6f4518]'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {name}
        </motion.h3>
        
        {/* Category and Location */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
            darkMode 
              ? 'bg-[#8b5e34]/30 text-[#e7bc91]' 
              : 'bg-[#f3d5b5]/50 text-[#6f4518]'
          }`}>
            <TagIcon className="w-4 h-4" />
            {category}
          </div>
          
          {location && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
              darkMode 
                ? 'bg-[#6f4518]/30 text-[#d4a276]' 
                : 'bg-[#e7bc91]/50 text-[#8b5e34]'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          {/* Primary Action */}
          {(availability !== false) && (status === 'approved' || !status) && !isOwner ? (
            <button
              onClick={() => setShowCheckout(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Rent Now
            </button>
          ) : (
            <Link
              to={`/products/${_id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              <EyeIcon className="w-4 h-4" />
              View Details
            </Link>
          )}
          
          {/* Owner Edit Button */}
          {isOwner && (
            <Link
              to={`/products/edit/${_id}`}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border-2 ${
                darkMode
                  ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                  : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
              }`}
            >
              <PencilIcon className="w-4 h-4" />
              Edit
            </Link>
          )}
        </div>

        {/* Available Dates (if any) */}
        {(availability !== false) && (
          <motion.div 
            className={`mt-4 pt-4 border-t flex items-center gap-2 text-sm ${
              darkMode 
                ? 'border-[#8b5e34]/30 text-[#e7bc91]' 
                : 'border-[#d4a276]/30 text-[#6f4518]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Available for booking</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />
          </motion.div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 rounded-2xl ${
          darkMode 
            ? 'shadow-[inset_0_0_20px_rgba(188,138,95,0.1)]' 
            : 'shadow-[inset_0_0_20px_rgba(139,94,52,0.1)]'
        }`} />
      </div>
    </motion.div>

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

export default ProductCard;