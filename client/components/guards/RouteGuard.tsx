import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@shared/auth-types';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function RouteGuard({ 
  children, 
  requiredRole, 
  requireAuth = true,
  redirectTo = '/' 
}: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // Check authentication requirement
    if (requireAuth && !isAuthenticated) {
      navigate('/');
      return;
    }

    // Check role requirement
    if (requiredRole && user?.role !== requiredRole) {
      navigate(redirectTo);
      return;
    }
  }, [user, isAuthenticated, isLoading, requiredRole, requireAuth, redirectTo, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render content if user doesn't have access
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function RequireSeeker({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  return (
    <RouteGuard requiredRole="SEEKER" redirectTo={redirectTo}>
      {children}
    </RouteGuard>
  );
}

export function RequireEmployer({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  return (
    <RouteGuard requiredRole="EMPLOYER" redirectTo={redirectTo}>
      {children}
    </RouteGuard>
  );
}

export function RequireAuth({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  return (
    <RouteGuard requireAuth={true} redirectTo={redirectTo}>
      {children}
    </RouteGuard>
  );
}
