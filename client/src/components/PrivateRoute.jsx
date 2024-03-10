import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { userCredentials } = useSelector((state) => state.auth);
  return userCredentials ? <Outlet /> : <Navigate to={'/login'} replace />;
}

export default PrivateRoute;
