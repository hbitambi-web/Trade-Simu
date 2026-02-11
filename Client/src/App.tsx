import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/customer/Dashboard";
import Profile from "./pages/customer/Profile";
import Training from "./pages/customer/Training";
import Market from "./pages/customer/Market";
import Trade from "./pages/customer/Trade";
import Portfolio from "./pages/customer/Portfolio";
import Transactions from "./pages/customer/Transactions";
import Notifications from "./pages/customer/Notifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStocks from "./pages/admin/ManageStocks";
import MarketControls from "./pages/admin/MarketControls";
import MarketSchedule from "./pages/admin/MarketSchedule";
import SystemOverview from "./pages/admin/SystemOverview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <div className="dark">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              {/* Customer Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/training" element={<Training />} />
              <Route path="/market" element={<Market />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/notifications" element={<Notifications />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/stocks" element={<ManageStocks />} />
              <Route path="/admin/controls" element={<MarketControls />} />
              <Route path="/admin/schedule" element={<MarketSchedule />} />
              <Route path="/admin/overview" element={<SystemOverview />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
