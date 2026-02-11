import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockNotifications, mockStocks } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface TopBarProps {
  isCollapsed?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ isCollapsed = false }) => {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketOpen, setMarketOpen] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;

  // Top gainers/losers for ticker
  const topGainers = mockStocks.filter((s) => s.change > 0).slice(0, 3);
  const topLosers = mockStocks.filter((s) => s.change < 0).slice(0, 3);

  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border h-16"
      style={{ width: `calc(100% - ${isCollapsed ? 80 : 280}px)` }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Market Status & Time */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-2 h-2 rounded-full animate-pulse',
                marketOpen ? 'bg-gain' : 'bg-loss'
              )}
            />
            <Badge
              variant="outline"
              className={cn(
                'font-medium',
                marketOpen
                  ? 'border-gain/30 text-gain bg-gain/10'
                  : 'border-loss/30 text-loss bg-loss/10'
              )}
            >
              Market {marketOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono tabular-nums">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </span>
          </div>

          {/* Mini Ticker */}
          {/* <div className="hidden lg:flex items-center gap-4 text-sm">
            {topGainers.slice(0, 2).map((stock) => (
              <div key={stock.ticker} className="flex items-center gap-1">
                <span className="font-medium">{stock.ticker}</span>
                <TrendingUp className="w-3 h-3 text-gain" />
                <span className="text-gain text-xs">+{stock.changePercent.toFixed(2)}%</span>
              </div>
            ))}
            {topLosers.slice(0, 1).map((stock) => (
              <div key={stock.ticker} className="flex items-center gap-1">
                <span className="font-medium">{stock.ticker}</span>
                <TrendingDown className="w-3 h-3 text-loss" />
                <span className="text-loss text-xs">{stock.changePercent.toFixed(2)}%</span>
              </div>
            ))}
          
          </div> 
          */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              className="pl-9 w-64 bg-muted/50 border-border focus:bg-background"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-loss text-loss-foreground text-xs flex items-center justify-center font-medium">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.slice(0, 4).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 cursor-pointer',
                    !notification.read && 'bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        notification.type === 'success' && 'bg-gain',
                        notification.type === 'error' && 'bg-loss',
                        notification.type === 'warning' && 'bg-warning',
                        notification.type === 'info' && 'bg-primary'
                      )}
                    />
                    <span className="font-medium text-sm">{notification.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {user?.name.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-loss focus:text-loss">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};
