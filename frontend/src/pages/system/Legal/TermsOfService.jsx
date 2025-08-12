import { useTheme } from '../../../contexts/ThemeContext';

const TermsOfService = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Last updated: December 2023
          </p>
        </div>

        {/* Content */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                By accessing and using RentalHub's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                RentalHub provides an online platform that connects people who want to rent items with people who want to rent out items. We are not responsible for the actual rental transaction between users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To use our services, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>You are responsible for safeguarding your account credentials</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>You may not create multiple accounts for the same person</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Rental Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">For Renters:</h3>
                  <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>You must return items in the same condition as received</li>
                    <li>You are responsible for any damage beyond normal wear and tear</li>
                    <li>Late returns may incur additional fees</li>
                    <li>You must provide valid identification and payment information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">For Lenders:</h3>
                  <ul className={`list-disc pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>You must provide accurate descriptions of your items</li>
                    <li>Items must be in good working condition</li>
                    <li>You are responsible for maintaining your items</li>
                    <li>You must be available for pickup and return arrangements</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Payment Terms</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All payments are processed securely through our payment partners. RentalHub charges a service fee on all transactions. Payment is due at the time of booking confirmation.
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Rental fees are calculated based on the agreed rental period</li>
                <li>Security deposits may be required for high-value items</li>
                <li>Refunds are processed according to our refund policy</li>
                <li>Late fees apply for overdue returns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Prohibited Activities</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You agree not to use our service to:
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Rent illegal or prohibited items</li>
                <li>Provide false or misleading information</li>
                <li>Harass or abuse other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to circumvent our payment system</li>
                <li>Use our service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Liability and Insurance</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                RentalHub provides insurance coverage for eligible rentals. However, users are encouraged to have their own insurance coverage for valuable items.
              </p>
              <ul className={`list-disc pl-6 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>RentalHub is not liable for damage to rented items beyond our insurance coverage</li>
                <li>Users are responsible for their own safety when using rented items</li>
                <li>RentalHub is not liable for indirect, incidental, or consequential damages</li>
                <li>Our liability is limited to the amount paid for the rental service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Privacy and Data Protection</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our website. Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RentalHub operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>Email: legal@rentalhub.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Rental Street, Suite 456, New York, NY 10001</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;