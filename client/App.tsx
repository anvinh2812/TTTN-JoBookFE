import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireSeeker, RequireEmployer } from "./components/guards/RouteGuard";
import RedirectToLanding from "./components/guards/RedirectToLanding";
import InitialRedirect from "./components/InitialRedirect";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import PostDetail from "./pages/PostDetail";
import Applications from "./pages/Applications";
import CVManagement from "./pages/CVManagement";
import EmployerPostList from "./pages/EmployerPostList";
import EmployerApplications from "./pages/EmployerApplications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main>{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <InitialRedirect>
            <Routes>
            {/* Landing page for unauthenticated users */}
            <Route path="/landing" element={<Landing />} />

            {/* Authenticated routes with redirect to landing if not logged in */}
            <Route
              path="/"
              element={
                <RedirectToLanding>
                  <Layout>
                    <Index />
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/create"
              element={
                <RedirectToLanding>
                  <Layout>
                    <CreatePost />
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/profile"
              element={
                <RedirectToLanding>
                  <Layout>
                    <Profile />
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/messages"
              element={
                <RedirectToLanding>
                  <Layout>
                    <Messages />
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/post/:id"
              element={
                <RedirectToLanding>
                  <Layout>
                    <PostDetail />
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/applications"
              element={
                <RedirectToLanding>
                  <Layout>
                    <Applications />
                  </Layout>
                </RedirectToLanding>
              }
            />

            {/* Seeker-only routes */}
            <Route
              path="/me/cv-management"
              element={
                <RedirectToLanding>
                  <Layout>
                    <RequireSeeker>
                      <CVManagement />
                    </RequireSeeker>
                  </Layout>
                </RedirectToLanding>
              }
            />

            {/* Employer-only routes */}
            <Route
              path="/me/posts"
              element={
                <RedirectToLanding>
                  <Layout>
                    <RequireEmployer>
                      <EmployerPostList />
                    </RequireEmployer>
                  </Layout>
                </RedirectToLanding>
              }
            />

            <Route
              path="/me/posts/:postId/applications"
              element={
                <RedirectToLanding>
                  <Layout>
                    <RequireEmployer>
                      <EmployerApplications />
                    </RequireEmployer>
                  </Layout>
                </RedirectToLanding>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </InitialRedirect>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
