import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51RurTe9Xo1ci3qLciJDx3VPJcT6yVCuohh6xeXC1QIxrEDEDv8nmRwPHdI6dzGestlHIX1C9AIvWDBx07It2DJ5z007W5nQ64t');

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <AuthProvider>
          <ThemeProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header />
                <main className="flex-grow">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </Router>
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
              theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
            />
          </ThemeProvider>
        </AuthProvider>
      </Elements>
    </QueryClientProvider>
  );
}

export default App;
