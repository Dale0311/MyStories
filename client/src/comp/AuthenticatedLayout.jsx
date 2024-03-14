import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';
const AuthenticatedLayout = () => {
  return (
    <div className="w-4/5 mx-auto h-screen flex">
      <div className="w-1/4 h-full">
        <div className="h-full flex flex-col">
          <Navbar />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <div className="w-1/4 h-full p-4">
        <div className="h-full flex flex-col">
          <SideBar />
        </div>
      </div>
    </div>

    // <div className="w-4/5 min-h-screen mx-auto flex ">
    //   <div className="w-1/4 max-h-screen flex-shrink-0">
    //     <Navbar />
    //   </div>
    //   <div className="flex-1 border-x overflow-y-auto">
    //     <Outlet />
    //   </div>
    //   <div className="w-1/4 max-h-screen flex-shrink-0 p-4">
    //     <SideBar />
    //   </div>
    // </div>
  );
};

export default AuthenticatedLayout;
