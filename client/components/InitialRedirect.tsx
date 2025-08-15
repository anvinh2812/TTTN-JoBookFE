import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function InitialRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // If on root path and not authenticated, redirect to landing
    if (location.pathname === '/' && !isAuthenticated) {
      navigate('/landing', { replace: true });
      return;
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  return <>{children}</>;
}
