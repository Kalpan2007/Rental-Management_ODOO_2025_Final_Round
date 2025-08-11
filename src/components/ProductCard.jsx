import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, LocationMarkerIcon, CalendarIcon } from '@heroicons/react/solid';
import Card from './Card';
import Button from './Button';

const ProductCard = ({ product, onBookNow }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            product.availability 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {product.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-slate-400">
            <LocationMarkerIcon className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">{product.rating}</span>
            <span className="text-slate-400">({product.reviews})</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Per Day</span>
            <span className="text-xl font-bold text-white">{formatPrice(product.pricePerDay)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-center py-1">
              <span className="text-slate-400">Weekly: </span>
              <span className="text-white font-medium">{formatPrice(product.pricePerWeek)}</span>
            </div>
            <div className="text-center py-1">
              <span className="text-slate-400">Monthly: </span>
              <span className="text-white font-medium">{formatPrice(product.pricePerMonth)}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Link 
            to={`/products/${product.id}`}
            className="flex-1"
          >
            <Button variant="secondary" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {product.availability && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => onBookNow(product)}
              icon={<CalendarIcon className="w-4 h-4" />}
              className="flex-1"
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;