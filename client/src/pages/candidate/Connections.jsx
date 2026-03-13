import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import ThemeIcon from '../../components/common/ThemeIcon';

const Connections = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Professional Network</h1>
          <p className="text-slate-500 font-semibold mt-1">Manage your connections and discover new opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <ThemeIcon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:brightness-90 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search people..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all w-72 font-medium text-slate-700 shadow-sm"
            />
          </div>
          <Button variant="primary" icon={(props) => <ThemeIcon name="UserPlus" {...props} />}>Find People</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <EmptyState 
            title="Your network is empty" 
            description="Start connecting with colleagues and professionals to see them here and expand your horizons."
            icon={(props) => <ThemeIcon name="Users" {...props} />}
            actionLabel="Discover Professionals"
            onAction={() => {}}
          />
        </div>

        <div className="space-y-6">
          <Card className="hover:border-blue-100">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <ThemeIcon name="UserPlus" size={16} />
              Pending Requests
            </h3>
            <div className="py-4 text-center">
              <p className="text-sm font-bold text-slate-400 italic">No pending requests</p>
            </div>
          </Card>

          <Card className="hover:border-blue-100">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <ThemeIcon name="Clock" size={16} />
              Recent Activity
            </h3>
            <div className="py-4 text-center">
              <p className="text-sm font-bold text-slate-400 italic">No recent interactions</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Connections;
