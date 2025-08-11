// Mock data for RentalEase

export const mockProducts = [
  {
    id: 1,
    name: "DJI Mavic Air 2 Drone",
    category: "Electronics",
    description: "Professional 4K camera drone with 34-minute flight time and advanced obstacle sensing.",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    pricePerDay: 150,
    pricePerWeek: 900,
    pricePerMonth: 3200,
    deposit: 500,
    availability: true,
    location: "Mumbai, Maharashtra",
    owner: "TechRent Solutions",
    rating: 4.8,
    reviews: 45,
    specifications: {
      "Flight Time": "34 minutes",
      "Video Resolution": "4K/60fps",
      "Photo Resolution": "48MP",
      "Max Speed": "68.4 km/h",
      "Weight": "570g"
    },
    features: ["4K HDR Video", "ActiveTrack 3.0", "APAS 3.0", "OcuSync 2.0"]
  },
  {
    id: 2,
    name: "Canon EOS R5 Camera",
    category: "Electronics",
    description: "Professional mirrorless camera with 8K video recording and 45MP sensor.",
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800"
    ],
    pricePerDay: 200,
    pricePerWeek: 1200,
    pricePerMonth: 4500,
    deposit: 800,
    availability: true,
    location: "Delhi, NCR",
    owner: "Photo Pro Rentals",
    rating: 4.9,
    reviews: 78,
    specifications: {
      "Sensor": "45MP Full Frame CMOS",
      "Video": "8K RAW / 4K 120p",
      "ISO Range": "100-51200",
      "Image Stabilization": "5-axis In-Body",
      "Battery Life": "320 shots"
    },
    features: ["8K Video Recording", "Dual Pixel CMOS AF II", "5-axis IBIS", "Weather Sealing"]
  },
  {
    id: 3,
    name: "BMW R1250 GS Adventure",
    category: "Vehicles",
    description: "Premium adventure motorcycle perfect for long tours and off-road exploration.",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800"
    ],
    pricePerDay: 800,
    pricePerWeek: 5000,
    pricePerMonth: 18000,
    deposit: 15000,
    availability: true,
    location: "Bangalore, Karnataka",
    owner: "Adventure Rides India",
    rating: 4.7,
    reviews: 32,
    specifications: {
      "Engine": "1254cc, Twin Cylinder",
      "Power": "136 HP",
      "Torque": "143 Nm",
      "Fuel Tank": "30 liters",
      "Weight": "249 kg"
    },
    features: ["ABS Pro", "Dynamic Traction Control", "Riding Modes", "LED Lighting"]
  },
  {
    id: 4,
    name: "Bose L1 Pro32 PA System",
    category: "Audio Equipment",
    description: "Professional portable PA system with exceptional sound quality and 180° coverage.",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800"
    ],
    pricePerDay: 300,
    pricePerWeek: 1800,
    pricePerMonth: 6500,
    deposit: 1000,
    availability: true,
    location: "Chennai, Tamil Nadu",
    owner: "Event Sound Solutions",
    rating: 4.6,
    reviews: 28,
    specifications: {
      "Max SPL": "130 dB",
      "Frequency Response": "40 Hz - 20 kHz",
      "Power": "2,500W peak",
      "Channels": "32 input channels",
      "Weight": "25.6 kg"
    },
    features: ["180° Horizontal Coverage", "Built-in Mixer", "Wireless Capability", "Weather Resistant"]
  },
  {
    id: 5,
    name: "MacBook Pro 16\" M2 Max",
    category: "Electronics",
    description: "Powerful laptop for creative professionals with M2 Max chip and stunning Retina display.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800"
    ],
    pricePerDay: 120,
    pricePerWeek: 700,
    pricePerMonth: 2500,
    deposit: 2000,
    availability: true,
    location: "Pune, Maharashtra",
    owner: "Tech Rental Hub",
    rating: 4.9,
    reviews: 67,
    specifications: {
      "Processor": "Apple M2 Max",
      "RAM": "32GB Unified Memory",
      "Storage": "1TB SSD",
      "Display": "16.2\" Liquid Retina XDR",
      "Battery": "Up to 22 hours"
    },
    features: ["M2 Max Chip", "ProRes Video Engine", "Studio-quality Mics", "1080p FaceTime HD Camera"]
  },
  {
    id: 6,
    name: "Tesla Model S Plaid",
    category: "Vehicles",
    description: "Ultra-high performance electric sedan with tri-motor setup and autopilot features.",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800"
    ],
    pricePerDay: 2500,
    pricePerWeek: 15000,
    pricePerMonth: 55000,
    deposit: 50000,
    availability: false,
    location: "Mumbai, Maharashtra",
    owner: "Luxury Car Rentals",
    rating: 4.8,
    reviews: 15,
    specifications: {
      "Range": "628 km",
      "Acceleration": "0-100 km/h in 2.1s",
      "Top Speed": "322 km/h",
      "Motors": "Tri Motor All-Wheel Drive",
      "Charging": "Supercharger Compatible"
    },
    features: ["Autopilot", "17\" Touchscreen", "Premium Audio", "Over-the-air Updates"]
  }
];

