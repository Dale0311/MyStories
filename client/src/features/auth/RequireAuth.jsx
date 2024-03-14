import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { selectToken } from './authSlice';
import { useSelector } from 'react-redux';
const RequireAuth = () => {
  const token = useSelector(selectToken);
  console.log(token);
  return <div>{token ? <Outlet /> : <Navigate to={'signin'} />}</div>;
};

export default RequireAuth;
