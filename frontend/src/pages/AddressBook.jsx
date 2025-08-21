import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  HomeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const AddressBook = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        // Mock addresses data
        const mockAddresses = [
          {
            id: '1',
            type: 'home',
            label: 'Home',
            name: 'John Doe',
            street: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            phone: '+91 98765 43210',
            isDefault: true
          },
          {
            id: '2',
            type: 'office',
            label: 'Office',
            name: 'John Doe',
            street: '456 Business Park',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400002',
            phone: '+91 98765 43210',
            isDefault: false
          }
        ];
        
        setAddresses(mockAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const onSubmit = (data) => {
    const newAddress = {
      id: editingAddress ? editingAddress.id : Date.now().toString(),
      ...data,
      isDefault: addresses.length === 0 || data.isDefault
    };

    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? newAddress : addr
      ));
      toast.success('Address updated successfully');
    } else {
      setAddresses([...addresses, newAddress]);
      toast.success('Address added successfully');
    }

    setShowAddForm(false);
    setEditingAddress(null);
    reset();
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    reset(address);
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully');
    }
  };

  const handleSetDefault = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    toast.success('Default address updated');
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return HomeIcon;
      case 'office':
        return BuildingOfficeIcon;
      default:
        return MapPinIcon;
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Address Book</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your delivery addresses
              </p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingAddress(null);
                reset();
              }}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Address
            </button>
          </div>
        </motion.div>

        {/* Addresses List */}
        <div className="space-y-4 mb-8">
          {addresses.map((address, index) => {
            const IconComponent = getAddressIcon(address.type);
            return (
              <motion.div
                key={address.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{address.label}</h3>
                        {address.isDefault && (
                          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {address.street}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {address.city}, {address.state} {address.pincode}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {address.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="btn-secondary text-sm"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add/Edit Address Form */}
        {showAddForm && (
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Address Type</label>
                  <select
                    className="input w-full"
                    {...register('type', { required: 'Address type is required' })}
                  >
                    <option value="">Select type</option>
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Label</label>
                  <input
                    type="text"
                    placeholder="e.g., Home, Office"
                    className="input w-full"
                    {...register('label', { required: 'Label is required' })}
                  />
                  {errors.label && (
                    <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="input w-full"
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  className="input w-full"
                  {...register('street', { required: 'Street address is required' })}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register('state', { required: 'State is required' })}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register('pincode', { required: 'Pincode is required' })}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('isDefault')}
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm">
                  Set as default address
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAddress(null);
                    reset();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {addresses.length === 0 && !showAddForm && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">No Addresses Saved</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add delivery addresses to make booking faster
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              Add Your First Address
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddressBook;