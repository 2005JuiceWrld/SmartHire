import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200 flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen flex flex-col border-l border-slate-300">
        <Navbar />
        <div className="p-8 flex-1">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
