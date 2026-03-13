import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeIcon from '../common/ThemeIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const candidateLinks = [
    { name: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
    { name: 'Profile', icon: 'UserCircle', path: '/profile' },
    { name: 'Resume Analysis', icon: 'FileSearch', path: '/resume-analysis' },
    { name: 'Connections', icon: 'Users', path: '/connections' },
    { name: 'Notifications', icon: 'Bell', path: '/notifications' },
    { name: 'Settings', icon: 'Settings', path: '/settings' },
  ];

  const recruiterLinks = [
    { name: 'Dashboard', icon: 'LayoutDashboard', path: '/recruiter/dashboard' },
    { name: 'Talent Search', icon: 'Search', path: '/recruiter/search' },
    { name: 'My Jobs', icon: 'Briefcase', path: '/recruiter/jobs' },
    { name: 'Create Job', icon: 'PlusCircle', path: '/recruiter/create-job' },
    { name: 'Notifications', icon: 'Bell', path: '/notifications' },
    { name: 'Settings', icon: 'Settings', path: '/settings' },
  ];

  const adminLinks = [
    { name: 'Dashboard', icon: 'LayoutDashboard', path: '/admin/dashboard' },
    { name: 'Users', icon: 'Users', path: '/admin/users' },
    { name: 'Jobs', icon: 'Briefcase', path: '/admin/jobs' },
    { name: 'Notifications', icon: 'Bell', path: '/notifications' },
    { name: 'Settings', icon: 'Settings', path: '/settings' },
  ];

  const links = user?.role === 'admin'
    ? adminLinks
    : user?.role === 'recruiter'
      ? recruiterLinks
      : candidateLinks;

  const profileRoute = user?.role === 'candidate' ? '/profile' : user?.role === 'admin' ? '/admin/dashboard' : '/recruiter/dashboard';

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 bg-blue-200/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`w-64 bg-[#DBEAFE] h-screen fixed left-0 top-0 border-r border-slate-200 shadow-sm flex flex-col z-50 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <ThemeIcon name="Sparkles" size={16} className="brightness-0 invert" />
          </div>
          <span className="text-lg font-semibold text-slate-900">SmartHire</span>
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-blue-200"
          onClick={onClose}
        >
          <ThemeIcon name="X" size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-medium text-slate-500 px-3 mb-2">
          Navigation
        </div>
        {links.map((link) => {
          return (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2.5 rounded-md transition-colors group text-sm
                ${isActive 
                  ? 'bg-blue-600 text-white font-medium active-link border border-blue-500' 
                  : 'text-slate-700 hover:bg-blue-200 hover:text-slate-900 border border-transparent'}
              `}
            >
              <div className="flex items-center gap-3">
                <ThemeIcon name={link.icon} size={16} className="group-[.active-link]:brightness-0 group-[.active-link]:invert" />
                <span>{link.name}</span>
              </div>
              <ThemeIcon name="ChevronRight" size={14} className="opacity-0 group-hover:opacity-100" />
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <Link
          to={profileRoute}
          onClick={onClose}
          className="flex items-center gap-2.5 p-2.5 rounded-md hover:bg-blue-200 transition-colors"
        >
          <div className="w-9 h-9 rounded-md bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {user?.firstName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-600 capitalize truncate">
              {user?.role || 'Member'}
            </p>
          </div>
        </Link>

        <button
          onClick={() => {
            onClose();
            logout();
          }}
          className="w-full mt-1.5 flex items-center gap-2 px-3 py-2 rounded-md text-slate-700 hover:text-red-600 hover:bg-red-100 transition-colors text-sm"
        >
          <ThemeIcon name="LogOut" size={16} />
          <span>Sign Out</span>
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
