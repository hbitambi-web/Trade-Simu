import { motion } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const SystemOverview = () => {
  const systemStats = [
    { name: 'API Uptime', value: 99.98, unit: '%', status: 'healthy' },
    { name: 'Database', value: 45, unit: 'ms', status: 'healthy' },
    { name: 'Memory Usage', value: 68, unit: '%', status: 'warning' },
    { name: 'CPU Load', value: 42, unit: '%', status: 'healthy' },
  ];

  const recentLogs = [
    { time: '14:32:15', level: 'info', message: 'Market opened successfully' },
    { time: '14:30:00', level: 'info', message: 'Daily backup completed' },
    { time: '14:28:45', level: 'warning', message: 'High memory usage detected' },
    { time: '14:25:12', level: 'info', message: 'Price update batch processed' },
    { time: '14:20:00', level: 'success', message: 'System health check passed' },
  ];

  const performanceData = [
    { time: '09:00', requests: 120 },
    { time: '10:00', requests: 450 },
    { time: '11:00', requests: 680 },
    { time: '12:00', requests: 520 },
    { time: '13:00', requests: 890 },
    { time: '14:00', requests: 750 },
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
            <h1 className="text-3xl font-bold">System Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor system health and performance
            </p>
          </div>
          <Badge variant="outline" className="border-gain/30 text-gain bg-gain/10 w-fit">
            <CheckCircle className="w-4 h-4 mr-2" />
            All Systems Operational
          </Badge>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-bold mt-1 tabular-nums">
                        {stat.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {stat.unit}
                        </span>
                      </p>
                    </div>
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full',
                        stat.status === 'healthy' && 'bg-gain',
                        stat.status === 'warning' && 'bg-warning',
                        stat.status === 'error' && 'bg-loss'
                      )}
                    />
                  </div>
                  <Progress
                    value={stat.name === 'API Uptime' ? stat.value : stat.value}
                    className={cn(
                      'h-2',
                      stat.status === 'warning' && '[&>div]:bg-warning'
                    )}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Traffic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Request Traffic
                </CardTitle>
                <CardDescription>API requests per hour</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
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
                      />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRequests)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  System Logs
                </CardTitle>
                <CardDescription>Recent system activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentLogs.map((log, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div
                        className={cn(
                          'p-1.5 rounded-lg',
                          log.level === 'success' && 'bg-gain/10',
                          log.level === 'info' && 'bg-primary/10',
                          log.level === 'warning' && 'bg-warning/10',
                          log.level === 'error' && 'bg-loss/10'
                        )}
                      >
                        {log.level === 'success' && (
                          <CheckCircle className="w-4 h-4 text-gain" />
                        )}
                        {log.level === 'info' && (
                          <Activity className="w-4 h-4 text-primary" />
                        )}
                        {log.level === 'warning' && (
                          <AlertCircle className="w-4 h-4 text-warning" />
                        )}
                        {log.level === 'error' && (
                          <AlertCircle className="w-4 h-4 text-loss" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{log.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure</CardTitle>
              <CardDescription>Server and database status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Server className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Web Server</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-gain" />
                      <span className="text-sm text-muted-foreground">Running</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-3 rounded-xl bg-gain/10">
                    <Database className="w-6 h-6 text-gain" />
                  </div>
                  <div>
                    <p className="font-medium">Database</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-gain" />
                      <span className="text-sm text-muted-foreground">Connected</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-3 rounded-xl bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium">Last Backup</p>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default SystemOverview;
