import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/CustomerDashboard';
// import AdminDashboard from './pages/AdminDashboard';
import BookingFlow from './pages/BookingFlow';
import MyRentals from './pages/MyRentals';
import AdminProducts from './pages/AdminProducts';
import AdminBookings from './pages/AdminBookings';
import ProfilePage from './pages/ProfilePage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected Customer Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <CustomerDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/my-rentals" element={
              <ProtectedRoute>
                <Layout>
                  <MyRentals />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/booking/:productId" element={
              <ProtectedRoute>
                <Layout>
                  <BookingFlow />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Protected Admin Routes */}
            {/* <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            } /> */}
            <Route path="/admin/products" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminProducts />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <AdminBookings />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;