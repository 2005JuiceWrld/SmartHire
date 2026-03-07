import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, ArrowRight, ArrowLeft, PlusCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

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
      setError('Failed to fetch your job listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-slate-500 font-bold animate-pulse">Syncing your active listings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <Link to="/recruiter/dashboard">
          <Button variant="ghost" icon={ArrowLeft} className="text-slate-500 font-bold">Back to Hub</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Listings</h1>
            <p className="text-slate-500 font-semibold mt-1">Review your active job postings and AI-ranked candidate pools.</p>
        </div>
        <Link to="/recruiter/create-job">
            <Button variant="primary" icon={PlusCircle} className="shadow-xl shadow-blue-200">Post New Listing</Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold text-sm flex items-center gap-3 animate-shake">
          <Badge variant="danger" dot /> {error}
        </div>
      )}

      {jobs.length === 0 && !error ? (
        <EmptyState 
          title="No jobs posted yet" 
          description="You haven't created any job listings. Post your first job to start receiving AI-matched talent."
          icon={Briefcase}
          actionLabel="Create First Listing"
          onAction={() => window.location.href = '/recruiter/create-job'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Card key={job._id} className="group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 p-0 overflow-hidden flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-black text-2xl group-hover:bg-blue-200 transition-colors duration-300 shadow-lg shadow-slate-200">
                    {job.title.charAt(0)}
                  </div>
                  <Badge variant={job.status === 'Active' ? 'success' : 'secondary'} dot>
                      {job.status}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors" title={job.title}>
                  {job.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <MapPin size={14} className="group-hover:text-blue-500" />
                      </div>
                      {job.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <Briefcase size={14} className="group-hover:text-blue-500" />
                      </div>
                      {job.experienceLevel}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <Calendar size={14} className="group-hover:text-blue-500" />
                      </div>
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 p-6 border-t border-slate-100 group-hover:bg-blue-50/30 transition-colors mt-auto">
                <Link to={`/recruiter/jobs/${job._id}/matches`}>
                  <Button variant="primary" className="w-full font-black py-4 shadow-none" icon={Sparkles}>
                      View AI Candidates
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
