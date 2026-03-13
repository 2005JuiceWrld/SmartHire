import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ThemeIcon from '../../components/common/ThemeIcon';

const stats = [
  { icon: 'Briefcase', value: 12, label: 'Applications', change: '+12%' },
  { icon: 'Users', value: 3, label: 'Interviews', change: '+12%' },
  { icon: 'TrendingUp', value: 145, label: 'Profile Views', change: '+12%' },
  { icon: 'Sparkles', value: '85%', label: 'Match Score', change: '+12%' }
];

const Dashboard = () => {
  const { user } = useAuth();

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
          <Button variant="outline" icon={(props) => <ThemeIcon name="FileText" {...props} />}>Update Resume</Button>
          <Button icon={(props) => <ThemeIcon name="Sparkles" {...props} />}>Match Jobs</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-[#7DD3FC] bg-[#F0F9FF]">
            <div className="flex items-center justify-between mb-3">
              <ThemeIcon name={stat.icon} size={18} />
              <Badge variant="success" dot>{stat.change}</Badge>
            </div>
            <p className="text-2xl font-semibold text-[#0EA5E9]">{stat.value}</p>
            <p className="text-sm text-slate-700 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <ThemeIcon name="Clock" size={18} />
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
              <ThemeIcon name="CheckCircle2" size={18} />
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
