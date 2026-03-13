import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, UserPlus, Briefcase } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const LOGO_URL = 'https://cdn.builder.io/api/v1/image/assets%2Fb4e372bd30c641588bf37e96a1f5ff16%2F35803bcd13954b6086d50a91dc9dee71';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'candidate'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={LOGO_URL}
              alt="SmartHire Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SmartHire</h1>
        </div>
        <Card className="w-full p-6 sm:p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
        <p className="text-sm text-slate-600 mt-1 mb-6">Enter your details to get started.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              icon={User}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              icon={User}
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 block">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'candidate' })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border text-sm font-medium transition-colors ${
                  formData.role === 'candidate'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 ring-1 ring-sky-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <User size={16} />
                Candidate
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'recruiter' })}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border text-sm font-medium transition-colors ${
                  formData.role === 'recruiter'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 ring-1 ring-sky-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Briefcase size={16} />
                Recruiter
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" loading={loading} icon={UserPlus}>
            Create Account
          </Button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Already have an account?
          <Link to="/login" className="ml-1 text-sky-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
