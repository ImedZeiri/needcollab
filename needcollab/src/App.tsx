import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NeedsList from "@/pages/client/NeedsList";
import NeedDetail from "@/pages/client/NeedDetail";
import CreateNeed from "@/pages/client/CreateNeed";
import MyNeeds from "@/pages/client/MyNeeds";
import CollaborationList from "@/pages/client/CollaborationList";
import Chat from "@/pages/client/Chat";
import VendorDashboard from "@/pages/vendor/VendorDashboard";
import Offers from "@/pages/vendor/Offers";
import CreateOffer from "@/pages/vendor/CreateOffer";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UsersManagement from "@/pages/admin/UsersManagement";
import NeedsModeration from "@/pages/admin/NeedsModeration";
import VendorsVerification from "@/pages/admin/VendorsVerification";
import Analytics from "@/pages/admin/Analytics";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/needs" element={<NeedsList />} />
              <Route path="/needs/:id" element={<NeedDetail />} />

              {/* Client protected */}
              <Route element={<ProtectedRoute roles={['client']} />}>
                <Route path="/create" element={<CreateNeed />} />
                <Route path="/my-needs" element={<MyNeeds />} />
                <Route path="/collaborations" element={<CollaborationList />} />
                <Route path="/chat/:collaborationId" element={<Chat />} />
              </Route>

              {/* Vendor protected */}
              <Route element={<ProtectedRoute roles={['vendor']} />}>
                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                <Route path="/vendor/offers" element={<Offers />} />
                <Route path="/vendor/offers/create" element={<CreateOffer />} />
              </Route>

              {/* Admin protected */}
              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UsersManagement />} />
                <Route path="/admin/needs" element={<NeedsModeration />} />
                <Route path="/admin/vendors" element={<VendorsVerification />} />
                <Route path="/admin/analytics" element={<Analytics />} />
              </Route>

              {/* Authenticated */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
