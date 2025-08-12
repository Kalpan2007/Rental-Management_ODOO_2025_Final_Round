import { useTheme } from '../../../contexts/ThemeContext';

const PrivacyPolicy = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Last updated: December 2023
          </p>
        </div>

        {/* Content */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                At RentalHub, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you 
                use our rental platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                  <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Name and contact information (email, phone number)</li>
                    <li>Address and location information</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                    <li>Government-issued identification for verification</li>
                    <li>Profile information and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
                  <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Rental history and preferences</li>
                    <li>Search queries and browsing behavior</li>
                    <li>Device information and IP addresses</li>
                    <li>Communication records with other users</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We use your information to:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Provide and maintain our rental services</li>
                <li>Process payments and manage transactions</li>
                <li>Verify user identities and prevent fraud</li>
                <li>Facilitate communication between renters and lenders</li>
                <li>Send important updates and notifications</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information in the following circumstances:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><strong>With other users:</strong> Basic profile information for rental transactions</li>
                <li><strong>Service providers:</strong> Payment processors, hosting providers, and analytics services</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure payment processing through trusted partners</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We retain your personal information for as long as necessary to provide our services and 
                comply with legal obligations. This typically includes:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Account information: Until you delete your account</li>
                <li>Transaction records: 7 years for tax and legal purposes</li>
                <li>Communication records: 2 years for service improvement</li>
                <li>Analytics data: 3 years for business insights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You have the following rights regarding your personal information:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We use cookies and similar technologies to:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Remember your preferences and settings</li>
                <li>Analyze website usage and performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Third-Party Services</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our platform may contain links to third-party websites and services. We are not responsible 
                for the privacy practices of these external sites. We encourage you to review their privacy 
                policies before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our services are not intended for children under 18 years of age. We do not knowingly 
                collect personal information from children under 18. If you believe we have collected 
                information from a child under 18, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. International Transfers</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement 
                appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Changes to This Policy</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may update this privacy policy from time to time. We will notify you of any material 
                changes by email or through our website. Your continued use of our services after such 
                changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p><strong>Email:</strong> privacy@rentalhub.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Rental Street, Suite 456, New York, NY 10001</p>
                <p><strong>Data Protection Officer:</strong> dpo@rentalhub.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;