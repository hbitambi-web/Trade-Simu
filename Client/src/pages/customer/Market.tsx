import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockStocks, formatCurrency, formatNumber, mockChartData } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('change');

  const sectors = [...new Set(mockStocks.map((s) => s.sector))];

  const filteredStocks = mockStocks
    .filter((stock) => {
      const matchesSearch =
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = sectorFilter === 'all' || stock.sector === sectorFilter;
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return Math.abs(b.changePercent) - Math.abs(a.changePercent);
      return b.volume - a.volume;
    });

  // Simulate different chart data for each stock
  const generateStockChart = (basePrice: number, isPositive: boolean) => {
    return mockChartData.map((d, i) => ({
      ...d,
      price: basePrice + (isPositive ? i * 0.5 : -i * 0.5) + Math.random() * 2 - 1,
    }));
  };

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
          <h1 className="text-3xl font-bold">Simulated Market Trends</h1>
          <p className="text-muted-foreground mt-1">
            Track real-time stock prices and market movements
          </p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="border-gain/30 bg-gain/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Top Gainer</p>
                    <p className="text-2xl font-bold text-gain">
                      {mockStocks.reduce((a, b) => (a.changePercent > b.changePercent ? a : b)).ticker}
                    </p>
                    <p className="text-sm text-gain">
                      +{Math.max(...mockStocks.map((s) => s.changePercent)).toFixed(2)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-gain" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card className="border-loss/30 bg-loss/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Top Loser</p>
                    <p className="text-2xl font-bold text-loss">
                      {mockStocks.reduce((a, b) => (a.changePercent < b.changePercent ? a : b)).ticker}
                    </p>
                    <p className="text-sm text-loss">
                      {Math.min(...mockStocks.map((s) => s.changePercent)).toFixed(2)}%
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-loss" />
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Most Active</p>
                    <p className="text-2xl font-bold">
                      {mockStocks.reduce((a, b) => (a.volume > b.volume ? a : b)).ticker}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatNumber(Math.max(...mockStocks.map((s) => s.volume)))} vol
                    </p>
                  </div>
                  <ArrowUpDown className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ticker or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="w-full sm:w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="change">% Change</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="hidden md:table-cell">Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="hidden lg:table-cell text-right">Volume</TableHead>
                    <TableHead className="hidden lg:table-cell text-right">Market Cap</TableHead>
                    <TableHead className="hidden xl:table-cell w-32">Chart</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStocks.map((stock) => (
                    <TableRow key={stock.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-bold">{stock.ticker}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{stock.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <p className="truncate max-w-[200px]">{stock.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {stock.sector}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatCurrency(stock.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={cn(
                            'inline-flex items-center gap-1',
                            stock.change >= 0 ? 'text-gain' : 'text-loss'
                          )}
                        >
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="tabular-nums">
                            {stock.change >= 0 ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right tabular-nums">
                        {formatNumber(stock.volume)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-right">
                        {stock.marketCap}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="h-10 w-24">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={generateStockChart(stock.price, stock.change >= 0)}
                            >
                              <defs>
                                <linearGradient
                                  id={`gradient-${stock.id}`}
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor={
                                      stock.change >= 0
                                        ? 'hsl(var(--gain))'
                                        : 'hsl(var(--loss))'
                                    }
                                    stopOpacity={0.3}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor={
                                      stock.change >= 0
                                        ? 'hsl(var(--gain))'
                                        : 'hsl(var(--loss))'
                                    }
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <Area
                                type="monotone"
                                dataKey="price"
                                stroke={
                                  stock.change >= 0
                                    ? 'hsl(var(--gain))'
                                    : 'hsl(var(--loss))'
                                }
                                strokeWidth={1.5}
                                fill={`url(#gradient-${stock.id})`}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          Trade
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Market;
