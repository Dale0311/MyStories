import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { selectToken } from './authSlice';
import { useSelector } from 'react-redux';
const NoAuthRequire = () => {
  const token = useSelector(selectToken);
  return <>{!token ? <Outlet /> : <Navigate replace to={'/'} />}</>;
};

export default NoAuthRequire;
