import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SunithaStoryPage from './pages/SunithaStoryPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import LandingPage from "@/pages/LandingPage.tsx";
import AppLayout from "@/AppLayout.tsx";

const Learn = lazy(() => import("./pages/Learn"));
const Products = lazy(() => import("./pages/Products"));
const ProductNew = lazy(() => import("./pages/ProductNew"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Stories = lazy(() => import("./pages/Stories"));
const StoriesNew = lazy(() => import("./pages/StoriesNew"));
const Messages = lazy(() => import("./pages/Messages"));
const Profile = lazy(() => import("./pages/Profile"));
const Progress = lazy(() => import("./pages/Progress"));
const InvestorConnect = lazy(() => import("./pages/InvestorConnect"));
const InvestorRequestNew = lazy(() => import("./pages/InvestorRequestNew"));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
                <Route element={<AppLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Index />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/learn/:id" element={<CourseDetailPage />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/new" element={<ProductNew />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/stories/new" element={<StoriesNew />} />
                    <Route path="/stories/sunitha" element={<SunithaStoryPage />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/investor-connect" element={<InvestorConnect />} />
                    <Route path="/investor-request/new" element={<InvestorRequestNew />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;