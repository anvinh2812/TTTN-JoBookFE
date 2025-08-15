import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RedirectToLandingProps {
  children: React.ReactNode;
}

export default function RedirectToLanding({ children }: RedirectToLandingProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // If user is not authenticated, redirect to landing
    if (!isAuthenticated) {
      navigate('/landing', { replace: true });
      return;
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render content if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
