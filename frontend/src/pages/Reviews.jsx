import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  StarIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const Reviews = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const orderId = searchParams.get('orderId');

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      rating: 5,
      title: '',
      comment: '',
      wouldRecommend: true
    }
  });

  const rating = watch('rating');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Mock reviews data
        const mockReviews = [
          {
            _id: '1',
            orderId: 'order1',
            product: {
              _id: 'p1',
              name: 'Professional DSLR Camera',
              imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'
            },
            rating: 5,
            title: 'Excellent Camera Quality!',
            comment: 'The camera was in perfect condition and delivered exactly what I needed for my photoshoot. Highly recommend!',
            wouldRecommend: true,
            createdAt: '2024-01-18T10:00:00Z',
            photos: []
          },
          {
            _id: '2',
            orderId: 'order2',
            product: {
              _id: 'p2',
              name: 'DJ Equipment Set',
              imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
            },
            rating: 4,
            title: 'Great for Parties',
            comment: 'Good quality sound system. Setup was easy and the owner was very helpful.',
            wouldRecommend: true,
            createdAt: '2024-01-23T15:30:00Z',
            photos: []
          }
        ];
        
        setReviews(mockReviews);
        
        // If orderId is provided, show review form
        if (orderId) {
          setShowReviewForm(true);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [orderId]);

  const onSubmit = (data) => {
    const newReview = {
      _id: Date.now().toString(),
      orderId: orderId || 'new-order',
      product: {
        _id: 'new-product',
        name: 'Sample Product',
        imageUrl: 'https://via.placeholder.com/400x300'
      },
      ...data,
      createdAt: new Date().toISOString(),
      photos: []
    };

    if (editingReview) {
      setReviews(reviews.map(review => 
        review._id === editingReview._id ? { ...review, ...data } : review
      ));
      toast.success('Review updated successfully');
      setEditingReview(null);
    } else {
      setReviews([newReview, ...reviews]);
      toast.success('Review submitted successfully');
    }

    setShowReviewForm(false);
    reset();
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    reset({
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      wouldRecommend: review.wouldRecommend
    });
    setShowReviewForm(true);
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review._id !== reviewId));
      toast.success('Review deleted successfully');
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange?.(star) : undefined}
            className={interactive ? "hover:scale-110 transition-transform" : ""}
            disabled={!interactive}
          >
            <StarIcon 
              className={`h-6 w-6 ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300 dark:text-gray-600'
              } ${interactive ? 'cursor-pointer' : ''}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StarIcon className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">My Reviews</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Share your rental experiences and help others
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowReviewForm(true);
                setEditingReview(null);
                reset();
              }}
              className="btn-primary flex items-center"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Write Review
            </button>
          </div>
        </motion.div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">
              {editingReview ? 'Edit Review' : 'Write a Review'}
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex items-center space-x-4">
                  {renderStars(rating, true, (newRating) => {
                    reset({ ...watch(), rating: newRating });
                  })}
                  <span className="text-sm text-gray-500">
                    {rating === 1 ? 'Poor' : 
                     rating === 2 ? 'Fair' : 
                     rating === 3 ? 'Good' : 
                     rating === 4 ? 'Very Good' : 'Excellent'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Summarize your experience"
                  {...register('title', { required: 'Title is required' })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  rows="4"
                  className="input w-full"
                  placeholder="Share your experience with this rental..."
                  {...register('comment', { required: 'Review comment is required' })}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="wouldRecommend"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('wouldRecommend')}
                />
                <label htmlFor="wouldRecommend" className="ml-2 block text-sm">
                  I would recommend this product to others
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setEditingReview(null);
                    reset();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={review.product.imageUrl} 
                      alt={review.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{review.product.name}</h3>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{review.comment}</p>

                {review.wouldRecommend && (
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                  }`}>
                    ✓ Recommends this product
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <StarIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">No Reviews Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Complete some rentals and share your experiences with others
            </p>
            <Link to="/my-bookings" className="btn-primary">
              View My Bookings
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reviews;