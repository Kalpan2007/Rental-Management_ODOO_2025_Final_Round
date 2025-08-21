import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  GiftIcon,
  ShareIcon,
  UserPlusIcon,
  CurrencyRupeeIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const ReferralProgram = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [referralData, setReferralData] = useState({
    referralCode: '',
    totalReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    referralBonus: 100
  });
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        // Mock referral data
        const mockData = {
          referralCode: `RENT${user?.name?.toUpperCase().slice(0, 4) || 'USER'}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
          totalReferrals: 12,
          totalEarnings: 1200,
          pendingEarnings: 300,
          referralBonus: 100
        };

        const mockReferrals = [
          {
            _id: '1',
            friendName: 'Rahul Sharma',
            friendEmail: 'rahul@example.com',
            status: 'completed',
            earnings: 100,
            joinedAt: new Date(Date.now() - 86400000).toISOString(),
            firstBooking: true
          },
          {
            _id: '2',
            friendName: 'Priya Patel',
            friendEmail: 'priya@example.com',
            status: 'pending',
            earnings: 100,
            joinedAt: new Date(Date.now() - 172800000).toISOString(),
            firstBooking: false
          },
          {
            _id: '3',
            friendName: 'Amit Kumar',
            friendEmail: 'amit@example.com',
            status: 'completed',
            earnings: 100,
            joinedAt: new Date(Date.now() - 259200000).toISOString(),
            firstBooking: true
          }
        ];
        
        setReferralData(mockData);
        setReferrals(mockReferrals);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [user]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/signup?ref=${referralData.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const shareViaWhatsApp = () => {
    const message = `Hey! Join RentalHub using my referral code ${referralData.referralCode} and get ₹50 bonus! ${window.location.origin}/signup?ref=${referralData.referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'Join RentalHub and Get ₹50 Bonus!';
    const body = `Hi there!\n\nI'm using RentalHub for all my rental needs and thought you might like it too!\n\nUse my referral code: ${referralData.referralCode}\nOr click this link: ${window.location.origin}/signup?ref=${referralData.referralCode}\n\nYou'll get ₹50 bonus when you sign up!\n\nCheers,\n${user?.name}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GiftIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Referral Program</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Invite friends and earn ₹{referralData.referralBonus} for each successful referral!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Referrals',
              value: referralData.totalReferrals,
              icon: UserPlusIcon,
              color: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Total Earnings',
              value: `₹${referralData.totalEarnings}`,
              icon: CurrencyRupeeIcon,
              color: 'from-green-500 to-green-600'
            },
            {
              title: 'Pending Earnings',
              value: `₹${referralData.pendingEarnings}`,
              icon: ClipboardDocumentIcon,
              color: 'from-yellow-500 to-yellow-600'
            },
            {
              title: 'Bonus per Referral',
              value: `₹${referralData.referralBonus}`,
              icon: GiftIcon,
              color: 'from-purple-500 to-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-r ${stat.color} text-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Code & Sharing */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6">Share & Earn</h3>
            
            {/* Referral Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Referral Code</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={referralData.referralCode}
                  readOnly
                  className={`input flex-1 font-mono text-center text-lg font-bold ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                />
                <button
                  onClick={copyReferralCode}
                  className="btn-secondary p-3"
                  title="Copy Code"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <button
                onClick={copyReferralLink}
                className="w-full btn-primary flex items-center justify-center"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Copy Referral Link
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={shareViaWhatsApp}
                  className="btn-secondary flex items-center justify-center"
                >
                  <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
                  WhatsApp
                </button>
                <button
                  onClick={shareViaEmail}
                  className="btn-secondary flex items-center justify-center"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Email
                </button>
              </div>
            </div>

            {/* How it Works */}
            <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-medium mb-3">How it Works</h4>
              <ol className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">1</span>
                  Share your referral code with friends
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">2</span>
                  They sign up using your code
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs mr-3">3</span>
                  You both get ₹{referralData.referralBonus} bonus!
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Referral History */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-6">Referral History</h3>
            
            {referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.map((referral, index) => (
                  <motion.div
                    key={referral._id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{referral.friendName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {referral.friendEmail}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Joined {new Date(referral.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold ${
                          referral.status === 'completed' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          ₹{referral.earnings}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {referral.status === 'completed' ? 'Earned' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    {!referral.firstBooking && referral.status === 'pending' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Waiting for first booking to complete
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <UserPlusIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No referrals yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start sharing your code to earn rewards!
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Program Benefits */}
        <motion.div
          className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-6">Program Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyRupeeIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">Earn ₹100 per Referral</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get ₹100 for each friend who signs up and makes their first booking
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiftIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2">Friend Gets ₹50</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your friends get ₹50 bonus when they sign up using your code
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShareIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Unlimited Referrals</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No limit on how many friends you can refer and earn from
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-lg font-bold mb-4">Terms & Conditions</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>• Referral bonus is credited after the referred user completes their first booking</li>
            <li>• Both referrer and referee must be verified users</li>
            <li>• Referral earnings are added to your wallet within 24 hours</li>
            <li>• Self-referrals and fake accounts are not allowed</li>
            <li>• RentalHub reserves the right to modify the program terms</li>
            <li>• Minimum withdrawal amount is ₹500</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferralProgram;