import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRoute = user?.role === 'candidate' ? '/profile' : user?.role === 'admin' ? '/admin/dashboard' : '/recruiter/dashboard';

  return (
    <header className="h-16 bg-[#DBEAFE] border-b border-slate-200 shadow-sm sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-blue-200 hover:text-slate-900"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 max-w-xl hidden sm:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white text-slate-800 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-blue-200 rounded-md transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-300"></div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 pr-2.5 hover:bg-blue-200 rounded-md border border-transparent"
          >
            <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-semibold text-xs">
              {user?.firstName?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.firstName} {user?.lastName?.charAt(0)}.</p>
              <p className="text-[11px] text-slate-600 capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-md py-1 z-20">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-500 mb-0.5">Signed in as</p>
                  <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                </div>

                <Link to={profileRoute} className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-sm">
                  <User size={16} />
                  My Profile
                </Link>
                <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-sm">
                  <Settings size={16} />
                  Settings
                </Link>

                <div className="h-px bg-slate-100 my-1"></div>

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-sm"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
