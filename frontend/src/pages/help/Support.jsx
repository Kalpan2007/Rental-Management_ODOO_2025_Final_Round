import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const Support = () => {
  const { darkMode } = useTheme();

  const supportOptions = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Mon-Sat: 9AM-8PM IST',
      action: 'Start Chat',
      href: '#',
      color: 'bg-blue-500'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Sat: 9AM-8PM IST',
      action: 'Call Now',
      href: 'tel:+919876543210',
      color: 'bg-green-500'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'Send us detailed questions',
      availability: 'Response within 2 hours',
      action: 'Send Email',
      href: 'mailto:support@rentalhub.com',
      color: 'bg-purple-500'
    },
    {
      icon: VideoCameraIcon,
      title: 'Video Call',
      description: 'Schedule a video consultation',
      availability: 'By appointment',
      action: 'Schedule Call',
      href: '#',
      color: 'bg-red-500'
    }
  ];

  const helpResources = [
    {
      icon: DocumentTextIcon,
      title: 'Help Articles',
      description: 'Browse our comprehensive knowledge base',
      link: '/help/articles'
    },
    {
      icon: BookOpenIcon,
      title: 'User Guide',
      description: 'Step-by-step guides for using our platform',
      link: '/help/guide'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Forum',
      description: 'Connect with other users and share experiences',
      link: '/community'
    }
  ];

  const commonIssues = [
    {
      title: 'Booking Issues',
      description: 'Problems with creating or managing bookings',
      solutions: [
        'Check product availability for your dates',
        'Ensure payment method is valid',
        'Contact support if booking fails'
      ]
    },
    {
      title: 'Payment Problems',
      description: 'Issues with payments or billing',
      solutions: [
        'Verify card details and billing address',
        'Check if your bank allows online transactions',
        'Try a different payment method'
      ]
    },
    {
      title: 'Account Access',
      description: 'Login or account-related issues',
      solutions: [
        'Reset your password using forgot password',
        'Check if email is verified',
        'Clear browser cache and cookies'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ChatBubbleLeftRightIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Support Center</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're here to help you with any questions or issues you might have
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Get Support</h2>
            <p className="text-lg">Choose the best way to reach us</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {option.availability}
                </div>
                <a
                  href={option.href}
                  className="btn-primary w-full"
                >
                  {option.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Self-Help Resources</h2>
            <p className="text-lg">Find answers quickly with our help resources</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpResources.map((resource, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <resource.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                <Link to={resource.link} className="text-primary-600 hover:text-primary-700 font-medium">
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Common Issues</h2>
            <p className="text-lg">Quick solutions to frequent problems</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commonIssues.map((issue, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{issue.description}</p>
                <ul className="space-y-2">
                  {issue.solutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{solution}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`p-8 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'} text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-red-600">Emergency Support</h3>
            <p className="text-lg mb-6">
              For urgent issues during active rentals, contact our emergency support line
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Emergency Hotline: +91 98765 43210
              </a>
              <a
                href="mailto:emergency@rentalhub.com"
                className="bg-red-100 hover:bg-red-200 text-red-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                emergency@rentalhub.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Support;