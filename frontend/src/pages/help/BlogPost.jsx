import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  CalendarIcon,
  UserIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const BlogPost = () => {
  const { slug } = useParams();
  const { darkMode } = useTheme();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);

  // Mock blog post data - in real app, this would come from API
  const blogPost = {
    title: '10 Essential Tips for First-Time Renters',
    content: `
      <p>Renting products instead of buying them has become increasingly popular, and for good reason. Whether you're planning a special event, need equipment for a project, or want to try something before buying, renting offers flexibility and cost savings.</p>
      
      <h2>1. Research Before You Rent</h2>
      <p>Before making any rental decision, take time to research the product and the rental company. Read reviews, check ratings, and understand the terms and conditions.</p>
      
      <h2>2. Understand the Rental Agreement</h2>
      <p>Always read the rental agreement carefully. Pay attention to:</p>
      <ul>
        <li>Rental duration and return policies</li>
        <li>Damage and liability clauses</li>
        <li>Late return fees</li>
        <li>Security deposit requirements</li>
      </ul>
      
      <h2>3. Inspect Before Accepting</h2>
      <p>When you receive the rental item, inspect it thoroughly. Document any existing damage with photos and report it immediately to avoid being charged for pre-existing issues.</p>
      
      <h2>4. Handle with Care</h2>
      <p>Treat rental items as if they were your own. Proper care ensures you get your full security deposit back and helps maintain the item for future renters.</p>
      
      <h2>5. Plan for Delivery and Pickup</h2>
      <p>Coordinate delivery and pickup times that work with your schedule. Be available during the scheduled time to avoid additional fees.</p>
      
      <h2>6. Keep Documentation</h2>
      <p>Save all rental documentation, including:</p>
      <ul>
        <li>Rental agreement</li>
        <li>Payment receipts</li>
        <li>Delivery confirmations</li>
        <li>Photos of the item condition</li>
      </ul>
      
      <h2>7. Communicate Proactively</h2>
      <p>If you encounter any issues or need to modify your rental, contact the rental company immediately. Most companies are willing to work with you if you communicate early.</p>
      
      <h2>8. Return on Time</h2>
      <p>Late returns can result in additional fees and may affect your ability to rent in the future. Set reminders to ensure timely returns.</p>
      
      <h2>9. Leave Honest Reviews</h2>
      <p>After your rental experience, leave an honest review. This helps other renters make informed decisions and helps rental companies improve their service.</p>
      
      <h2>10. Build a Relationship</h2>
      <p>If you have a good experience with a rental company, consider building a long-term relationship. Regular customers often receive better rates and priority service.</p>
      
      <h2>Conclusion</h2>
      <p>Renting can be a fantastic way to access products you need without the commitment of ownership. By following these tips, you'll have a smooth and successful rental experience every time.</p>
    `,
    author: 'Kalpan Kaneriya',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'tips',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    tags: ['rental tips', 'beginners guide', 'best practices']
  };

  const relatedPosts = [
    {
      title: 'How to Choose the Right Camera Equipment',
      slug: 'choose-right-camera-equipment',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop'
    },
    {
      title: 'Complete Guide to Audio Equipment Rental',
      slug: 'audio-equipment-rental-guide',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
    },
    {
      title: 'The Future of Sharing Economy',
      slug: 'future-sharing-economy-india',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop'
    }
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          to="/blog"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
              {blogPost.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blogPost.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>
          
          <img 
            src={blogPost.image} 
            alt={blogPost.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
          
          {/* Social Actions */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <HeartIcon className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ShareIcon className="h-5 w-5" />
              <span>Share</span>
            </button>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>12 comments</span>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          className={`prose prose-lg max-w-none ${
            darkMode 
              ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300' 
              : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8">Related Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className={`block rounded-lg overflow-hidden shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } hover:shadow-xl transition-shadow`}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold line-clamp-2">{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;