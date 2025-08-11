import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  SearchIcon, 
  StarIcon, 
  ShieldCheckIcon, 
  CurrencyRupeeIcon,
  DeviceMobileIcon,
  TruckIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import Input from '../components/Input';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = mockProducts.slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Verified',
      description: 'All products are verified and insured for your peace of mind.'
    },
    {
      icon: CurrencyRupeeIcon,
      title: 'Best Prices',
      description: 'Competitive pricing with flexible payment options.'
    },
    {
      icon: TruckIcon,
      title: 'Easy Delivery',
      description: 'Fast and convenient pickup and delivery services.'
    },
    {
      icon: UserGroupIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs.'
    }
  ];

  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Products Available', value: '5,000+' },
    { label: 'Cities Covered', value: '50+' },
    { label: 'Years of Service', value: '5+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <DeviceMobileIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RentalEase</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-slate-300 hover:text-white transition-colors">
                Browse Products
              </Link>
              <Link to="/login" className="text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 animate-gradient"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Rent Anything,{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Anytime
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From electronics to vehicles, find everything you need for rent. 
              Smart, sustainable, and affordable rental solutions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for cameras, bikes, laptops, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<SearchIcon className="w-5 h-5" />}
                  className="pr-24 py-4 text-lg"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2"
                  size="sm"
                >
                  Search
                </Button>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="group"
                  icon={<ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                >
                  Browse Products
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="lg">
                  Start Renting Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured Products
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover our most popular rental items, carefully selected for quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onBookNow={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="secondary">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose RentalEase?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We make renting simple, secure, and affordable with industry-leading features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-glass text-center space-y-4 group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:animate-pulse-glow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-glass space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Renting?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust RentalEase for their rental needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/signup">
                <Button size="lg">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <DeviceMobileIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">RentalEase</span>
              </div>
              <p className="text-slate-400">
                Making rentals simple, secure, and affordable for everyone.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/products" className="block text-slate-400 hover:text-white transition-colors">
                  Browse Products
                </Link>
                <Link to="/login" className="block text-slate-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="block text-slate-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Categories</h3>
              <div className="space-y-2">
                <Link to="/products?category=Electronics" className="block text-slate-400 hover:text-white transition-colors">
                  Electronics
                </Link>
                <Link to="/products?category=Vehicles" className="block text-slate-400 hover:text-white transition-colors">
                  Vehicles
                </Link>
                <Link to="/products?category=Audio Equipment" className="block text-slate-400 hover:text-white transition-colors">
                  Audio Equipment
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 RentalEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;