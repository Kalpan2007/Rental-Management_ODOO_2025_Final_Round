import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon,
  PlusCircleIcon,
  FireIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Community = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        setLoading(true);
        // Mock community posts data
        const mockPosts = [
          {
            _id: '1',
            author: {
              name: 'Kalpan Kaneriya',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              verified: true
            },
            content: 'Just rented an amazing DSLR camera for my wedding shoot! The custom pricing feature helped me negotiate a great deal. Highly recommend this platform! 📸✨',
            images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'],
            likes: 45,
            comments: 12,
            shares: 8,
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            tags: ['photography', 'wedding', 'camera'],
            liked: false
          },
          {
            _id: '2',
            author: {
              name: 'Isha Patel',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
              verified: true
            },
            content: 'Pro tip: Always check the product condition before finalizing your rental. I had a great experience with the DJ equipment I rented last week! 🎵🎉',
            images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'],
            likes: 32,
            comments: 8,
            shares: 5,
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            tags: ['dj', 'party', 'tips'],
            liked: true
          },
          {
            _id: '3',
            author: {
              name: 'Dax Sharma',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              verified: false
            },
            content: 'Looking for gaming console recommendations for a weekend gaming party. Any suggestions from the community? 🎮',
            images: [],
            likes: 18,
            comments: 15,
            shares: 3,
            timestamp: new Date(Date.now() - 10800000), // 3 hours ago
            tags: ['gaming', 'party', 'recommendations'],
            liked: false
          }
        ];
        
        setPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching community posts:', error);
        setLoading(false);
      }
    };

    fetchCommunityPosts();
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: FireIcon },
    { id: 'recent', label: 'Recent', icon: ClockIcon },
    { id: 'popular', label: 'Popular', icon: StarIcon }
  ];

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <UserGroupIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              👥 Community
            </h1>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Connect with fellow renters, share experiences, and discover amazing deals
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`flex rounded-2xl p-2 shadow-xl border-2 ${
            darkMode 
              ? 'bg-[#6f4518] border-[#8b5e34]' 
              : 'bg-[#f3d5b5] border-[#d4a276]'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center ${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'bg-[#a47148] text-[#ffedd8] shadow-lg'
                      : 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                    : darkMode
                    ? 'text-[#f3d5b5] hover:bg-[#8b5e34]/30'
                    : 'text-[#6f4518] hover:bg-[#e7bc91]/50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Create Post Button */}
        {user && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className={`w-full p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-lg text-left ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50 hover:bg-[#8b5e34]/30' 
                : 'bg-white/80 border-[#d4a276]/30 hover:bg-[#f3d5b5]/50'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  darkMode ? 'bg-[#8b5e34] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                }`}>
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className={`${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    Share your rental experience with the community...
                  </p>
                </div>
                <PlusCircleIcon className={`h-6 w-6 ${
                  darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                }`} />
              </div>
            </button>
          </motion.div>
        )}

        {/* Community Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              className={`p-6 rounded-2xl backdrop-blur-sm border ${
                darkMode 
                  ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                  : 'bg-white/80 border-[#d4a276]/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Post Header */}
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-bold ${
                      darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                    }`}>
                      {post.author.name}
                    </h4>
                    {post.author.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                  }`}>
                    {formatTimeAgo(post.timestamp)}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className={`text-lg leading-relaxed ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {post.content}
                </p>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          darkMode 
                            ? 'bg-[#8b5e34]/30 text-[#e7bc91]' 
                            : 'bg-[#f3d5b5]/50 text-[#6f4518]'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={post.images[0]} 
                    alt="Post image"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-600">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.liked 
                        ? 'text-red-500' 
                        : darkMode 
                        ? 'text-[#e7bc91] hover:text-red-400' 
                        : 'text-[#6f4518] hover:text-red-500'
                    }`}
                  >
                    <HeartIcon className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  
                  <button className={`flex items-center space-x-2 transition-colors ${
                    darkMode 
                      ? 'text-[#e7bc91] hover:text-[#bc8a5f]' 
                      : 'text-[#6f4518] hover:text-[#8b5e34]'
                  }`}>
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  
                  <button className={`flex items-center space-x-2 transition-colors ${
                    darkMode 
                      ? 'text-[#e7bc91] hover:text-[#bc8a5f]' 
                      : 'text-[#6f4518] hover:text-[#8b5e34]'
                  }`}>
                    <ShareIcon className="h-5 w-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
                
                <button className={`text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-[#bc8a5f] hover:text-[#f3d5b5]' 
                    : 'text-[#8b5e34] hover:text-[#6f4518]'
                }`}>
                  View Comments
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Stats */}
        <motion.div
          className={`mt-12 p-8 rounded-2xl backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            📊 Community Stats
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Members', value: '12,500+', icon: '👥' },
              { label: 'Posts This Week', value: '1,250', icon: '📝' },
              { label: 'Success Stories', value: '3,400+', icon: '🎉' },
              { label: 'Cities Connected', value: '50+', icon: '🌍' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  darkMode ? 'bg-[#8b5e34]/20' : 'bg-[#f3d5b5]/30'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className={`text-2xl font-bold mb-1 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Community CTA */}
        <motion.div
          className={`mt-12 p-8 rounded-2xl backdrop-blur-sm border text-center ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            🚀 Join Our Growing Community
          </h3>
          <p className={`text-lg mb-8 ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Share your rental experiences, get tips, and connect with like-minded people
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link 
                  to="/signup" 
                  className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    darkMode
                      ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                      : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                  }`}
                >
                  🎯 Join Community
                </Link>
                <Link 
                  to="/login" 
                  className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    darkMode
                      ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                      : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  }`}
                >
                  🔐 Sign In
                </Link>
              </>
            ) : (
              <button className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
              }`}>
                <PlusCircleIcon className="h-6 w-6 inline mr-2" />
                Create New Post
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;