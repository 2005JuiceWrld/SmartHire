import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Island from '../../components/Island';
import { 
  Users, 
  Briefcase, 
  FileText, 
  UserPlus, 
  TrendingUp, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/admin/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Candidates', value: stats?.totalCandidates || 0, icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Recruiters', value: stats?.totalRecruiters || 0, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Jobs Posted', value: stats?.totalJobs || 0, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Resumes Analyzed', value: stats?.totalResumesAnalyzed || 0, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const sections = [
    {
      title: 'User Management',
      description: 'View, edit, and moderate user accounts across the platform.',
      icon: Users,
      link: '/admin/users',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Job Post Management',
      description: 'Review and moderate job listings posted by recruiters.',
      icon: Briefcase,
      link: '/admin/jobs',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Reports / Moderation',
      description: 'Handle reported content and platform-wide moderation tasks.',
      icon: ShieldAlert,
      link: '#', // Placeholder for now
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <Island className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Platform overview and management tools.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm transition-all group">
            <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4 border border-slate-100`}>
                <card.icon size={24} />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <Link 
            key={idx} 
            to={section.link}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-300 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group flex flex-col"
          >
            <div className={`w-16 h-16 rounded-2xl ${section.bg} ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <section.icon size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">{section.title}</h3>
            <p className="text-slate-500 font-medium mb-8 flex-1">{section.description}</p>
            <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest">
              Manage Now
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </Island>
  );
};

export default AdminDashboard;
