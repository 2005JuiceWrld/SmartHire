import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, LogOut, Menu, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 px-8 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full bg-slate-100 border border-slate-300 rounded-2xl flex items-center transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500">
          <Search className="absolute left-4 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search for skills, people or jobs..."
            className="w-full pl-12 pr-4 py-3 bg-transparent outline-none transition-all placeholder:text-slate-500 text-slate-900 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user?.role === 'admin' && (
          <Link 
            to="/admin/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100"
          >
            <Shield size={18} />
            <span>Admin Panel</span>
          </Link>
        )}
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
        >
          <LogOut size={18} className="text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
