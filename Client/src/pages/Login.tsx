import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Shield, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'mfa' | 'role' | 'createAccount'>('credentials');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'admin'>('customer');
  const [otp, setOtp] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('mfa');
  };

  const handleMfaSubmit = () => {
    if (otp.length === 6) {
      setStep('role');
    }
  };

  const handleLogin = () => {
    login(selectedRole);
    navigate(selectedRole === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created successfully!'); // replace with backend logic later
    setStep('credentials');
  };

  return (
    <div className="min-h-screen bg-background dark flex">
      {/* Left Panel - Branding (unchanged) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 gradient-dark relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gain/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-center p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">TradeSimu</h1>
                <p className="text-muted-foreground">Stock Trading Simulation</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
              Master the art of<br />
              <span className="text-primary">stock trading</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Practice trading with real market data in a risk-free environment. 
              Build your skills before investing real money.
            </p>

            <div className="space-y-4">
              {[
                'Real-time market simulation',
                'Comprehensive training modules',
                'Risk-free portfolio management',
                'Advanced trading analytics',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gain" />
                  <span className="text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">TradeSimu</span>
            </div>

            <CardTitle className="text-2xl">
              {step === 'credentials' && 'Welcome back'}
              {step === 'mfa' && 'Two-Factor Authentication'}
              {step === 'role' && 'Select Your Role'}
              {step === 'createAccount' && 'Create Your Account'}
            </CardTitle>

            <CardDescription>
              {step === 'credentials' && 'Enter your credentials to access your account'}
              {step === 'mfa' && 'Enter the 6-digit code from your authenticator app'}
              {step === 'role' && 'Choose how you want to access the platform'}
              {step === 'createAccount' && 'Fill out the form below to register a new account'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Login Form */}
            {step === 'credentials' && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCredentialsSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="username" placeholder="Enter your username" className="pl-10" defaultValue="demo_user" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      defaultValue="password123"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Account Creation Link */}
                <div className="flex justify-center mt-2 text-sm text-muted-foreground">
                  <span>Don't have an account?</span>
                  <button
                    type="button"
                    onClick={() => setStep('createAccount')}
                    className="ml-1 text-primary hover:underline"
                  >
                    Create one
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-gain" />
                  <span>Secured with 256-bit encryption</span>
                </div>
              </motion.form>
            )}

            {/* MFA Step */}
            {step === 'mfa' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  onClick={handleMfaSubmit}
                  disabled={otp.length !== 6}
                  className="w-full gradient-primary hover:opacity-90"
                >
                  Verify <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <button
                  onClick={() => setStep('credentials')}
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to login
                </button>
              </motion.div>
            )}

            {/* Role Selection Step */}
            {step === 'role' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Tabs
                  defaultValue="customer"
                  onValueChange={(value) => setSelectedRole(value as 'customer' | 'admin')}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  </TabsList>
                  <TabsContent value="customer" className="mt-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <h3 className="font-medium mb-2">Customer Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Access trading features, portfolio management, training modules, and market analysis.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="admin" className="mt-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <h3 className="font-medium mb-2">Admin Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage stocks, control market settings, view system analytics, and configure platform settings.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button onClick={handleLogin} className="w-full gradient-primary hover:opacity-90">
                  Login as {selectedRole === 'admin' ? 'Admin' : 'Customer'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <button
                  onClick={() => setStep('mfa')}
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                >
                  Back
                </button>
              </motion.div>
            )}

            {/* Account Creation Step */}
            {step === 'createAccount' && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleCreateAccountSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="newUsername">Username</Label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="newUsername" placeholder="Enter username" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password</Label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input id="newPassword" type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="pl-10 pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Create Account <CheckCircle className="w-4 h-4 ml-2" />
                </Button>

                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full text-sm text-muted-foreground hover:text-foreground mt-2"
                >
                  Back to Login
                </button>
              </motion.form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