export const mockBookings = [
  {
    id: "REN001",
    productId: 1,
    product: mockProducts[0],
    customerId: "user1",
    customerName: "Rahul Sharma",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    totalAmount: 750,
    deposit: 500,
    status: "confirmed",
    createdAt: "2024-01-10T10:30:00Z",
    endUser: {
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "priya@example.com",
      address: "123 Main Street, Mumbai"
    },
    paymentStatus: "paid"
  },
  {
    id: "REN002",
    productId: 2,
    product: mockProducts[1],
    customerId: "user1",
    customerName: "Rahul Sharma",
    startDate: "2024-01-25",
    endDate: "2024-01-28",
    totalAmount: 600,
    deposit: 800,
    status: "pending",
    createdAt: "2024-01-22T14:15:00Z",
    endUser: {
      name: "Amit Kumar",
      phone: "+91 87654 32109",
      email: "amit@example.com",
      address: "456 Park Avenue, Delhi"
    },
    paymentStatus: "pending"
  },
  {
    id: "REN003",
    productId: 3,
    product: mockProducts[2],
    customerId: "user2",
    customerName: "Anjali Patel",
    startDate: "2024-01-12",
    endDate: "2024-01-14",
    totalAmount: 1600,
    deposit: 15000,
    status: "completed",
    createdAt: "2024-01-08T09:20:00Z",
    endUser: {
      name: "Vikash Patel",
      phone: "+91 76543 21098",
      email: "vikash@example.com",
      address: "789 Adventure Road, Bangalore"
    },
    paymentStatus: "paid"
  }
];

export const mockUsers = [
  {
    id: "user1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    role: "customer",
    joinedAt: "2023-12-01T00:00:00Z",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@rentalease.com",
    phone: "+91 87654 32109",
    role: "admin",
    joinedAt: "2023-11-01T00:00:00Z",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export const mockReports = {
  revenue: {
    thisMonth: 125000,
    lastMonth: 98000,
    growth: 27.5,
    chartData: [
      { month: 'Jan', revenue: 85000 },
      { month: 'Feb', revenue: 92000 },
      { month: 'Mar', revenue: 78000 },
      { month: 'Apr', revenue: 105000 },
      { month: 'May', revenue: 98000 },
      { month: 'Jun', revenue: 125000 }
    ]
  },
  bookings: {
    total: 156,
    pending: 12,
    confirmed: 45,
    completed: 89,
    cancelled: 10,
    chartData: [
      { status: 'Confirmed', count: 45, color: '#3B82F6' },
      { status: 'Completed', count: 89, color: '#10B981' },
      { status: 'Pending', count: 12, color: '#F59E0B' },
      { status: 'Cancelled', count: 10, color: '#EF4444' }
    ]
  },
  topProducts: [
    { name: 'DJI Mavic Air 2', bookings: 23, revenue: 34500 },
    { name: 'Canon EOS R5', bookings: 18, revenue: 36000 },
    { name: 'BMW R1250 GS', bookings: 8, revenue: 64000 },
    { name: 'Tesla Model S', bookings: 5, revenue: 125000 }
  ]
};

export const mockNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'New Booking Request',
    message: 'DJI Mavic Air 2 has been booked for Jan 15-20',
    timestamp: '2024-01-10T10:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of ₹1,250 received for booking REN001',
    timestamp: '2024-01-10T09:15:00Z',
    read: false
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Return Reminder',
    message: 'Canon EOS R5 return due tomorrow',
    timestamp: '2024-01-09T16:45:00Z',
    read: true
  }
];

// API simulation functions
export const apiDelay = () => new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

export const mockApi = {
  // Products
  getProducts: async (filters = {}) => {
    await apiDelay();
    let products = [...mockProducts];
    
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.minPrice) {
      products = products.filter(p => p.pricePerDay >= filters.minPrice);
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.pricePerDay <= filters.maxPrice);
    }
    if (filters.availability !== undefined) {
      products = products.filter(p => p.availability === filters.availability);
    }
    
    return { data: products, total: products.length };
  },

  getProduct: async (id) => {
    await apiDelay();
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return { data: product };
  },

  // Bookings
  getBookings: async (filters = {}) => {
    await apiDelay();
    let bookings = [...mockBookings];
    
    if (filters.status) {
      bookings = bookings.filter(b => b.status === filters.status);
    }
    if (filters.customerId) {
      bookings = bookings.filter(b => b.customerId === filters.customerId);
    }
    
    return { data: bookings, total: bookings.length };
  },

  createBooking: async (bookingData) => {
    await apiDelay();
    const newBooking = {
      id: `REN${String(mockBookings.length + 1).padStart(3, '0')}`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentStatus: 'pending'
    };
    mockBookings.push(newBooking);
    return { data: newBooking };
  },

  // Auth
  login: async (credentials) => {
    await apiDelay();
    if (credentials.email === 'admin@rentalease.com' && credentials.password === 'admin123') {
      return {
        data: {
          user: mockUsers[1],
          token: 'mock-admin-token'
        }
      };
    } else if (credentials.email === 'user@example.com' && credentials.password === 'user123') {
      return {
        data: {
          user: mockUsers[0],
          token: 'mock-user-token'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  signup: async (userData) => {
    await apiDelay();
    const newUser = {
      id: `user${mockUsers.length + 1}`,
      ...userData,
      role: 'customer',
      joinedAt: new Date().toISOString(),
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`
    };
    mockUsers.push(newUser);
    return {
      data: {
        user: newUser,
        token: 'mock-new-user-token'
      }
    };
  },

  // Reports
  getReports: async () => {
    await apiDelay();
    return { data: mockReports };
  },

  // Notifications
  getNotifications: async () => {
    await apiDelay();
    return { data: mockNotifications };
  }
};