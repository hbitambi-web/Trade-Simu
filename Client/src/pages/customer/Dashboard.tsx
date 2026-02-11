import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  ShoppingCart,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  mockPortfolio,
  mockNotifications,
  mockStocks,
  formatCurrency,
  mockChartData,
} from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();

  const totalPortfolioValue = mockPortfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalGainLoss = mockPortfolio.reduce((sum, h) => sum + h.gainLoss, 0);
  const cashBalance = user?.cashBalance || 0;
  const totalValue = totalPortfolioValue + cashBalance;

  const stats = [
    {
      title: 'Available Cash',
      value: formatCurrency(cashBalance),
      change: null,
      icon: DollarSign,
      color: 'primary',
    },
    {
      title: 'Portfolio Value',
      value: formatCurrency(totalPortfolioValue),
      change: totalGainLoss >= 0 ? '+8.5%' : '-8.5%',
      isPositive: totalGainLoss >= 0,
      icon: Briefcase,
      color: totalGainLoss >= 0 ? 'gain' : 'loss',
    },
    {
      title: 'Open Orders',
      value: '3',
      change: null,
      icon: ShoppingCart,
      color: 'warning',
    },
    {
      title: 'Notifications',
      value: mockNotifications.filter((n) => !n.read).length.toString(),
      change: null,
      icon: Bell,
      color: 'primary',
    },
  ];

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Stock Trading Simulation</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}! Here's your trading overview.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gain animate-pulse" />
            <Badge variant="outline" className="border-gain/30 text-gain bg-gain/10">
              <span>Market Open</span>
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="stat-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1 tabular-nums">{stat.value}</p>
                      {stat.change && (
                        <div
                          className={cn(
                            'flex items-center gap-1 mt-1 text-sm',
                            stat.isPositive ? 'text-gain' : 'text-loss'
                          )}
                        >
                          {stat.isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        'p-3 rounded-xl',
                        stat.color === 'primary' && 'bg-primary/10',
                        stat.color === 'gain' && 'bg-gain/10',
                        stat.color === 'loss' && 'bg-loss/10',
                        stat.color === 'warning' && 'bg-warning/10'
                      )}
                    >
                      <stat.icon
                        className={cn(
                          'w-5 h-5',
                          stat.color === 'primary' && 'text-primary',
                          stat.color === 'gain' && 'text-gain',
                          stat.color === 'loss' && 'text-loss',
                          stat.color === 'warning' && 'text-warning'
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Today's portfolio value changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                        domain={['dataMin - 1', 'dataMax + 1']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary">
                    <span>{mockNotifications.filter((n) => !n.read).length} new</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockNotifications.slice(0, 4).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-3 rounded-lg border transition-colors',
                      !notification.read ? 'bg-muted/50 border-border' : 'border-transparent'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-2',
                          notification.type === 'success' && 'bg-gain',
                          notification.type === 'error' && 'bg-loss',
                          notification.type === 'warning' && 'bg-warning',
                          notification.type === 'info' && 'bg-primary'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Movers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Market Movers</CardTitle>
              <CardDescription>Stocks with the highest price changes today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockStocks.slice(0, 4).map((stock) => (
                  <div
                    key={stock.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{stock.ticker}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          stock.change >= 0
                            ? 'border-gain/30 text-gain bg-gain/10'
                            : 'border-loss/30 text-loss bg-loss/10'
                        )}
                      >
                        <span>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1 inline" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1 inline" />
                          )}
                          {stock.change >= 0 ? '+' : ''}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                    <p className="text-lg font-semibold mt-1 tabular-nums">
                      {formatCurrency(stock.price)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
