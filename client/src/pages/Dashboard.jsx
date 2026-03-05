import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Island from '../components/Island';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post('http://localhost:8800/users/get-user');
        setUserData(res.data.user);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const displayUser = userData || user;

  if (loading && !displayUser) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Island className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, {displayUser?.firstName}. Here is your career status today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-300 shadow-sm">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-sm font-medium text-slate-600">Joined {new Date(displayUser?.createdAt).toLocaleDateString()}</span>
          </div>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
            <Zap size={18} />
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Connections */}
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors border border-slate-100 shadow-sm">
              <Users size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
              <ArrowUpRight size={14} /> 12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Connections</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{displayUser?.friends?.length || 124}</h3>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-slate-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors border border-slate-100 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg border border-purple-100">Target: 100%</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-end mb-2">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Profile Completion</p>
              <span className="text-sm font-black text-slate-900">85%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-100 shadow-inner">
              <div className="bg-purple-600 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(147,51,234,0.4)]"></div>
            </div>
          </div>
        </div>

        {/* Resume Score */}
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-slate-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-slate-100 shadow-sm">
              <FileText size={24} />
            </div>
            {displayUser?.lastResumeAnalysisDate && (
              <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse border-2 border-white shadow-md"></div>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Resume ATS Score</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {displayUser?.atsScore > 0 ? `${displayUser.atsScore}/100` : "70/100"}
            </h3>
            <p className="text-xs text-slate-400 font-bold mt-1">
              {displayUser?.lastResumeAnalysisDate 
                ? `UPDATED: ${new Date(displayUser.lastResumeAnalysisDate).toLocaleDateString()}`
                : `UPDATED: ${new Date().toLocaleDateString()}`}
            </p>
          </div>
        </div>

        {/* Profile Views */}
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-slate-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors border border-slate-100 shadow-sm">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">+42 new</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Profile Visibility</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{displayUser?.views?.length || 450}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-300 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-black hover:underline uppercase tracking-wider">View All</button>
          </div>
          <div className="p-8">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:w-1 before:bg-slate-100">
              {/* Activity Item 1 */}
              <div className="relative flex items-start gap-6">
                <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center flex-shrink-0 z-10 text-indigo-600">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-base font-black text-slate-800">Resume Analyzed successfully</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">Your resume score improved by 5 points after the last update.</p>
                  <p className="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1 uppercase">
                    <Clock size={12} /> 2 hours ago
                  </p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="relative flex items-start gap-6">
                <div className="mt-1 w-10 h-10 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center flex-shrink-0 z-10 text-blue-600">
                  <Users size={18} />
                </div>
                <div>
                  <p className="text-base font-black text-slate-800">New connection accepted</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">You are now connected with <span className="text-indigo-600 font-bold">Alex Rivera</span>.</p>
                  <p className="text-xs text-slate-400 font-bold mt-2 flex items-center gap-1 uppercase">
                    <Clock size={12} /> 5 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Suggestions */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200 border border-indigo-500/20 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 shadow-inner">
                    <Zap size={20} className="fill-white" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">AI Career Coach</h3>
              </div>
              <p className="text-indigo-100 text-base font-medium mb-8 leading-relaxed">"You're missing 3 key skills for Senior Developer roles in your area. Want to see the roadmap?"</p>
              <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all shadow-xl uppercase tracking-widest hover:scale-[1.02]">
                Open Roadmap
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-400 rounded-full opacity-30 blur-3xl group-hover:scale-110 transition-transform"></div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-300 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Quick Stats</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Search Appearances</span>
                <span className="text-base font-black text-slate-900">124</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-300">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Interview Invites</span>
                <span className="text-base font-black text-slate-900">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Island>
  );
};

export default Dashboard;
