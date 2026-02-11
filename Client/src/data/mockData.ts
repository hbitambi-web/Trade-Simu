// Mock data for the Stock Trading Simulation System

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  high52w: number;
  low52w: number;
}

export interface PortfolioHolding {
  id: string;
  stock: Stock;
  quantity: number;
  avgCost: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  ticker: string;
  stockName: string;
  quantity: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'canceled';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  completed: boolean;
  videoUrl?: string;
  hasQuiz: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
  cashBalance: number;
  accountStatus: 'active' | 'inactive' | 'suspended';
  riskLevel: 'low' | 'medium' | 'high';
  joinedDate: string;
}

// Mock Stocks Data
export const mockStocks: Stock[] = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 178.52,
    change: 2.34,
    changePercent: 1.33,
    volume: 52341200,
    marketCap: '2.8T',
    sector: 'Technology',
    high52w: 199.62,
    low52w: 124.17,
  },
  {
    id: '2',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.80,
    change: -1.25,
    changePercent: -0.87,
    volume: 21456700,
    marketCap: '1.8T',
    sector: 'Technology',
    high52w: 153.78,
    low52w: 83.45,
  },
  {
    id: '3',
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 378.91,
    change: 4.56,
    changePercent: 1.22,
    volume: 18923400,
    marketCap: '2.8T',
    sector: 'Technology',
    high52w: 384.30,
    low52w: 219.35,
  },
  {
    id: '4',
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.25,
    change: 3.12,
    changePercent: 1.78,
    volume: 45678900,
    marketCap: '1.9T',
    sector: 'Consumer Discretionary',
    high52w: 189.77,
    low52w: 81.43,
  },
  {
    id: '5',
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
    volume: 38456100,
    marketCap: '2.2T',
    sector: 'Technology',
    high52w: 974.00,
    low52w: 222.97,
  },
  {
    id: '6',
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 505.34,
    change: -2.89,
    changePercent: -0.57,
    volume: 12345600,
    marketCap: '1.3T',
    sector: 'Technology',
    high52w: 542.81,
    low52w: 167.56,
  },
  {
    id: '7',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.50,
    change: -8.34,
    changePercent: -3.25,
    volume: 98765400,
    marketCap: '789B',
    sector: 'Consumer Discretionary',
    high52w: 299.29,
    low52w: 138.80,
  },
  {
    id: '8',
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 195.62,
    change: 1.23,
    changePercent: 0.63,
    volume: 8765400,
    marketCap: '565B',
    sector: 'Financial',
    high52w: 200.94,
    low52w: 123.11,
  },
  {
    id: '9',
    ticker: 'V',
    name: 'Visa Inc.',
    price: 279.45,
    change: 0.87,
    changePercent: 0.31,
    volume: 5432100,
    marketCap: '571B',
    sector: 'Financial',
    high52w: 290.96,
    low52w: 206.32,
  },
  {
    id: '10',
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    price: 156.78,
    change: -0.45,
    changePercent: -0.29,
    volume: 6543200,
    marketCap: '378B',
    sector: 'Healthcare',
    high52w: 175.97,
    low52w: 143.13,
  },
];

