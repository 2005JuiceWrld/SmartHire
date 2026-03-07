import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password, role);
      if (result.success) {
        if (result.needsRoleSelection) {
          setShowRoleSelection(true);
          setAvailableRoles(result.roles);
          setLoading(false);
        } else {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          const userRole = storedUser?.role;
          if (userRole === 'admin') navigate('/admin/dashboard');
          else if (userRole === 'recruiter') navigate('/recruiter/dashboard');
          else navigate('/');
        }
      } else {
        setError(result.message || 'Invalid credentials');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleRoleSelect = async (selectedRole) => {
    setRole(selectedRole);
    setError('');
    setLoading(true);
    try {
      const result = await login(email, password, selectedRole);
      if (result.success && !result.needsRoleSelection) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userRole = storedUser?.role;
        if (userRole === 'admin') navigate('/admin/dashboard');
        else if (userRole === 'recruiter') navigate('/recruiter/dashboard');
        else navigate('/');
      } else {
        setError(result.message || 'Login failed after role selection');
      }
    } catch (err) {
      setError('Role selection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-[#DBEAFE] flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6">
          <h3 className="text-xl font-semibold text-slate-900">Select Account Role</h3>
          <p className="text-sm text-slate-600 mt-1 mb-5">
            This account has multiple roles. Choose one to continue.
          </p>
          <div className="space-y-3">
            {availableRoles.map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSelect(r)}
                className="w-full p-3 rounded-md border border-slate-200 hover:bg-slate-50 text-left flex items-center justify-between"
              >
                <span className="text-sm font-medium text-slate-800 capitalize">{r}</span>
                <ArrowRight size={16} className="text-slate-500" />
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowRoleSelection(false)}
            className="text-sm text-slate-600 hover:text-slate-900 mt-4"
          >
            Back to login
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DBEAFE] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
        <p className="text-sm text-slate-600 mt-1 mb-6">Use your account credentials to continue.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-xs text-slate-600 hover:text-slate-900">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-200" />
            Keep me logged in
          </label>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
            icon={LogIn}
          >
            Sign In
          </Button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Don&apos;t have an account?
          <Link to="/register" className="ml-1 text-slate-900 font-medium hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
