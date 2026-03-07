import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Sparkles,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    applications: 12,
    interviews: 3,
    profileViews: 145,
    matchRate: 85
  });

  const recentActivity = [
    { id: 1, title: 'Senior Frontend Engineer', company: 'Google', status: 'In Review', date: '2h ago' },
    { id: 2, title: 'Product Designer', company: 'Meta', status: 'High Match', date: '5h ago' },
    { id: 3, title: 'Technical Recruiter', company: 'Amazon', status: 'New Message', date: '1d ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Welcome back, {user?.firstName}</h2>
          <p className="text-sm text-slate-600 mt-1">Here is your latest activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon={FileText}>Update Resume</Button>
          <Button icon={Sparkles}>Match Jobs</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Applications', value: stats.applications, icon: Briefcase },
          { label: 'Interviews', value: stats.interviews, icon: Users },
          { label: 'Profile Views', value: stats.profileViews, icon: TrendingUp },
          { label: 'Match Score', value: `${stats.matchRate}%`, icon: Sparkles }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <div className="flex items-center justify-between mb-3">
                <Icon size={18} className="text-slate-600" />
                <Badge variant="success" dot>+12%</Badge>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <Clock size={18} className="text-slate-600" />
            Recent Activity
          </h3>
          {recentActivity.map((activity) => (
            <Card key={activity.id}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-900">{activity.title}</h4>
                  <p className="text-sm text-slate-600">{activity.company}</p>
                </div>
                <div className="text-right">
                  <Badge variant={activity.status === 'In Review' ? 'warning' : 'primary'} dot>
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900">Suggestions</h3>
          <Card>
            <h4 className="font-medium text-slate-900">Profile Tip</h4>
            <p className="text-sm text-slate-600 mt-1 mb-4">
              Adding updated skills can improve recruiter visibility.
            </p>
            <Button size="sm" className="w-full">Add Skill</Button>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-slate-700" />
              <h4 className="font-medium text-slate-900">Resume Status: Good</h4>
            </div>
            <p className="text-sm text-slate-600 mt-2">Last scanned 2 days ago.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
