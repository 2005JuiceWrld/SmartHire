import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Trash2, Briefcase, User, MapPin, Search, Filter } from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/admin/jobs');
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job listing? This protocol is irreversible.")) return;
    
    try {
      await axios.delete(`http://localhost:8800/api/admin/jobs/${jobId}`);
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job", err);
      alert("System failed to execute delete operation.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-slate-500 font-bold animate-pulse">Scanning Platform Marketplace...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Marketplace Governance</h1>
          <p className="text-slate-500 font-semibold mt-1">Audit and moderate global job listings within the SmartHire network.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Filter} size="sm">Advanced Audit</Button>
        </div>
      </div>

      <Card noPadding className="border-none shadow-2xl shadow-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Originating Recruiter</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Geographic Hub</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Network Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 border-2 border-white shadow-lg shadow-slate-200 group-hover:bg-blue-200 transition-colors">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <span className="font-black text-slate-900 block group-hover:text-blue-600 transition-colors">{job.title}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {job._id.slice(-8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100">
                        {job.recruiterId?.firstName[0]}{job.recruiterId?.lastName[0]}
                      </div>
                      <span className="text-slate-600 font-bold text-sm">
                        {job.recruiterId?.firstName} {job.recruiterId?.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                      <MapPin size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={job.status === 'Active' ? 'success' : 'secondary'} dot className="font-black py-1.5 px-4">
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 p-2.5"
                      icon={Trash2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminJobs;
