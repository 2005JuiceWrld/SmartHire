import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, Share2, Eye, EyeOff, User, Briefcase } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableRoles, setAvailableRoles] = useState([]);
  const [needsRoleSelection, setNeedsRoleSelection] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e, selectedRole = null) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password, selectedRole);
    if (result.success) {
      if (result.needsRoleSelection) {
        setAvailableRoles(result.roles);
        setNeedsRoleSelection(true);
        setLoading(false);
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser?.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleRoleSelect = (role) => {
    handleSubmit(null, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2 rounded-md text-white">
            <Share2 size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SmartHire</h1>
        </div>

        <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
            {needsRoleSelection ? 'Select Role' : 'Welcome Back'}
          </h2>
          <p className="text-slate-500 mb-8 text-center">
            {needsRoleSelection 
              ? 'Multiple accounts found. How would you like to sign in?' 
              : 'Sign in to your account to continue'}
          </p>

          {needsRoleSelection ? (
            <div className="space-y-4">
              {availableRoles.includes('candidate') && (
                <button
                  onClick={() => handleRoleSelect('candidate')}
                  className="w-full p-4 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm">
                        <User className="text-indigo-600" size={20} />
                    </div>
                    <div>
                        <span className="block font-bold text-indigo-900">Candidate</span>
                        <span className="text-xs text-indigo-500">Sign in to find jobs</span>
                    </div>
                  </div>
                  <Share2 className="text-indigo-300 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              )}
              {availableRoles.includes('recruiter') && (
                <button
                  onClick={() => handleRoleSelect('recruiter')}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center shadow-sm">
                        <Briefcase className="text-slate-600" size={20} />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-800">Recruiter</span>
                        <span className="text-xs text-slate-500">Sign in to hire talent</span>
                    </div>
                  </div>
                  <Share2 className="text-slate-300 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              )}
              <button 
                onClick={() => setNeedsRoleSelection(false)}
                className="w-full text-center text-sm text-slate-400 hover:text-slate-600 mt-4"
              >
                Go back to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
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
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 font-bold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
