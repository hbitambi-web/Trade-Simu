import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Profile = () => {
  const { user } = useAuth();

  const riskLevelColors = {
    low: 'text-gain bg-gain/10 border-gain/30',
    medium: 'text-warning bg-warning/10 border-warning/30',
    high: 'text-loss bg-loss/10 border-loss/30',
  };

  const statusColors = {
    active: 'text-gain bg-gain/10 border-gain/30',
    inactive: 'text-muted-foreground bg-muted border-border',
    suspended: 'text-loss bg-loss/10 border-loss/30',
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
          <h1 className="text-3xl font-bold">User Information</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <Badge
                    variant="outline"
                    className={cn('mt-3', statusColors[user?.accountStatus || 'active'])}
                  >
                    {user?.accountStatus === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {user?.accountStatus === 'suspended' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {user?.accountStatus?.charAt(0).toUpperCase()}
                    {user?.accountStatus?.slice(1)}
                  </Badge>
                  <Button className="w-full mt-6" variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Your trading account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">
                          {new Date(user?.joinedDate || '').toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Type</p>
                        <p className="font-medium capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cash Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Card className="trading-card-highlight h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Cash Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary tabular-nums">
                    {formatCurrency(user?.cashBalance || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Available for trading</p>
                  <div className="mt-6 space-y-2">
                    <Button className="w-full gradient-primary">Add Funds</Button>
                    <Button variant="outline" className="w-full">
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Your trading risk profile based on your activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Current Risk Level</span>
                  <Badge
                    variant="outline"
                    className={cn(riskLevelColors[user?.riskLevel || 'medium'])}
                  >
                    {user?.riskLevel === 'low' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {user?.riskLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {user?.riskLevel?.charAt(0).toUpperCase()}
                    {user?.riskLevel?.slice(1)} Risk
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gain">Low</span>
                    <span className="text-warning">Medium</span>
                    <span className="text-loss">High</span>
                  </div>
                  <Progress
                    value={user?.riskLevel === 'low' ? 25 : user?.riskLevel === 'high' ? 85 : 50}
                    className="h-3"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Your risk level is determined by your trading patterns, portfolio diversification,
                  and overall market exposure.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Profile;
