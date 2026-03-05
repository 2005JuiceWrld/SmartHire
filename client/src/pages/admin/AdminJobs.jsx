import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Island from '../../components/Island';
import { Trash2, Briefcase, User, MapPin } from 'lucide-react';

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
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    
    try {
      await axios.delete(`http://localhost:8800/api/admin/jobs/${jobId}`);
      fetchJobs(); // Refresh list
    } catch (err) {
      console.error("Error deleting job", err);
      alert("Failed to delete job.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <Island className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Job Management</h1>
        <p className="text-slate-500 mt-1">Manage and moderate all job listings posted on SmartHire.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Title</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Recruiter</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                        <Briefcase size={20} />
                      </div>
                      <span className="font-bold text-slate-800">{job.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-slate-400" />
                      <span className="text-slate-600 font-medium">
                        {job.recruiterId?.firstName} {job.recruiterId?.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="text-slate-600 font-medium">{job.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      job.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDeleteJob(job._id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Island>
  );
};

export default AdminJobs;
