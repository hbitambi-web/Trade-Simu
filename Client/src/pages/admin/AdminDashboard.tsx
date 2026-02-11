import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Database,
  Users,
  Activity,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MainLayout } from '@/components/layout/MainLayout';
import { adminStats, recentAdminActions, mockStocks } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Stocks',
      value: adminStats.totalStocks,
      icon: Database,
      color: 'primary',
    },
    {
      title: 'Active Traders',
      value: adminStats.activeTraders.toLocaleString(),
      icon: Users,
      color: 'gain',
    },
    {
      title: 'Total Transactions',
      value: adminStats.totalTransactions.toLocaleString(),
      icon: Activity,
      color: 'warning',
    },
    {
      title: 'Trading Volume',
      value: adminStats.tradingVolume,
      icon: TrendingUp,
      color: 'primary',
    },
  ];

  // Mock activity data
  const activityData = [
    { hour: '9AM', trades: 45 },
    { hour: '10AM', trades: 78 },
    { hour: '11AM', trades: 92 },
    { hour: '12PM', trades: 65 },
    { hour: '1PM', trades: 85 },
    { hour: '2PM', trades: 110 },
    { hour: '3PM', trades: 95 },
    { hour: '4PM', trades: 120 },
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage the trading platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gain animate-pulse" />
            <Badge variant="outline" className="border-gain/30 text-gain bg-gain/10">
              Market Open
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
                    </div>
                    <div
                      className={cn(
                        'p-3 rounded-xl',
                        stat.color === 'primary' && 'bg-primary/10',
                        stat.color === 'gain' && 'bg-gain/10',
                        stat.color === 'warning' && 'bg-warning/10'
                      )}
                    >
                      <stat.icon
                        className={cn(
                          'w-5 h-5',
                          stat.color === 'primary' && 'text-primary',
                          stat.color === 'gain' && 'text-gain',
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trading Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Trading Activity</CardTitle>
                <CardDescription>Number of trades per hour today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis
                        dataKey="hour"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Bar
                        dataKey="trades"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Actions</CardTitle>
                <CardDescription>Latest administrative activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAdminActions.map((action, index) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{action.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(action.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Traded Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Traded Stocks</CardTitle>
              <CardDescription>Most active stocks by volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {mockStocks.slice(0, 5).map((stock, index) => (
                  <div
                    key={stock.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{stock.ticker}</span>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                    <p className="text-lg font-semibold mt-2 tabular-nums">
                      ${stock.price.toFixed(2)}
                    </p>
                    <div
                      className={cn(
                        'flex items-center gap-1 text-sm mt-1',
                        stock.change >= 0 ? 'text-gain' : 'text-loss'
                      )}
                    >
                      <ArrowUpRight
                        className={cn('w-3 h-3', stock.change < 0 && 'rotate-90')}
                      />
                      {stock.change >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </div>
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

export default AdminDashboard;
