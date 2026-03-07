import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex font-sans text-slate-900 bg-[#DBEAFE]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="max-w-6xl mx-auto bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">
            {children || <Outlet />}
          </div>
        </main>

        <footer className="px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-200 bg-[#DBEAFE]">
          <div className="max-w-6xl mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <span className="text-slate-600">&copy; {new Date().getFullYear()} SmartHire</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-900 transition-colors">Docs</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Status</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
