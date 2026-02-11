import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToggleLeft, Power, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/components/layout/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const MarketControls = () => {
  const { toast } = useToast();
  const [marketOpen, setMarketOpen] = useState(true);

  const toggleMarket = () => {
    const newStatus = !marketOpen;
    setMarketOpen(newStatus);
    toast({
      title: newStatus ? 'Market Opened' : 'Market Closed',
      description: newStatus
        ? 'Trading is now enabled for all users.'
        : 'Trading has been halted.',
    });
  };

  const scheduleItems = [
    { day: 'Monday', open: '09:30 AM', close: '04:00 PM', status: 'active' },
    { day: 'Tuesday', open: '09:30 AM', close: '04:00 PM', status: 'active' },
    { day: 'Wednesday', open: '09:30 AM', close: '04:00 PM', status: 'active' },
    { day: 'Thursday', open: '09:30 AM', close: '04:00 PM', status: 'active' },
    { day: 'Friday', open: '09:30 AM', close: '04:00 PM', status: 'active' },
    { day: 'Saturday', open: '-', close: '-', status: 'closed' },
    { day: 'Sunday', open: '-', close: '-', status: 'closed' },
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
          <h1 className="text-3xl font-bold">Market Controls</h1>
          <p className="text-muted-foreground mt-1">
            Manage market status and trading settings
          </p>
        </div>

        {/* Market Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Card
            className={cn(
              'trading-card-highlight',
              marketOpen ? 'border-gain/30' : 'border-loss/30'
            )}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div
                    className={cn(
                      'w-20 h-20 rounded-2xl flex items-center justify-center',
                      marketOpen ? 'bg-gain/10' : 'bg-loss/10'
                    )}
                  >
                    <Power
                      className={cn(
                        'w-10 h-10',
                        marketOpen ? 'text-gain' : 'text-loss'
                      )}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Market is{' '}
                      <span className={marketOpen ? 'text-gain' : 'text-loss'}>
                        {marketOpen ? 'Open' : 'Closed'}
                      </span>
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {marketOpen
                        ? 'Trading is currently enabled for all users'
                        : 'Trading has been halted'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          marketOpen ? 'bg-gain animate-pulse' : 'bg-loss'
                        )}
                      />
                      <span className="text-sm text-muted-foreground">
                        {marketOpen ? 'Live trading active' : 'All orders paused'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className={cn(
                    'min-w-[200px]',
                    marketOpen ? 'bg-loss hover:bg-loss/90' : 'gradient-gain'
                  )}
                  onClick={toggleMarket}
                >
                  {marketOpen ? 'Close Market' : 'Open Market'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Trading Controls</CardTitle>
                <CardDescription>Quick toggles for market features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gain" />
                    <div>
                      <Label className="text-base">Allow Buy Orders</Label>
                      <p className="text-sm text-muted-foreground">Enable purchase transactions</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gain" />
                    <div>
                      <Label className="text-base">Allow Sell Orders</Label>
                      <p className="text-sm text-muted-foreground">Enable sell transactions</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <div>
                      <Label className="text-base">Limit Orders</Label>
                      <p className="text-sm text-muted-foreground">Allow limit order types</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <Label className="text-base">After-Hours Trading</Label>
                      <p className="text-sm text-muted-foreground">Enable extended hours</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Market Schedule</CardTitle>
                <CardDescription>Regular trading hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduleItems.map((item, index) => (
                    <div
                      key={item.day}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg',
                        item.status === 'active' ? 'bg-muted/50' : 'bg-muted/20 opacity-60'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full',
                            item.status === 'active' ? 'bg-gain' : 'bg-muted-foreground'
                          )}
                        />
                        <span className="font-medium">{item.day}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {item.status === 'active' ? (
                          <>
                            <span className="text-sm text-muted-foreground">{item.open}</span>
                            <span className="text-muted-foreground">-</span>
                            <span className="text-sm text-muted-foreground">{item.close}</span>
                          </>
                        ) : (
                          <Badge variant="secondary">Closed</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default MarketControls;
