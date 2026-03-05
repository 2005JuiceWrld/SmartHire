import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/jobs/my-jobs', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
        <Link to="/recruiter/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <ArrowLeft size={18} />
            Back to Dashboard
        </Link>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">My Job Postings</h1>
            <p className="text-slate-500">Manage your active listings and view candidates.</p>
        </div>
        <Link to="/recruiter/create-job" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
            Post New Job
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mb-6">
          {error}
        </div>
      )}

      {jobs.length === 0 && !error ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No jobs posted yet</h3>
          <p className="text-slate-500 mb-6">Create your first job listing to get started.</p>
          <Link to="/recruiter/create-job" className="text-indigo-600 font-bold hover:underline">
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    {job.title.charAt(0)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {job.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1" title={job.title}>{job.title}</h3>
              
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />
                    {job.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Briefcase size={16} />
                    {job.experienceLevel}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={16} />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <Link 
                    to={`/recruiter/jobs/${job._id}/matches`}
                    className="w-full py-3 bg-white border border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                >
                    View AI Matches
                    <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
