import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, CheckCircle, ArrowLeft, Briefcase, MapPin, DollarSign, FileText, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';

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
        setError(err.response?.data?.message || 'Failed to create job listing. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-500">
              <div className="bg-blue-100 p-6 rounded-[2rem] text-blue-600 mb-6 shadow-xl shadow-blue-100/50">
                  <CheckCircle size={64} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Job Posted Successfully!</h2>
              <p className="text-slate-500 font-bold mt-2">Redirecting you to your job management hub...</p>
              <div className="mt-8">
                <LoadingSpinner size="md" />
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <Link to="/recruiter/dashboard">
          <Button variant="ghost" icon={ArrowLeft} className="text-slate-500">Back to Hub</Button>
        </Link>
      </div>

      <div className="px-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Post a New Position</h1>
        <p className="text-slate-500 font-semibold mt-1">Fill in the details below to start receiving AI-matched candidate profiles.</p>
      </div>

      <Card className="p-10 border-none shadow-2xl shadow-slate-200/50">
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input
                    label="Job Title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Engineer"
                    icon={Briefcase}
                />
                <Input
                    label="Job Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, Bangalore, SF"
                    icon={MapPin}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <FileText size={16} className="text-blue-500" />
                  Detailed Description
                </label>
                <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Describe the role, impact, and who you're looking for..."
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none font-medium text-slate-700 leading-relaxed"
                ></textarea>
            </div>

            <div className="space-y-2">
                <Input
                    label="Core Skills (Comma Separated)"
                    name="requiredSkills"
                    required
                    value={formData.requiredSkills}
                    onChange={handleChange}
                    placeholder="e.g. React, TypeScript, GraphQL, Node.js"
                    icon={Sparkles}
                />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Our AI uses these tags to rank and match top-tier candidates.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-bold text-slate-700 appearance-none shadow-sm cursor-pointer"
                    >
                        <option>Entry Level</option>
                        <option>Mid Level</option>
                        <option>Senior Level</option>
                        <option>Director</option>
                        <option>Executive</option>
                    </select>
                </div>
                <Input
                    label="Annual Salary Range"
                    name="salaryRange"
                    value={formData.salaryRange}
                    onChange={handleChange}
                    placeholder="e.g. ₹15L - ₹30L / $120k - $180k"
                    icon={DollarSign}
                />
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold text-sm flex items-center gap-3 animate-shake">
                    <XCircle size={18} />
                    {error}
                </div>
            )}

            <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                <Link to="/recruiter/dashboard">
                  <Button variant="outline" className="px-8">Discard Draft</Button>
                </Link>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="px-12 py-4 rounded-[1.5rem] shadow-xl shadow-blue-200 text-lg font-black"
                    loading={loading}
                    icon={PlusCircle}
                >
                    Publish Job Listing
                </Button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateJob;
