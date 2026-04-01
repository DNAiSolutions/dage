import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PortalLayout from "@/components/portal/PortalLayout";
import AdminLayout from "@/components/admin/AdminLayout";

import Index from "./pages/Index";
import About from "./pages/About";
import Parade from "./pages/Parade";
import Scholarships from "./pages/Scholarships";
import Court from "./pages/Court";
import Ball from "./pages/Ball";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Auth from "./pages/Auth";
import WaiverPublic from "./pages/WaiverPublic";
import Dashboard from "./pages/portal/Dashboard";
import Waivers from "./pages/portal/Waivers";
import Tracker from "./pages/portal/Tracker";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminWaivers from "./pages/admin/Waivers";
import AdminTracker from "./pages/admin/Tracker";
import NotFound from "./pages/NotFound";
import ProjectChecklist from "./components/ProjectChecklist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProjectChecklist />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public site */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/parade" element={<Parade />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/court" element={<Court />} />
            <Route path="/ball" element={<Ball />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />

            {/* Auth */}
            <Route path="/auth" element={<Auth />} />

            {/* Public waiver form */}
            <Route path="/waiver/:formId" element={<WaiverPublic />} />

            {/* Protected portal (dark theme) */}
            <Route path="/portal" element={<ProtectedRoute><PortalLayout><Dashboard /></PortalLayout></ProtectedRoute>} />
            <Route path="/portal/waivers" element={<ProtectedRoute><PortalLayout><Waivers /></PortalLayout></ProtectedRoute>} />
            <Route path="/portal/tracker" element={<ProtectedRoute><PortalLayout><Tracker /></PortalLayout></ProtectedRoute>} />

            {/* Protected admin portal (white theme) */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/waivers" element={<ProtectedRoute><AdminLayout><AdminWaivers /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/tracker" element={<ProtectedRoute><AdminLayout><AdminTracker /></AdminLayout></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
