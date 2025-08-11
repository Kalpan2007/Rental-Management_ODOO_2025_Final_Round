import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import ProductForm from '../pages/ProductForm';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';

// Protected Pages
import Profile from '../pages/Profile';
import MyBookings from '../pages/MyBookings';
import BookingDetail from '../pages/BookingDetail';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminProductForm from '../pages/admin/ProductForm';
import Bookings from '../pages/admin/Bookings';
import AdminBookingDetail from '../pages/admin/BookingDetail';
import Users from '../pages/admin/Users';
import UserDetail from '../pages/admin/UserDetail';
import Reports from '../pages/admin/Reports';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Route>
      
      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;