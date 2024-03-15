import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { selectToken } from './authSlice';
import { useSelector } from 'react-redux'; 
const RequireAuth = () => {
  const token = useSelector(selectToken);
  return <>{token ? <Outlet /> : <Navigate to={'signin'} />}</>;
};

export default RequireAuth;
