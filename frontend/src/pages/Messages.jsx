import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Messages = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        // Mock conversations data
        const mockConversations = [
          {
            id: '1',
            participant: {
              name: 'John Doe',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            },
            lastMessage: 'Is the camera still available for next week?',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            unread: true,
            productName: 'Professional Camera'
          },
          {
            id: '2',
            participant: {
              name: 'Sarah Wilson',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
            },
            lastMessage: 'Thank you for the quick delivery!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            unread: false,
            productName: 'DJ Equipment Set'
          }
        ];
        
        setConversations(mockConversations);
        if (mockConversations.length > 0) {
          setSelectedConversation(mockConversations[0]);
          loadMessages(mockConversations[0].id);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const loadMessages = (conversationId) => {
    // Mock messages data
    const mockMessages = [
      {
        id: '1',
        senderId: 'other',
        content: 'Hi! I\'m interested in renting your camera for next week.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        senderName: 'John Doe'
      },
      {
        id: '2',
        senderId: user._id,
        content: 'Hello! Yes, it\'s available. What dates were you thinking?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        senderName: user.name
      },
      {
        id: '3',
        senderId: 'other',
        content: 'I need it from Monday to Wednesday. Is that possible?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        senderName: 'John Doe'
      },
      {
        id: '4',
        senderId: user._id,
        content: 'Perfect! Those dates are available. You can book it through the product page.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        senderName: user.name
      },
      {
        id: '5',
        senderId: 'other',
        content: 'Is the camera still available for next week?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        senderName: 'John Doe'
      }
    ];
    
    setMessages(mockMessages);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      senderId: user._id,
      content: newMessage,
      timestamp: new Date(),
      senderName: user.name
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden h-[600px]`}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-1/3 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                  Messages
                </h2>
              </div>
              
              <div className="overflow-y-auto h-full">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      loadMessages(conversation.id);
                    }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-600' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={conversation.participant.avatar}
                        alt={conversation.participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{conversation.participant.name}</p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(conversation.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-primary-600 mt-1">
                          Re: {conversation.productName}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConversation.participant.avatar}
                        alt={selectedConversation.participant.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{selectedConversation.participant.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          About: {selectedConversation.productName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user._id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user._id
                              ? 'bg-primary-600 text-white'
                              : darkMode
                              ? 'bg-gray-700 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user._id 
                              ? 'text-primary-100' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 input"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="btn-primary p-2 disabled:opacity-50"
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {conversations.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">No Messages Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start renting products to connect with other users
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Messages;