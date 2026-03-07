import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Users,
  Briefcase,
  FileText,
  UserPlus,
  TrendingUp,
  ChevronRight,
  ShieldAlert,
  Activity
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
        console.error('Error fetching admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-slate-600">Loading dashboard data...</p>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users },
    { title: 'Candidates', value: stats?.totalCandidates || 0, icon: UserPlus },
    { title: 'Recruiters', value: stats?.totalRecruiters || 0, icon: Briefcase },
    { title: 'Jobs Posted', value: stats?.totalJobs || 0, icon: TrendingUp },
    { title: 'Resumes Analyzed', value: stats?.totalResumesAnalyzed || 0, icon: FileText }
  ];

  const sections = [
    {
      title: 'User Management',
      description: 'View and moderate user accounts.',
      icon: Users,
      link: '/admin/users'
    },
    {
      title: 'Job Management',
      description: 'Review and moderate job postings.',
      icon: Briefcase,
      link: '/admin/jobs'
    },
    {
      title: 'System Moderation',
      description: 'Handle reports and moderation tasks.',
      icon: ShieldAlert,
      link: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
          <Activity size={20} className="text-slate-700" />
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1">Platform overview and management tools.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx}>
              <Icon size={18} className="text-slate-600 mb-3" />
              <p className="text-sm text-slate-600">{card.title}</p>
              <h3 className="text-2xl font-semibold text-slate-900 mt-1">{card.value}</h3>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <Link key={idx} to={section.link} className="flex h-full">
              <Card className="w-full flex flex-col">
                <Icon size={20} className="text-slate-700 mb-3" />
                <h3 className="text-lg font-medium text-slate-900">{section.title}</h3>
                <p className="text-sm text-slate-600 mt-1 flex-1">{section.description}</p>
                <div className="flex items-center gap-1 text-sm text-slate-700 mt-4">
                  Open
                  <ChevronRight size={14} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
