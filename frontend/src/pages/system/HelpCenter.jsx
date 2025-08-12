import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const HelpCenter = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      articles: [
        {
          title: 'How to create an account',
          content: 'Creating an account is simple. Click the "Sign Up" button, fill in your details, and verify your email address.'
        },
        {
          title: 'How to browse products',
          content: 'Use our search and filter options to find the perfect item. You can search by category, price range, and location.'
        },
        {
          title: 'How to make your first booking',
          content: 'Select your desired dates, review the total price, and complete the payment process to confirm your booking.'
        }
      ]
    },
    {
      id: 'renting',
      title: 'Renting Items',
      icon: '📦',
      articles: [
        {
          title: 'How to rent an item',
          content: 'Browse available items, select your rental dates, and complete the booking process with payment.'
        },
        {
          title: 'Understanding rental fees',
          content: 'Rental fees are calculated based on the duration and item price. Additional fees may apply for delivery or insurance.'
        },
        {
          title: 'Pickup and return process',
          content: 'Coordinate pickup and return times with the item owner. Most items can be picked up and returned at agreed locations.'
        },
        {
          title: 'What happens if I damage an item?',
          content: 'Report any damage immediately. You may be charged for repairs or replacement costs beyond normal wear and tear.'
        }
      ]
    },
    {
      id: 'lending',
      title: 'Lending Items',
      icon: '💰',
      articles: [
        {
          title: 'How to list an item for rent',
          content: 'Create a detailed listing with photos, description, and pricing. Set your availability and pickup/return preferences.'
        },
        {
          title: 'Setting your rental price',
          content: 'Research similar items in your area and set competitive prices. Consider your item\'s condition and demand.'
        },
        {
          title: 'Managing rental requests',
          content: 'Review and respond to rental requests promptly. You can accept, decline, or negotiate terms with potential renters.'
        },
        {
          title: 'Getting paid for rentals',
          content: 'Payments are processed securely through our platform. You\'ll receive payment after the rental period ends.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: '💳',
      articles: [
        {
          title: 'Accepted payment methods',
          content: 'We accept all major credit cards, debit cards, and digital wallets including Stripe and Razorpay.'
        },
        {
          title: 'Understanding service fees',
          content: 'We charge a small service fee on all transactions to cover platform costs and insurance.'
        },
        {
          title: 'Refund policy',
          content: 'Refunds are processed according to our policy. Cancellations made 24+ hours before rental start are fully refunded.'
        },
        {
          title: 'Security deposits',
          content: 'Some items require security deposits. These are held securely and returned after successful rental completion.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: '👤',
      articles: [
        {
          title: 'Updating your profile',
          content: 'Keep your profile information current. This helps build trust with other users and improves your rental experience.'
        },
        {
          title: 'Verification process',
          content: 'Complete identity verification to unlock additional features and build trust with the community.'
        },
        {
          title: 'Privacy settings',
          content: 'Control what information is visible to other users and manage your privacy preferences.'
        },
        {
          title: 'Deleting your account',
          content: 'You can delete your account at any time. Note that this action is permanent and cannot be undone.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: '🛡️',
      articles: [
        {
          title: 'Meeting safely',
          content: 'Meet in public places during daylight hours. Consider meeting at police stations or other safe locations.'
        },
        {
          title: 'Item inspection',
          content: 'Inspect items thoroughly before accepting them. Take photos if needed and report any issues immediately.'
        },
        {
          title: 'Insurance coverage',
          content: 'We provide insurance coverage for eligible rentals. Review the terms and consider additional coverage for valuable items.'
        },
        {
          title: 'Reporting issues',
          content: 'Report any safety concerns, fraud, or inappropriate behavior immediately through our support channels.'
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentCategory = helpCategories.find(cat => cat.id === activeCategory);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to common questions and learn how to make the most of RentalHub
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full p-4 pl-12 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <svg
              className="absolute left-4 top-4 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 sticky top-4`}>
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <nav className="space-y-2">
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                        : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{category.icon}</span>
                      <span className="font-medium">{category.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {searchQuery ? (
              // Search Results
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Search Results</h2>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div key={category.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <span className="mr-3">{category.icon}</span>
                        {category.title}
                      </h3>
                      <div className="space-y-4">
                        {category.articles
                          .filter(article =>
                            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.content.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((article, index) => (
                            <div key={index} className="border-l-4 border-accent-500 pl-4">
                              <h4 className="font-semibold mb-2">{article.title}</h4>
                              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {article.content}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 text-center`}>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      No articles found for "{searchQuery}". Try different keywords or browse our categories.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Category Content
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">{currentCategory?.icon}</span>
                  <h2 className="text-3xl font-bold">{currentCategory?.title}</h2>
                </div>
                <div className="space-y-8">
                  {currentCategory?.articles.map((article, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                        {article.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 text-center`}>
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@rentalhub.com"
                className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center px-6 py-3 border border-accent-600 text-accent-600 dark:text-accent-400 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
