import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import ProductForm from '../pages/ProductForm';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';

// Help & Support Pages
import FAQ from '../pages/help/FAQ';
import Support from '../pages/help/Support';
import HowItWorks from '../pages/help/HowItWorks';
import Pricing from '../pages/help/Pricing';
import Blog from '../pages/help/Blog';
import BlogPost from '../pages/help/BlogPost';

// Legal Pages
import TermsOfService from '../pages/legal/TermsOfService';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import CookiesPolicy from '../pages/legal/CookiesPolicy';
import RefundPolicy from '../pages/legal/RefundPolicy';

// Category Pages
import Electronics from '../pages/categories/Electronics';
import Photography from '../pages/categories/Photography';
import AudioEquipment from '../pages/categories/AudioEquipment';
import VideoEquipment from '../pages/categories/VideoEquipment';
import CampingGear from '../pages/categories/CampingGear';
import PartySupplies from '../pages/categories/PartySupplies';
import Tools from '../pages/categories/Tools';
import SportsEquipment from '../pages/categories/SportsEquipment';
import MusicalInstruments from '../pages/categories/MusicalInstruments';

// Protected Pages
import Profile from '../pages/Profile';
import MyBookings from '../pages/MyBookings';
import BookingDetail from '../pages/BookingDetail';
import MyProducts from '../pages/MyProducts';
import Favorites from '../pages/Favorites';
import Messages from '../pages/Messages';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';
import PaymentMethods from '../pages/PaymentMethods';
import AddressBook from '../pages/AddressBook';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import AdminProducts from '../pages/admin/Products';
import AdminProductForm from '../pages/admin/ProductForm';
import Bookings from '../pages/admin/Bookings';
import AdminBookingDetail from '../pages/admin/BookingDetail';
import Users from '../pages/admin/Users';
import UserDetail from '../pages/admin/UserDetail';
import Reports from '../pages/admin/Reports';
import Analytics from '../pages/admin/Analytics';
import Settings as AdminSettings from '../pages/admin/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Help & Support Routes */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/support" element={<Support />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      
      {/* Legal Routes */}
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiesPolicy />} />
      <Route path="/refund" element={<RefundPolicy />} />
      
      {/* Category Routes */}
      <Route path="/categories/electronics" element={<Electronics />} />
      <Route path="/categories/photography" element={<Photography />} />
      <Route path="/categories/audio-equipment" element={<AudioEquipment />} />
      <Route path="/categories/video-equipment" element={<VideoEquipment />} />
      <Route path="/categories/camping-gear" element={<CampingGear />} />
      <Route path="/categories/party-supplies" element={<PartySupplies />} />
      <Route path="/categories/tools" element={<Tools />} />
      <Route path="/categories/sports-equipment" element={<SportsEquipment />} />
      <Route path="/categories/musical-instruments" element={<MusicalInstruments />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/address-book" element={<AddressBook />} />
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
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;