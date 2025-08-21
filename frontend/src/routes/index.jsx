import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

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
import Dashboard from '../pages/Dashboard';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentCancel from '../pages/PaymentCancel';
import Categories from '../pages/Categories';
import Marketplace from '../pages/Marketplace';
import Trending from '../pages/Trending';
import Explore from '../pages/Explore';
import Community from '../pages/Community';
import Deals from '../pages/Deals';
import Events from '../pages/Events';
import BusinessSolutions from '../pages/BusinessSolutions';

// Help & Support Pages
import FAQ from '../pages/system/FAQ';
import Support from '../pages/system/Support';
import HowItWorks from '../pages/help/HowItWorks';
import Pricing from '../pages/help/Pricing';
import Blog from '../pages/help/Blog';
import BlogPost from '../pages/help/BlogPost';
import ContactUs from '../pages/system/ContactUs';
import Maintenance from '../pages/system/Maintenance';
import UnderDevelopment from '../pages/system/UnderDevelopment';
import SystemCrash from '../pages/system/SystemCrash';

// Legal Pages
import TermsOfService from '../pages/system/Legal/TermsOfService';
import PrivacyPolicy from '../pages/system/Legal/PrivacyPolicy';
import CookiesPolicy from '../pages/system/Legal/CookiesPolicy';
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
import Vehicles from '../pages/categories/Vehicles';
import HomeAppliances from '../pages/categories/HomeAppliances';
import Fashion from '../pages/categories/Fashion';
import Books from '../pages/categories/Books';
import Gaming from '../pages/categories/Gaming';

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
import Wishlist from '../pages/Wishlist';
import OrderHistory from '../pages/OrderHistory';
import Reviews from '../pages/Reviews';
import Wallet from '../pages/Wallet';
import ReferralProgram from '../pages/ReferralProgram';
import HelpCenter from '../pages/HelpCenter';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
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
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/community" element={<Community />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/events" element={<Events />} />
      <Route path="/business" element={<BusinessSolutions />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/under-development" element={<UnderDevelopment />} />
      <Route path="/system-crash" element={<SystemCrash />} />
      
      {/* Auth Routes (only for non-authenticated users) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
      </Route>
      
      {/* Help & Support Routes */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/support" element={<Support />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/help" element={<HelpCenter />} />
      
      {/* Legal Routes */}
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiesPolicy />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      
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
      <Route path="/categories/vehicles" element={<Vehicles />} />
      <Route path="/categories/home-appliances" element={<HomeAppliances />} />
      <Route path="/categories/fashion" element={<Fashion />} />
      <Route path="/categories/books" element={<Books />} />
      <Route path="/categories/gaming" element={<Gaming />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/favorites" element={<Wishlist />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/address-book" element={<AddressBook />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/referral" element={<ReferralProgram />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Route>
      
      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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