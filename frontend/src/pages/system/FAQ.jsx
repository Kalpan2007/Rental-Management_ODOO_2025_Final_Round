import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaTags, FaUserCircle, FaCreditCard, FaTruck, FaExchangeAlt, FaShieldAlt } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: FaQuestionCircle },
    { id: 'account', name: 'Account & Profile', icon: FaUserCircle },
    { id: 'rental', name: 'Rental Process', icon: FaTruck },
    { id: 'payment', name: 'Payments & Pricing', icon: FaCreditCard },
    { id: 'returns', name: 'Returns & Refunds', icon: FaExchangeAlt },
    { id: 'security', name: 'Security & Privacy', icon: FaShieldAlt }
  ];

  const faqData = [
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your details including email, password, and basic information. Verify your email address through the link we send you, and you\'re ready to start renting!'
    },
    {
      category: 'account',
      question: 'What documents do I need for verification?',
      answer: 'For account verification, you\'ll need: A valid government-issued ID (passport, driver\'s license), Proof of address (utility bill, bank statement), and a clear selfie for photo verification. All documents must be current and not expired.'
    },
    {
      category: 'rental',
      question: 'How does the rental process work?',
      answer: 'The rental process involves: 1) Browsing and selecting your desired items, 2) Choosing rental duration, 3) Adding items to cart, 4) Providing delivery information, 5) Making payment, and 6) Receiving confirmation. You\'ll get updates throughout the process, including delivery tracking.'
    },
    {
      category: 'rental',
      question: 'What is the minimum rental period?',
      answer: 'Our minimum rental period is 24 hours for most items. However, some specialty items may have different minimum durations. The specific minimum rental period is always displayed on the item\'s detail page.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including: Credit/Debit cards (Visa, MasterCard, American Express), Digital wallets (PayPal, Google Pay, Apple Pay), Bank transfers, and Corporate account billing for verified business customers.'
    },
    {
      category: 'payment',
      question: 'How is the security deposit calculated?',
      answer: 'Security deposits are typically 20-30% of the item\'s retail value. The exact amount varies based on the item category, rental duration, and your rental history with us. The deposit is fully refundable upon successful return of the item in its original condition.'
    },
    {
      category: 'returns',
      question: 'What happens if I return an item late?',
      answer: 'Late returns incur additional charges at the daily rental rate plus a late fee. We recommend contacting customer service if you need to extend your rental period. Extensions requested before the due date may avoid late fees.'
    },
    {
      category: 'returns',
      question: 'How do I report damage to a rental item?',
      answer: 'If you notice any damage: 1) Take clear photos of the damage, 2) Report it immediately through your account dashboard or customer service, 3) Fill out the damage report form, 4) Wait for our assessment team to review and contact you with next steps.'
    },
    {
      category: 'security',
      question: 'How do you protect my personal information?',
      answer: 'We employ industry-standard security measures including: Encrypted data storage, Secure payment processing, Regular security audits, Two-factor authentication options, and Strict access controls. Read our Privacy Policy for detailed information.'
    },
    {
      category: 'security',
      question: 'What happens to my data when I delete my account?',
      answer: 'When you delete your account: 1) Personal information is permanently removed within 30 days, 2) Rental history is anonymized, 3) Payment information is deleted immediately, 4) Required legal records are retained as per regulations. You can request a data export before deletion.'
    }
  ];

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqData.filter(faq =>
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaQuestionCircle className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-300">
            Find answers to common questions about our rental service
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeCategory === category.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                <category.icon className="h-5 w-5" />
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700/80 transition-colors duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {expandedQuestions.includes(index) ? (
                  <FaChevronUp className="h-5 w-5 text-blue-500" />
                ) : (
                  <FaChevronDown className="h-5 w-5 text-blue-500" />
                )}
              </button>
              {expandedQuestions.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <FaQuestionCircle className="mx-auto h-12 w-12 text-slate-500 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No matching questions found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-slate-800 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-slate-300 mb-6">
            Our support team is here to help you with any specific questions or concerns
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/support"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Browse Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;