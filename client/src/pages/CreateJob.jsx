import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    experienceLevel: 'Entry Level',
    location: 'Remote',
    salaryRange: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const skillList = formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
        
        const payload = {
            ...formData,
            requiredSkills: skillList
        };

        const response = await axios.post('http://localhost:8800/api/jobs/create', payload, {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        if (response.data.success) {
            setSuccess(true);
            setTimeout(() => navigate('/recruiter/jobs'), 2000);
        }

    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to create job');
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
                  <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Job Posted Successfully!</h2>
              <p className="text-slate-500 mt-2">Redirecting to your jobs...</p>
          </div>
      )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/recruiter/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Post a New Job</h1>
        <p className="text-slate-500">Create a job listing to find the perfect candidate.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior React Developer"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Remote, New York, NY"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
                <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Required Skills (Comma Separated)</label>
                <input
                    type="text"
                    name="requiredSkills"
                    required
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, MongoDB, AWS"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <p className="text-xs text-slate-400 mt-2">These skills will be used for AI candidate matching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Senior Level</option>
                        <option>Director</option>
                        <option>Executive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Salary Range (Optional)</label>
                    <input
                        type="text"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        placeholder="e.g. ₹10L - ₹25L"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                            <PlusCircle size={20} />
                            Post Job
                        </>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
