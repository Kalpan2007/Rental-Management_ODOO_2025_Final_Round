import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const FAQ = () => {
  const { darkMode } = useTheme();
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How does the rental process work?",
      answer: "The rental process is simple: 1) Browse our products and select what you need, 2) Choose your rental dates, 3) Complete the booking and payment, 4) Pick up your item on the start date, 5) Return it on the end date. We handle all the logistics to make it hassle-free."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets. We also support Stripe and Razorpay for secure online payments. All payments are processed securely and you'll receive a receipt immediately after payment."
    },
    {
      question: "What happens if I damage a rented item?",
      answer: "We understand accidents happen. Minor wear and tear is expected and covered. For significant damage, we'll assess the situation and may charge a repair fee. We recommend treating rented items as if they were your own. Our insurance covers most scenarios."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental period if the item is available. Simply contact us at least 24 hours before your scheduled return date. We'll check availability and adjust your booking accordingly. Additional charges will apply for the extended period."
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your booking up to 24 hours before the start date for a full refund. Cancellations within 24 hours may incur a small fee. We understand emergencies happen, so please contact us immediately if you need to cancel."
    },
    {
      question: "How do I know if an item is available?",
      answer: "Our real-time availability system shows you exactly when items are available. When you select dates, we automatically check availability and prevent double bookings. You can also contact us directly to confirm availability for specific dates."
    },
    {
      question: "What if I need to return an item early?",
      answer: "Early returns are welcome! Contact us to arrange an early return. We'll adjust your charges based on the actual rental period. Please note that we don't provide refunds for early returns, but we do offer credits for future rentals."
    },
    {
      question: "Do you deliver and pick up items?",
      answer: "Yes, we offer delivery and pickup services for an additional fee. Delivery is available within a 50-mile radius of our location. We'll coordinate with you to arrange convenient delivery and pickup times."
    },
    {
      question: "What should I do if an item doesn't work properly?",
      answer: "If you encounter any issues with a rented item, contact us immediately. We'll either replace it with a working model or provide a refund. All our items are tested before rental, but we understand issues can arise during use."
    },
    {
      question: "Can I rent items for business events?",
      answer: "Absolutely! We offer special rates and packages for business events, weddings, and large gatherings. Contact us in advance to discuss your needs and we'll create a custom quote for you."
    },
    {
      question: "How do I become a verified renter?",
      answer: "To become a verified renter, complete your profile with valid identification and payment information. We may require additional verification for high-value items. Verified renters get priority booking and access to premium items."
    },
    {
      question: "What are your operating hours?",
      answer: "Our customer service is available Monday through Friday, 9 AM to 6 PM. Pickup and return times can be arranged outside these hours for an additional fee. We're also available 24/7 through our online platform for bookings and support."
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to common questions about our rental service
          </p>
        </div>

        {/* FAQ Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  openItems.has(index) ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <span className="font-medium text-lg">{item.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className={`mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  support@rentalhub.com
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;