import React from 'react';
import Island from '../components/Island';
import { Users, UserPlus, Clock, Search } from 'lucide-react';

const Connections = () => {
  return (
    <Island className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Connections</h1>
          <p className="text-slate-500 mt-1">Manage your professional network and discover new opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search connections..." 
              className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-300 p-8 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-300 flex items-center justify-center mx-auto text-slate-400">
              <Users size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your network is empty</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">Start connecting with colleagues and professionals to see them here.</p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Discover People
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-300 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserPlus size={18} className="text-indigo-600" />
              Pending Requests
            </h3>
            <p className="text-sm text-slate-500 italic">No pending requests at the moment.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-300 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Recent Interactions
            </h3>
            <p className="text-sm text-slate-500 italic">Recent activity will appear here.</p>
          </div>
        </div>
      </div>
    </Island>
  );
};

export default Connections;
