import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Search,
  PlusCircle,
  TrendingUp,
  MessageSquare,
  Filter,
  MoreVertical
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const RecruiterDashboard = () => {
  const [stats] = useState({
    activeJobs: 5,
    totalApplicants: 128,
    newApplications: 24,
    interviewing: 12
  });

  const activeJobs = [
    { id: 1, title: 'Senior React Developer', applicants: 45, status: 'Active', matches: 12 },
    { id: 2, title: 'UX/UI Designer', applicants: 28, status: 'Active', matches: 8 },
    { id: 3, title: 'Backend Lead', applicants: 15, status: 'Urgent', matches: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Recruiter Dashboard</h2>
          <p className="text-sm text-slate-600 mt-1">
            Managing {stats.activeJobs} active job postings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" icon={Filter}>Filter</Button>
          <Button icon={PlusCircle}>Post Job</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase },
          { label: 'Total Applicants', value: stats.totalApplicants, icon: Users },
          { label: 'New This Week', value: stats.newApplications, icon: TrendingUp },
          { label: 'In Interview', value: stats.interviewing, icon: MessageSquare }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <Icon size={18} className="text-slate-600 mb-3" />
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-900">Active Job Postings</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          {activeJobs.map((job) => (
            <Card key={job.id} noPadding>
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-900">{job.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {job.applicants} Applicants • {job.matches} Matches
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={job.status === 'Urgent' ? 'danger' : 'success'} dot>{job.status}</Badge>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex justify-between items-center">
                <p className="text-xs text-slate-500">Last updated: Today</p>
                <Button variant="ghost" size="sm">Review Applications</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900">Talent Discovery</h3>
          <Card>
            <h4 className="font-medium text-slate-900 flex items-center gap-2">
              <Search size={16} className="text-slate-600" />
              Suggested Matches
            </h4>
            <p className="text-sm text-slate-600 mt-2 mb-4">
              8 candidates match your active React role.
            </p>
            <Button size="sm" className="w-full">View Matches</Button>
          </Card>

          <Card>
            <h4 className="font-medium text-slate-900 mb-3">Quick Insights</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Time to Fill</p>
                <p className="font-medium text-slate-900">18 Days</p>
              </div>
              <div>
                <p className="text-slate-500">Offer Accept Rate</p>
                <p className="font-medium text-slate-900">92%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
