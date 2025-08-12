import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary-50'}`}>
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-accent-600">RentalHub</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We're revolutionizing the way people access and share resources, making quality products 
              accessible to everyone through our innovative rental platform.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 md:p-12`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  At RentalHub, we believe that access to quality products shouldn't be limited by ownership. 
                  Our mission is to create a sustainable, community-driven platform where people can easily 
                  rent what they need, when they need it.
                </p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We're committed to reducing waste, promoting the sharing economy, and making premium 
                  products accessible to everyone through affordable rental options.
                </p>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-32 h-32 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 text-center`}>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We promote the sharing economy to reduce waste and environmental impact while making 
                resources more accessible to everyone.
              </p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 text-center`}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We build strong communities where people can trust each other, share resources, 
                and create meaningful connections through our platform.
              </p>
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 text-center`}>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We maintain high standards for all products on our platform, ensuring customers 
                receive reliable, well-maintained items for their needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 md:p-12`}>
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  RentalHub was founded in 2023 with a simple vision: to make quality products 
                  accessible to everyone without the burden of ownership. What started as a small 
                  local initiative has grown into a thriving community of renters and lenders.
                </p>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Our founders noticed that many people were buying expensive items they only 
                  used occasionally, leading to wasted money and resources. They envisioned a 
                  platform where people could share these items, benefiting both the environment 
                  and their wallets.
                </p>
              </div>
              <div>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Today, RentalHub serves thousands of customers across multiple cities, offering 
                  everything from power tools and camping gear to party supplies and professional 
                  equipment. Our community continues to grow as more people discover the benefits 
                  of the sharing economy.
                </p>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We're proud to be part of the movement toward a more sustainable, connected, 
                  and accessible future. Join us in building a community where sharing is caring, 
                  and access is unlimited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "David Kim",
                role: "Head of Customer Success",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 text-center`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-600 mb-2">10,000+</div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-600 mb-2">5,000+</div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Products Available</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-600 mb-2">50,000+</div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Successful Rentals</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-600 mb-2">25+</div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cities Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