// Mock Portfolio Holdings
export const mockPortfolio: PortfolioHolding[] = [
  {
    id: '1',
    stock: mockStocks[0], // AAPL
    quantity: 50,
    avgCost: 165.30,
    currentValue: 8926.00,
    gainLoss: 661.00,
    gainLossPercent: 8.00,
  },
  {
    id: '2',
    stock: mockStocks[2], // MSFT
    quantity: 25,
    avgCost: 350.00,
    currentValue: 9472.75,
    gainLoss: 722.75,
    gainLossPercent: 8.26,
  },
  {
    id: '3',
    stock: mockStocks[4], // NVDA
    quantity: 10,
    avgCost: 750.00,
    currentValue: 8752.80,
    gainLoss: 1252.80,
    gainLossPercent: 16.70,
  },
  {
    id: '4',
    stock: mockStocks[6], // TSLA
    quantity: 30,
    avgCost: 280.00,
    currentValue: 7455.00,
    gainLoss: -945.00,
    gainLossPercent: -11.25,
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15 09:32:15',
    type: 'buy',
    ticker: 'AAPL',
    stockName: 'Apple Inc.',
    quantity: 25,
    price: 178.52,
    total: 4463.00,
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-01-15 10:15:42',
    type: 'sell',
    ticker: 'GOOGL',
    stockName: 'Alphabet Inc.',
    quantity: 10,
    price: 141.80,
    total: 1418.00,
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-01-15 11:45:00',
    type: 'buy',
    ticker: 'NVDA',
    stockName: 'NVIDIA Corp.',
    quantity: 5,
    price: 875.28,
    total: 4376.40,
    status: 'pending',
  },
  {
    id: '4',
    date: '2024-01-14 14:22:33',
    type: 'buy',
    ticker: 'MSFT',
    stockName: 'Microsoft Corp.',
    quantity: 15,
    price: 378.91,
    total: 5683.65,
    status: 'completed',
  },
  {
    id: '5',
    date: '2024-01-14 09:05:18',
    type: 'sell',
    ticker: 'TSLA',
    stockName: 'Tesla Inc.',
    quantity: 20,
    price: 255.00,
    total: 5100.00,
    status: 'canceled',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Order Executed',
    message: 'Your buy order for 25 shares of AAPL has been executed at $178.52',
    timestamp: '2024-01-15 09:32:15',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Market Opening',
    message: 'The stock market is now open for trading',
    timestamp: '2024-01-15 09:30:00',
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Price Alert',
    message: 'TSLA has dropped below your alert price of $250.00',
    timestamp: '2024-01-15 08:45:00',
    read: true,
  },
  {
    id: '4',
    type: 'error',
    title: 'Insufficient Funds',
    message: 'Your order for NVDA could not be completed due to insufficient funds',
    timestamp: '2024-01-14 15:30:00',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'Market Closing',
    message: 'The stock market will close in 30 minutes',
    timestamp: '2024-01-14 15:30:00',
    read: true,
  },
];

// Mock Training Modules
export const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Introduction to Stock Trading',
    description: 'Learn the basics of stock trading, market terminology, and how the stock market works.',
    duration: '25 min',
    progress: 100,
    completed: true,
    hasQuiz: true,
  },
  {
    id: '2',
    title: 'Understanding Market Orders',
    description: 'Deep dive into different order types: market orders, limit orders, and stop-loss orders.',
    duration: '30 min',
    progress: 75,
    completed: false,
    hasQuiz: true,
  },
  {
    id: '3',
    title: 'Technical Analysis Fundamentals',
    description: 'Learn how to read charts, identify patterns, and use technical indicators.',
    duration: '45 min',
    progress: 30,
    completed: false,
    hasQuiz: true,
  },
  {
    id: '4',
    title: 'Risk Management Strategies',
    description: 'Essential strategies for managing risk and protecting your portfolio.',
    duration: '35 min',
    progress: 0,
    completed: false,
    hasQuiz: true,
  },
  {
    id: '5',
    title: 'Portfolio Diversification',
    description: 'Learn how to build a diversified portfolio to minimize risk and maximize returns.',
    duration: '40 min',
    progress: 0,
    completed: false,
    hasQuiz: true,
  },
];

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'John Trader',
  email: 'john.trader@email.com',
  role: 'customer',
  cashBalance: 25750.50,
  accountStatus: 'active',
  riskLevel: 'medium',
  joinedDate: '2023-06-15',
};

// Market status and time
export const marketStatus = {
  isOpen: true,
  nextOpen: '09:30 AM EST',
  nextClose: '04:00 PM EST',
  currentTime: new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  }),
};

// Helper functions
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

// Chart data
export const mockChartData = [
  { time: '09:30', price: 175.20 },
  { time: '10:00', price: 176.45 },
  { time: '10:30', price: 175.80 },
  { time: '11:00', price: 177.30 },
  { time: '11:30', price: 178.10 },
  { time: '12:00', price: 177.85 },
  { time: '12:30', price: 178.50 },
  { time: '13:00', price: 179.20 },
  { time: '13:30', price: 178.75 },
  { time: '14:00', price: 178.52 },
];

// Admin specific data
export const adminStats = {
  totalStocks: 150,
  activeTraders: 1250,
  totalTransactions: 45678,
  tradingVolume: '$125.5M',
  marketStatus: 'open',
};

export const recentAdminActions = [
  { id: '1', action: 'Added new stock: COIN', user: 'Admin', timestamp: '2024-01-15 09:15:00' },
  { id: '2', action: 'Updated price for AAPL', user: 'System', timestamp: '2024-01-15 09:30:00' },
  { id: '3', action: 'Market opened', user: 'System', timestamp: '2024-01-15 09:30:00' },
  { id: '4', action: 'User registration approved', user: 'Admin', timestamp: '2024-01-15 08:45:00' },
];
