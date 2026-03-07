import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, Loader2, Share2, Eye, EyeOff, Briefcase, Code } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'candidate',
    skills: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Split skills string into array if it's not empty
    const submissionData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
    };

    try {
        // Assuming register function in AuthContext handles the API call
        // We might need to adjust this depending on how register is implemented
        // But passing the data should work if the backend expects it.
        const result = await register(submissionData);
        if (result && result.success) {
          setSuccess(true);
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError(result?.message || "Registration failed");
        }
    } catch (err) {
        setError(err.message || "An error occurred");
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Share2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Registration Successful!</h2>
          <p className="text-slate-500 mb-6">Redirecting you to the login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb4e372bd30c641588bf37e96a1f5ff16%2F35803bcd13954b6086d50a91dc9dee71"
              alt="SmartHire Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SmartHire</h1>
        </div>

        <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
          <p className="text-slate-500 mb-6">Join the community and boost your career</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection */}
            <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => handleRoleChange('candidate')}
                    className={`flex-1 py-3 px-4 rounded-md border flex items-center justify-center gap-2 transition-all ${
                        formData.role === 'candidate'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 ring-1 ring-sky-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    <User size={18} />
                    <span className="font-semibold">Candidate</span>
                </button>
                <button
                    type="button"
                    onClick={() => handleRoleChange('recruiter')}
                    className={`flex-1 py-3 px-4 rounded-md border flex items-center justify-center gap-2 transition-all ${
                        formData.role === 'recruiter'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 ring-1 ring-sky-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    <Briefcase size={18} />
                    <span className="font-semibold">Recruiter</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {formData.role === 'candidate' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Skills (Comma Separated)</label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="skills"
                      type="text"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                      placeholder="React, Node.js, Python, SQL"
                    />
                  </div>
                </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-md border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded-md font-bold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-sky-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
