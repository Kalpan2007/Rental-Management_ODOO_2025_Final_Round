import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../data/mockData';
import { toast } from 'react-toastify';
import { 
  MailIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeOffIcon,
  DeviceMobileIcon 
} from '@heroicons/react/outline';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await mockApi.login(formData);
      login(response.data.user, response.data.token);
      toast.success('Welcome back!');
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <DeviceMobileIcon className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">RentalEase</span>
          </Link>
        </div>

        <Card>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                icon={<MailIcon className="w-5 h-5" />}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<LockClosedIcon className="w-5 h-5" />}
                    className="pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center space-y-4">
              <Link 
                to="/forgot-password" 
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot your password?
              </Link>

              <div className="text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-500 text-center mb-3">Demo Credentials:</p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="glass bg-slate-800/50 p-2 rounded-lg">
                  <p className="text-slate-400">Customer: user@example.com / user123</p>
                </div>
                <div className="glass bg-slate-800/50 p-2 rounded-lg">
                  <p className="text-slate-400">Admin: admin@rentalease.com / admin123</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;