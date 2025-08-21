import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  TicketIcon,
  MegaphoneIcon,
  CameraIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

const Events = () => {
  const { darkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Mock events data
        const mockEvents = [
          {
            _id: '1',
            title: 'Photography Workshop',
            description: 'Learn professional photography techniques with rented equipment',
            date: new Date(Date.now() + 86400000 * 7), // 1 week from now
            location: 'Mumbai, Maharashtra',
            attendees: 45,
            maxAttendees: 50,
            price: 500,
            category: 'Photography',
            image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
            organizer: 'RentalHub Academy',
            featured: true
          },
          {
            _id: '2',
            title: 'DJ Mixing Masterclass',
            description: 'Master the art of DJ mixing with professional equipment',
            date: new Date(Date.now() + 86400000 * 10), // 10 days from now
            location: 'Bangalore, Karnataka',
            attendees: 28,
            maxAttendees: 30,
            price: 750,
            category: 'Audio',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
            organizer: 'Sound Masters',
            featured: false
          },
          {
            _id: '3',
            title: 'Gaming Tournament',
            description: 'Compete in the ultimate gaming championship',
            date: new Date(Date.now() + 86400000 * 14), // 2 weeks from now
            location: 'Delhi, NCR',
            attendees: 120,
            maxAttendees: 128,
            price: 200,
            category: 'Gaming',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
            organizer: 'GameHub India',
            featured: true
          }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const eventCategories = [
    { name: 'Photography', icon: CameraIcon, color: 'from-purple-500 to-violet-600', count: 8 },
    { name: 'Audio & Music', icon: MusicalNoteIcon, color: 'from-green-500 to-emerald-600', count: 6 },
    { name: 'Gaming', icon: '🎮', color: 'from-blue-500 to-cyan-600', count: 4 },
    { name: 'Workshops', icon: '🛠️', color: 'from-orange-500 to-red-600', count: 12 }
  ];

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalendarDaysIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🎪 Events & Workshops
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Join exciting events, workshops, and meetups in the rental community
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Event Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            📂 Event Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-6 text-center text-white bg-gradient-to-r ${category.color} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {typeof category.icon === 'string' ? (
                  <div className="text-4xl mb-4">{category.icon}</div>
                ) : (
                  <category.icon className="h-12 w-12 mx-auto mb-4" />
                )}
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80">{category.count} upcoming events</p>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            🗓️ Upcoming Events
          </h2>
          
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                className={`rounded-2xl overflow-hidden backdrop-blur-sm border hover:shadow-2xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                    {event.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className={`text-2xl font-bold mb-2 ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          {event.title}
                        </h3>
                        <p className={`text-lg mb-4 ${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {event.description}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode 
                          ? 'bg-[#8b5e34]/30 text-[#e7bc91]' 
                          : 'bg-[#f3d5b5]/50 text-[#6f4518]'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <CalendarDaysIcon className={`h-5 w-5 ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`} />
                        <span className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {formatDate(event.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ClockIcon className={`h-5 w-5 ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`} />
                        <span className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {formatTime(event.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className={`h-5 w-5 ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`} />
                        <span className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {event.location}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className={`h-5 w-5 ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`} />
                        <span className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm ${
                          darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                        }`}>
                          Organized by {event.organizer}
                        </p>
                        <p className={`text-2xl font-bold ${
                          darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                        }`}>
                          ₹{event.price}
                        </p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                          darkMode
                            ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                            : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                        }`}>
                          Learn More
                        </button>
                        <button className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                          darkMode
                            ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                            : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                        }`}>
                          <TicketIcon className="h-5 w-5 inline mr-2" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Create Event CTA */}
        <motion.div
          className={`mt-16 p-8 rounded-2xl backdrop-blur-sm border text-center ${
            darkMode 
              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
              : 'bg-white/80 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MegaphoneIcon className={`h-12 w-12 mx-auto mb-4 ${
            darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
          }`} />
          <h3 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            🎯 Host Your Own Event
          </h3>
          <p className={`text-lg mb-8 ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Organize workshops, meetups, and events for the rental community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}>
              📅 Create Event
            </button>
            <Link 
              to="/contact" 
              className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                  : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
              }`}
            >
              💬 Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Events;