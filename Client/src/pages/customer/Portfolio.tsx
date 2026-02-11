import { motion } from 'framer-motion';
import { Briefcase, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockPortfolio, formatCurrency } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio = () => {
  const { user } = useAuth();

  const totalPortfolioValue = mockPortfolio.reduce((sum, h) => sum + h.currentValue, 0);
  const totalGainLoss = mockPortfolio.reduce((sum, h) => sum + h.gainLoss, 0);
  const totalCost = mockPortfolio.reduce((sum, h) => sum + h.avgCost * h.quantity, 0);
  const totalGainLossPercent = ((totalPortfolioValue - totalCost) / totalCost) * 100;
  const cashBalance = user?.cashBalance || 0;
  const totalValue = totalPortfolioValue + cashBalance;

  // Pie chart data
  const pieData = [
    { name: 'Cash', value: cashBalance, color: 'hsl(var(--primary))' },
    ...mockPortfolio.map((holding, index) => ({
      name: holding.stock.ticker,
      value: holding.currentValue,
      color: `hsl(${(index * 60 + 142) % 360} 70% 50%)`,
    })),
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
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your investment holdings
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="trading-card-highlight">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">
                      {formatCurrency(totalValue)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cash Balance</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">
                      {formatCurrency(cashBalance)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Holdings Value</p>
                    <p className="text-2xl font-bold mt-1 tabular-nums">
                      {formatCurrency(totalPortfolioValue)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gain/10">
                    <PieChart className="w-5 h-5 text-gain" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Card className={totalGainLoss >= 0 ? 'border-gain/30' : 'border-loss/30'}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                    <p
                      className={cn(
                        'text-2xl font-bold mt-1 tabular-nums',
                        totalGainLoss >= 0 ? 'text-gain' : 'text-loss'
                      )}
                    >
                      {totalGainLoss >= 0 ? '+' : ''}
                      {formatCurrency(totalGainLoss)}
                    </p>
                    <p
                      className={cn(
                        'text-sm',
                        totalGainLoss >= 0 ? 'text-gain' : 'text-loss'
                      )}
                    >
                      {totalGainLossPercent >= 0 ? '+' : ''}
                      {totalGainLossPercent.toFixed(2)}%
                    </p>
                  </div>
                  <div
                    className={cn(
                      'p-3 rounded-xl',
                      totalGainLoss >= 0 ? 'bg-gain/10' : 'bg-loss/10'
                    )}
                  >
                    {totalGainLoss >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-gain" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-loss" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Portfolio Chart & Holdings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium tabular-nums">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Holdings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Holdings</CardTitle>
                <CardDescription>Your current stock positions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Avg Cost</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead className="text-right">Gain/Loss</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPortfolio.map((holding) => (
                      <TableRow key={holding.id}>
                        <TableCell>
                          <div>
                            <p className="font-bold">{holding.stock.ticker}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[100px]">
                              {holding.stock.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{holding.quantity}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCurrency(holding.avgCost)}
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {formatCurrency(holding.currentValue)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div
                            className={cn(
                              'flex flex-col items-end',
                              holding.gainLoss >= 0 ? 'text-gain' : 'text-loss'
                            )}
                          >
                            <span className="font-medium tabular-nums">
                              {holding.gainLoss >= 0 ? '+' : ''}
                              {formatCurrency(holding.gainLoss)}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                'mt-1',
                                holding.gainLoss >= 0
                                  ? 'border-gain/30 text-gain bg-gain/10'
                                  : 'border-loss/30 text-loss bg-loss/10'
                              )}
                            >
                              {holding.gainLoss >= 0 ? '+' : ''}
                              {holding.gainLossPercent.toFixed(2)}%
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Portfolio;
