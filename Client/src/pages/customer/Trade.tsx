import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, TrendingUp, TrendingDown, ShoppingCart, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { mockStocks, mockPortfolio, formatCurrency, Stock } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Trade = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const totalCost = selectedStock ? selectedStock.price * (parseInt(quantity) || 0) : 0;
  const insufficientFunds = tradeType === 'buy' && totalCost > (user?.cashBalance || 0);

  const handleTrade = () => {
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    toast({
      title: `Order ${tradeType === 'buy' ? 'Placed' : 'Submitted'}`,
      description: `${tradeType === 'buy' ? 'Buy' : 'Sell'} order for ${quantity} shares of ${selectedStock?.ticker} has been placed.`,
    });
  };

  const resetForm = () => {
    setSelectedStock(null);
    setQuantity('');
    setShowSuccessDialog(false);
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
          <h1 className="text-3xl font-bold">Trade Stocks</h1>
          <p className="text-muted-foreground mt-1">
            Buy and sell stocks in the simulated market
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trade Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowLeftRight className="w-5 h-5" />
                  Place Order
                </CardTitle>
                <CardDescription>
                  Available cash: {formatCurrency(user?.cashBalance || 0)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs
                  value={tradeType}
                  onValueChange={(v) => setTradeType(v as 'buy' | 'sell')}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-gain data-[state=active]:text-gain-foreground">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-loss data-[state=active]:text-loss-foreground">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label>Select Stock</Label>
                  <Select
                    value={selectedStock?.id || ''}
                    onValueChange={(v) =>
                      setSelectedStock(mockStocks.find((s) => s.id === v) || null)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStocks.map((stock) => (
                        <SelectItem key={stock.id} value={stock.id}>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{stock.ticker}</span>
                            <span className="text-muted-foreground">
                              {formatCurrency(stock.price)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStock && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{selectedStock.ticker}</p>
                        <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold tabular-nums">
                          {formatCurrency(selectedStock.price)}
                        </p>
                        <div
                          className={cn(
                            'flex items-center gap-1 text-sm',
                            selectedStock.change >= 0 ? 'text-gain' : 'text-loss'
                          )}
                        >
                          {selectedStock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {selectedStock.change >= 0 ? '+' : ''}
                          {selectedStock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                  />
                </div>

                {quantity && selectedStock && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Total</span>
                      <span className="font-bold tabular-nums">{formatCurrency(totalCost)}</span>
                    </div>
                    {insufficientFunds && (
                      <div className="flex items-center gap-2 text-sm text-loss">
                        <AlertCircle className="w-4 h-4" />
                        <span>Insufficient funds</span>
                      </div>
                    )}
                  </motion.div>
                )}

                <Button
                  className={cn(
                    'w-full',
                    tradeType === 'buy' ? 'gradient-gain' : 'bg-loss hover:bg-loss/90'
                  )}
                  disabled={!selectedStock || !quantity || insufficientFunds}
                  onClick={() => setShowConfirmDialog(true)}
                >
                  {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedStock?.ticker || 'Stock'}
                </Button>

                <Button variant="outline" className="w-full">
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Available Stocks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Available Stocks</CardTitle>
                <CardDescription>Click on a stock to start trading</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="hidden sm:table-cell">Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStocks.map((stock) => (
                      <TableRow
                        key={stock.id}
                        className={cn(
                          'cursor-pointer transition-colors',
                          selectedStock?.id === stock.id && 'bg-primary/10'
                        )}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <TableCell>
                          <p className="font-bold">{stock.ticker}</p>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <p className="truncate max-w-[150px]">{stock.name}</p>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {formatCurrency(stock.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              stock.change >= 0
                                ? 'border-gain/30 text-gain bg-gain/10'
                                : 'border-loss/30 text-loss bg-loss/10'
                            )}
                          >
                            {stock.change >= 0 ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStock(stock);
                              setTradeType('buy');
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Confirm Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}</DialogTitle>
              <DialogDescription>
                Please review your order before confirming
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span>Stock</span>
                <span className="font-bold">{selectedStock?.ticker}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span>Quantity</span>
                <span className="font-bold tabular-nums">{quantity} shares</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span>Price per share</span>
                <span className="font-bold tabular-nums">
                  {formatCurrency(selectedStock?.price || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-primary/30 bg-primary/5">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold tabular-nums">{formatCurrency(totalCost)}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button
                className={tradeType === 'buy' ? 'gradient-gain' : 'bg-loss hover:bg-loss/90'}
                onClick={handleTrade}
              >
                Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-gain" />
                Order Placed Successfully
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                Your {tradeType} order for {quantity} shares of {selectedStock?.ticker} has been
                placed successfully.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={resetForm} className="w-full gradient-primary">
                Place Another Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default Trade;
