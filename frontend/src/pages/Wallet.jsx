import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  WalletIcon,
  PlusIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const Wallet = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [walletData, setWalletData] = useState({
    balance: 0,
    pendingEarnings: 0,
    totalEarnings: 0,
    totalSpent: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        // Mock wallet data
        const mockWalletData = {
          balance: 2500.50,
          pendingEarnings: 800.00,
          totalEarnings: 15000.00,
          totalSpent: 8500.00
        };

        const mockTransactions = [
          {
            _id: '1',
            type: 'credit',
            amount: 500,
            description: 'Rental payment received for Professional Camera',
            status: 'completed',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            orderId: 'RH-2024-001'
          },
          {
            _id: '2',
            type: 'debit',
            amount: 300,
            description: 'Rental payment for DJ Equipment',
            status: 'completed',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            orderId: 'RH-2024-002'
          },
          {
            _id: '3',
            type: 'credit',
            amount: 1000,
            description: 'Wallet top-up',
            status: 'completed',
            createdAt: new Date(Date.now() - 259200000).toISOString()
          },
          {
            _id: '4',
            type: 'debit',
            amount: 750,
            description: 'Withdrawal to bank account',
            status: 'pending',
            createdAt: new Date(Date.now() - 345600000).toISOString()
          }
        ];
        
        setWalletData(mockWalletData);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast.error('Failed to load wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const newTransaction = {
      _id: Date.now().toString(),
      type: 'credit',
      amount: parseFloat(amount),
      description: 'Wallet top-up',
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
    setWalletData(prev => ({
      ...prev,
      balance: prev.balance + parseFloat(amount)
    }));
    
    toast.success(`₹${amount} added to wallet successfully`);
    setShowAddMoney(false);
    setAmount('');
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > walletData.balance) {
      toast.error('Insufficient balance');
      return;
    }

    const newTransaction = {
      _id: Date.now().toString(),
      type: 'debit',
      amount: parseFloat(amount),
      description: 'Withdrawal to bank account',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
    setWalletData(prev => ({
      ...prev,
      balance: prev.balance - parseFloat(amount)
    }));
    
    toast.success(`Withdrawal of ₹${amount} initiated`);
    setShowWithdraw(false);
    setAmount('');
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
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center">
            <WalletIcon className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold">My Wallet</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your earnings and payments
              </p>
            </div>
          </div>
        </motion.div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Current Balance',
              value: `₹${walletData.balance.toFixed(2)}`,
              icon: WalletIcon,
              color: 'from-green-500 to-green-600',
              description: 'Available for withdrawal'
            },
            {
              title: 'Pending Earnings',
              value: `₹${walletData.pendingEarnings.toFixed(2)}`,
              icon: BanknotesIcon,
              color: 'from-yellow-500 to-yellow-600',
              description: 'Processing payments'
            },
            {
              title: 'Total Earnings',
              value: `₹${walletData.totalEarnings.toFixed(2)}`,
              icon: ArrowUpIcon,
              color: 'from-blue-500 to-blue-600',
              description: 'All time earnings'
            },
            {
              title: 'Total Spent',
              value: `₹${walletData.totalSpent.toFixed(2)}`,
              icon: ArrowDownIcon,
              color: 'from-purple-500 to-purple-600',
              description: 'All time spending'
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
                  <p className="text-white/60 text-xs mt-1">{stat.description}</p>
                </div>
                <stat.icon className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button
                onClick={() => setShowAddMoney(true)}
                className="w-full btn-primary flex items-center justify-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Money
              </button>
              <button
                onClick={() => setShowWithdraw(true)}
                className="w-full btn-secondary flex items-center justify-center"
                disabled={walletData.balance <= 0}
              >
                <MinusIcon className="h-5 w-5 mr-2" />
                Withdraw
              </button>
            </div>

            {/* Add Money Form */}
            {showAddMoney && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium mb-3">Add Money to Wallet</h4>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input w-full"
                    min="1"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddMoney}
                      className="btn-primary flex-1"
                    >
                      Add ₹{amount || '0'}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMoney(false);
                        setAmount('');
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Withdraw Form */}
            {showWithdraw && (
              <motion.div
                className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium mb-3">Withdraw to Bank</h4>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input w-full"
                    min="1"
                    max={walletData.balance}
                  />
                  <p className="text-sm text-gray-500">
                    Available: ₹{walletData.balance.toFixed(2)}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleWithdraw}
                      className="btn-primary flex-1"
                    >
                      Withdraw ₹{amount || '0'}
                    </button>
                    <button
                      onClick={() => {
                        setShowWithdraw(false);
                        setAmount('');
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Transaction History */}
          <motion.div
            className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-6">Transaction History</h3>
            
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction._id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <ArrowDownIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                            {transaction.orderId && (
                              <>
                                <span>•</span>
                                <span>Order #{transaction.orderId}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === 'credit' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Wallet Tips */}
        <motion.div
          className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4">💡 Wallet Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-medium mb-2">Instant Payments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use wallet balance for instant rental payments without entering card details
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-medium mb-2">Earn While You Rent</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                List your products and earn money directly to your wallet
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-medium mb-2">Secure Transactions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All wallet transactions are encrypted and secure
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wallet;