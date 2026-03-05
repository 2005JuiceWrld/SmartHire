import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, List, Briefcase, Users, FileText } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalCandidates: 0,
    recentApplications: 0
  });

  // Mock stats or fetch if API available
  useEffect(() => {
    // Ideally fetch stats from backend
    setStats({
      activeJobs: 5, // Placeholder
      totalCandidates: 120, // Placeholder
      recentApplications: 12 // Placeholder
    });
  }, []);

  const cards = [
    {
      title: 'Quick Candidate Search',
      description: 'Find candidates by skills immediately using AI matching.',
      icon: Search,
      link: '/recruiter/search',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Post a New Job',
      description: 'Create a new job listing to attract top talent.',
      icon: PlusCircle,
      link: '/recruiter/create-job',
      color: 'bg-indigo-500',
      textColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Manage Jobs',
      description: 'View and manage your active job postings and applications.',
      icon: List,
      link: '/recruiter/jobs',
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.firstName}</h1>
        <p className="text-slate-500">Here's what's happening with your recruitment pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {cards.map((card, index) => (
          <Link 
            key={index} 
            to={card.link}
            className="group relative bg-sky-100 p-8 rounded-[2rem] border-2 border-sky-300 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.1] group-hover:scale-150 transition-transform duration-500 ${card.color}`}></div>
            
            <div className={`w-16 h-16 rounded-2xl bg-white text-sky-600 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-md border border-sky-200`}>
              <card.icon size={32} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
              {card.title}
            </h3>
            
            <p className="text-sky-900 text-sm leading-relaxed mb-4 font-semibold">
              {card.description}
            </p>
            
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
              Get Started
              <span className="text-lg">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recruitment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-slate-400" size={20} />
              <span className="text-slate-500 font-medium">Active Jobs</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stats.activeJobs}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-3 mb-2">
              <Users className="text-slate-400" size={20} />
              <span className="text-slate-500 font-medium">Total Candidates</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stats.totalCandidates}</p>
          </div>
           <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-3 mb-2">
              <FileText className="text-slate-400" size={20} />
              <span className="text-slate-500 font-medium">Applications</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stats.recentApplications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
