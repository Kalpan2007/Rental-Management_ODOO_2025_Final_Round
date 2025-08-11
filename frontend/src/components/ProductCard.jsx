import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  
  // Return null if product is undefined
  if (!product) {
    return null;
  }
  
  const {
    _id,
    name,
    price,
    images,
    category,
    availability,
    owner,
    status
  } = product;

  const isOwner = user && owner && user._id && owner === user._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <img
          src={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!availability && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full">
              Currently Unavailable
            </span>
          </div>
        )}
        {status === 'pending' && (
          <div className="absolute top-2 right-2">
            <span className="text-white font-semibold px-3 py-1 bg-yellow-500 rounded-full text-sm">
              Pending Approval
            </span>
          </div>
        )}
        {status === 'rejected' && (
          <div className="absolute top-2 right-2">
            <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full text-sm">
              Rejected
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">{name}</h3>
          <span className="text-primary-600 dark:text-primary-400 font-bold">
            ${typeof price === 'number' ? price.toFixed(2) : price}/day
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {category}
          </span>
          
          <div className="flex items-center space-x-2">
            {isOwner && (
              <Link
                to={`/products/edit/${_id}`}
                className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium"
              >
                Edit
              </Link>
            )}
            <Link
              to={`/products/${_id}`}
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;