import { usePrefetch } from '@/src/app/apiSlice';
import React, { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
const PrefetchPosts = () => {
  const prefetch = usePrefetch('getPosts', { force: true });
  const prefetchData = useCallback(() => {
    prefetch();
  }, []);
  useEffect(() => {
    prefetchData();
  }, []);
  return <Outlet />;
};

export default PrefetchPosts;
