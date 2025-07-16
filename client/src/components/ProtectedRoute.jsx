import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user, checkAuth } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await checkAuth();
      setLoading(false);
    })();
  }, [checkAuth]);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
