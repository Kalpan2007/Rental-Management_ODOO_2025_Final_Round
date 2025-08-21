import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  TruckIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const BusinessSolutions = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      // Mock form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Request submitted! Our team will contact you within 24 hours.');
      reset();
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const solutions = [
    {
      title: 'Enterprise Rentals',
      description: 'Bulk equipment rentals for large organizations',
      icon: BuildingOfficeIcon,
      features: [
        'Volume discounts up to 40%',
        'Dedicated account manager',
        'Priority support 24/7',
        'Custom rental agreements',
        'Flexible payment terms'
      ],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Event Management',
      description: 'Complete event equipment solutions',
      icon: UserGroupIcon,
      features: [
        'End-to-end event planning',
        'Equipment delivery & setup',
        'On-site technical support',
        'Emergency backup equipment',
        'Post-event analytics'
      ],
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Construction & Industrial',
      description: 'Heavy machinery and industrial equipment',
      icon: CogIcon,
      features: [
        'Heavy machinery rentals',
        'Certified operators available',
        'Maintenance included',
        'Safety compliance assured',
        'Project-based pricing'
      ],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    {
      title: 'Cost Optimization',
      description: 'Reduce capital expenditure by up to 70%',
      icon: CurrencyRupeeIcon,
      stats: '70% Cost Reduction'
    },
    {
      title: 'Operational Efficiency',
      description: 'Streamlined processes and faster deployment',
      icon: ClockIcon,
      stats: '50% Faster Setup'
    },
    {
      title: 'Risk Management',
      description: 'Comprehensive insurance and liability coverage',
      icon: ShieldCheckIcon,
      stats: '100% Coverage'
    },
    {
      title: 'Scalability',
      description: 'Scale up or down based on business needs',
      icon: ChartBarIcon,
      stats: 'Unlimited Scale'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
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
            <BuildingOfficeIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🏢 Business Solutions
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Comprehensive rental solutions for businesses of all sizes
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Navigation Tabs */}
        <motion.div
          className="flex justify-center mb-12"
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
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'bg-[#a47148] text-[#ffedd8] shadow-lg'
                      : 'bg-[#8b5e34] text-[#ffedd8] shadow-lg'
                    : darkMode
                    ? 'text-[#f3d5b5] hover:bg-[#8b5e34]/30'
                    : 'text-[#6f4518] hover:bg-[#e7bc91]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl p-6 text-center backdrop-blur-sm border ${
                    darkMode 
                      ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                      : 'bg-white/80 border-[#d4a276]/30'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <benefit.icon className={`h-12 w-12 mx-auto mb-4 ${
                    darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                  }`} />
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`mb-4 ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    {benefit.description}
                  </p>
                  <div className={`text-2xl font-bold ${
                    darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                  }`}>
                    {benefit.stats}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'solutions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl overflow-hidden backdrop-blur-sm border ${
                    darkMode 
                      ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                      : 'bg-white/80 border-[#d4a276]/30'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="md:flex">
                    <div className={`md:w-1/3 p-8 bg-gradient-to-r ${solution.color} text-white`}>
                      <solution.icon className="h-16 w-16 mb-6" />
                      <h3 className="text-3xl font-bold mb-4">{solution.title}</h3>
                      <p className="text-xl">{solution.description}</p>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                      <h4 className={`text-xl font-bold mb-6 ${
                        darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                      }`}>
                        Key Features:
                      </h4>
                      <ul className="space-y-3">
                        {solution.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex}
                            className={`flex items-center ${
                              darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                            }`}
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <button className={`mt-6 py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                        darkMode
                          ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                          : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                      }`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'pricing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Starter',
                  price: '₹5,000',
                  period: 'per month',
                  description: 'Perfect for small businesses',
                  features: [
                    'Up to 50 rentals/month',
                    'Basic analytics',
                    'Email support',
                    'Standard delivery'
                  ],
                  popular: false
                },
                {
                  name: 'Professional',
                  price: '₹15,000',
                  period: 'per month',
                  description: 'Best for growing companies',
                  features: [
                    'Unlimited rentals',
                    'Advanced analytics',
                    'Priority support',
                    'Express delivery',
                    'Custom integrations'
                  ],
                  popular: true
                },
                {
                  name: 'Enterprise',
                  price: 'Custom',
                  period: 'pricing',
                  description: 'For large organizations',
                  features: [
                    'Everything in Professional',
                    'Dedicated account manager',
                    'Custom SLA',
                    'White-label solution',
                    'API access'
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-2xl p-8 backdrop-blur-sm border ${
                    plan.popular 
                      ? 'ring-4 ring-yellow-400 scale-105' 
                      : ''
                  } ${
                    darkMode 
                      ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                      : 'bg-white/80 border-[#d4a276]/30'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                    }`}>
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className={`text-4xl font-bold ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`}>
                        {plan.price}
                      </span>
                      <span className={`text-lg ml-2 ${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        {plan.period}
                      </span>
                    </div>
                    <p className={`${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className={`flex items-center ${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                    plan.popular
                      ? darkMode
                        ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                        : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                      : darkMode
                      ? 'border-2 border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                      : 'border-2 border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  }`}>
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
                darkMode 
                  ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                  : 'bg-white/80 border-[#d4a276]/30'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  📞 Get in Touch
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                      }`}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                            : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                        }`}
                        {...register('company', { required: 'Company name is required' })}
                      />
                      {errors.company && (
                        <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                      }`}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                            : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                        }`}
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                      }`}>
                        Email
                      </label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                            : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                        }`}
                        {...register('email', { required: 'Email is required' })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                      }`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                          darkMode
                            ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                            : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                        }`}
                        {...register('phone', { required: 'Phone is required' })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                    }`}>
                      Requirements
                    </label>
                    <textarea
                      rows="4"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                        darkMode
                          ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                          : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                      }`}
                      placeholder="Tell us about your business requirements..."
                      {...register('requirements', { required: 'Requirements are required' })}
                    />
                    {errors.requirements && (
                      <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 disabled:opacity-50 ${
                      darkMode
                        ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                        : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                    }`}
                  >
                    {submitting ? 'Submitting...' : '📤 Submit Request'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}>
                  <h4 className={`text-xl font-bold mb-6 ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    📞 Direct Contact
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className={`h-6 w-6 ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`} />
                      <div>
                        <p className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          Business Hotline
                        </p>
                        <p className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          +91 98765 43210
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className={`h-6 w-6 ${
                        darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                      }`} />
                      <div>
                        <p className={`font-semibold ${
                          darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                        }`}>
                          Business Email
                        </p>
                        <p className={`${
                          darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                        }`}>
                          business@rentalhub.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  darkMode 
                    ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                    : 'bg-white/80 border-[#d4a276]/30'
                }`}>
                  <h4 className={`text-xl font-bold mb-4 ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    ⏰ Business Hours
                  </h4>
                  <div className={`space-y-2 ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BusinessSolutions;