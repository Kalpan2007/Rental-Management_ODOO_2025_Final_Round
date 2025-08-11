import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaBook, FaComments, FaPhone, FaEnvelope, FaVideo, FaSearch, FaArrowRight, FaExclamationCircle, FaClock, FaCheckCircle } from 'react-icons/fa';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      title: 'Quick Help Guides',
      icon: FaBook,
      description: 'Browse through our comprehensive guides and tutorials',
      links: [
        { text: 'Getting Started Guide', url: '/guides/getting-started' },
        { text: 'Rental Process Overview', url: '/guides/rental-process' },
        { text: 'Payment & Billing FAQ', url: '/guides/payments' },
        { text: 'Returns & Refunds', url: '/guides/returns' }
      ]
    },
    {
      title: 'Live Support',
      icon: FaHeadset,
      description: 'Connect with our support team in real-time',
      links: [
        { text: 'Start Live Chat', url: '/chat' },
        { text: 'Schedule Video Call', url: '/video-support' },
        { text: 'Call Support Center', url: '/phone-support' },
        { text: 'Email Support Team', url: '/email-support' }
      ]
    },
    {
      title: 'Community Forum',
      icon: FaComments,
      description: 'Join discussions and share experiences with other users',
      links: [
        { text: 'Browse Discussions', url: '/forum' },
        { text: 'Ask a Question', url: '/forum/ask' },
        { text: 'Popular Topics', url: '/forum/popular' },
        { text: 'Community Guidelines', url: '/forum/guidelines' }
      ]
    }
  ];

  const commonIssues = [
    {
      title: 'Account Access Issues',
      icon: FaExclamationCircle,
      description: 'Problems with login, password reset, or account verification',
      priority: 'High',
      resolution: '5-10 minutes'
    },
    {
      title: 'Payment Processing',
      icon: FaExclamationCircle,
      description: 'Issues with payments, refunds, or billing inquiries',
      priority: 'High',
      resolution: '10-15 minutes'
    },
    {
      title: 'Rental Modifications',
      icon: FaClock,
      description: 'Changes to rental duration, item swaps, or cancellations',
      priority: 'Medium',
      resolution: '15-20 minutes'
    },
    {
      title: 'Technical Support',
      icon: FaCheckCircle,
      description: 'Platform navigation, feature usage, or technical difficulties',
      priority: 'Normal',
      resolution: '20-30 minutes'
    }
  ];

  const contactMethods = [
    {
      icon: FaPhone,
      title: 'Phone Support',
      description: '24/7 dedicated phone support for urgent issues',
      action: 'Call Now',
      availability: '24/7',
      link: '/phone-support'
    },
    {
      icon: FaEnvelope,
      title: 'Email Support',
      description: 'Detailed support for complex inquiries',
      action: 'Send Email',
      availability: '24-48 hours response',
      link: '/email-support'
    },
    {
      icon: FaVideo,
      title: 'Video Support',
      description: 'Schedule a video call with our support team',
      action: 'Schedule Call',
      availability: 'Business hours',
      link: '/video-support'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaHeadset className="mx-auto h-16 w-16 text-purple-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-xl text-slate-300">
            We're here to help you with any questions or issues you may have
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help articles, topics, or FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700/80 transition-colors duration-300"
            >
              <category.icon className="h-10 w-10 text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-3">
                {category.title}
              </h2>
              <p className="text-slate-300 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.url}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <FaArrowRight className="h-4 w-4 mr-2" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common Issues */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Common Issues & Resolution Time</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIssues.map((issue, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700/80 transition-colors duration-300"
              >
                <issue.icon className="h-8 w-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{issue.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{issue.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-400">Resolution: {issue.resolution}</span>
                  <span className={`px-2 py-1 rounded ${issue.priority === 'High' ? 'bg-red-500/20 text-red-400' : issue.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                    {issue.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700/80 transition-colors duration-300"
              >
                <method.icon className="h-8 w-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-slate-300 text-sm mb-4">{method.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">{method.availability}</span>
                  <Link
                    to={method.link}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {method.action}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Additional Resources</h2>
          <p className="text-slate-300 mb-6">
            Explore our comprehensive knowledge base and community resources
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/faq"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Browse FAQ
            </Link>
            <Link
              to="/tutorials"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Video Tutorials
            </Link>
            <Link
              to="/documentation"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;