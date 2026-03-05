import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  UserCircle, 
  Users, 
  FileSearch, 
  Bell, 
  Settings,
  Search,
  Briefcase,
  PlusCircle,
  List,
  Share2
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();

  const candidateItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Connections', path: '/connections', icon: Users },
    { name: 'AI Resume Analysis', path: '/resume-analysis', icon: FileSearch },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const recruiterItems = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Quick Search', path: '/recruiter/search', icon: Search },
    { name: 'Post Job', path: '/recruiter/create-job', icon: PlusCircle },
    { name: 'My Jobs', path: '/recruiter/jobs', icon: List },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const adminItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Job Management', path: '/admin/jobs', icon: Briefcase },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];
  
  const menuItems = user?.role === 'admin' ? adminItems : (user?.role === 'recruiter' ? recruiterItems : candidateItems);

  const getInitials = () => {
    if (!user) return '??';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white z-50 flex flex-col border-r border-slate-300 shadow-sm">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
          <Share2 size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">SmartHire</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 border ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold border-indigo-100 shadow-sm'
                  : 'text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-100 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-200">
          {user?.profileUrl ? (
            <img src={user.profileUrl} alt="profile" className="w-10 h-10 rounded-full object-cover border border-white shadow-sm" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold border border-slate-200 shadow-sm">
              {getInitials()}
            </div>
          )}
          <div className="overflow-hidden text-slate-900">
            <p className="text-sm font-bold truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            </p>
            <p className="text-xs text-slate-500 truncate font-semibold uppercase tracking-wider">
              {user?.role || 'Member'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
