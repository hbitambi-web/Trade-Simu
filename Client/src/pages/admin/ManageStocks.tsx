import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockStocks, formatCurrency, formatNumber, Stock } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const ManageStocks = () => {
  const { toast } = useToast();
  const [stocks, setStocks] = useState(mockStocks);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [formData, setFormData] = useState({
    ticker: '',
    name: '',
    price: '',
    volume: '',
    sector: '',
  });

  const sectors = ['Technology', 'Financial', 'Healthcare', 'Consumer Discretionary', 'Energy'];

  const filteredStocks = stocks.filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStock = () => {
    const newStock: Stock = {
      id: Date.now().toString(),
      ticker: formData.ticker.toUpperCase(),
      name: formData.name,
      price: parseFloat(formData.price),
      change: 0,
      changePercent: 0,
      volume: parseInt(formData.volume),
      marketCap: '1B',
      sector: formData.sector,
      high52w: parseFloat(formData.price) * 1.2,
      low52w: parseFloat(formData.price) * 0.8,
    };
    setStocks([...stocks, newStock]);
    setShowAddDialog(false);
    setFormData({ ticker: '', name: '', price: '', volume: '', sector: '' });
    toast({
      title: 'Stock Added',
      description: `${newStock.ticker} has been added to the market.`,
    });
  };

  const handleEditStock = () => {
    if (!editingStock) return;
    setStocks(
      stocks.map((s) =>
        s.id === editingStock.id
          ? {
              ...s,
              ticker: formData.ticker.toUpperCase(),
              name: formData.name,
              price: parseFloat(formData.price),
              volume: parseInt(formData.volume),
              sector: formData.sector,
            }
          : s
      )
    );
    setShowEditDialog(false);
    setEditingStock(null);
    toast({
      title: 'Stock Updated',
      description: `${formData.ticker.toUpperCase()} has been updated.`,
    });
  };

  const handleDeleteStock = (stock: Stock) => {
    setStocks(stocks.filter((s) => s.id !== stock.id));
    toast({
      title: 'Stock Deleted',
      description: `${stock.ticker} has been removed from the market.`,
    });
  };

  const openEditDialog = (stock: Stock) => {
    setEditingStock(stock);
    setFormData({
      ticker: stock.ticker,
      name: stock.name,
      price: stock.price.toString(),
      volume: stock.volume.toString(),
      sector: stock.sector,
    });
    setShowEditDialog(true);
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Stocks</h1>
            <p className="text-muted-foreground mt-1">Add, edit, and remove stocks from the market</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
                <DialogDescription>Enter the details for the new stock</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ticker Symbol</Label>
                    <Input
                      placeholder="e.g., AAPL"
                      value={formData.ticker}
                      onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Price</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 150.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    placeholder="e.g., Apple Inc."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 1000000"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sector</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(v) => setFormData({ ...formData, sector: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button className="gradient-primary" onClick={handleAddStock}>
                  Add Stock
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stocks Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStocks.map((stock) => (
                    <TableRow key={stock.id}>
                      <TableCell className="font-bold">{stock.ticker}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(stock.price)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatNumber(stock.volume)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{stock.sector}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(stock)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-loss hover:text-loss"
                            onClick={() => handleDeleteStock(stock)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Stock</DialogTitle>
              <DialogDescription>Update the stock details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ticker Symbol</Label>
                  <Input
                    value={formData.ticker}
                    onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Input
                    type="number"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(v) => setFormData({ ...formData, sector: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button className="gradient-primary" onClick={handleEditStock}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default ManageStocks;
