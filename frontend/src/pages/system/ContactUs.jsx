import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'rentals', label: 'Rental Services' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone Support',
      details: [
        '+1 (555) 123-4567 - Main',
        '+1 (555) 765-4321 - Support'
      ],
      availability: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: [
        'support@rentalservice.com',
        'info@rentalservice.com'
      ],
      availability: '24/7 Response within 24hrs'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Office Location',
      details: [
        '123 Rental Street',
        'Tech Hub, Suite 456',
        'Innovation City, IC 12345'
      ],
      availability: 'Mon-Fri: 10AM-5PM EST'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
    // Here you would typically make an API call to submit the form data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-slate-300">
            Get in touch with our team for any questions or concerns
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700/80 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <info.icon className="h-6 w-6 text-purple-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">{info.title}</h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-slate-300">{detail}</p>
                  ))}
                  <div className="flex items-center mt-3 text-sm">
                    <FaClock className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-slate-400">{info.availability}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-purple-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              {/* Submit Status */}
              {submitStatus.submitted && (
                <div
                  className={`mt-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                >
                  {submitStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-slate-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            {/* Replace with actual map implementation */}
            <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Map Integration Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;