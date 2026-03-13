import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { 
  UserCircle, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  PlusCircle, 
  Trash2, 
  Save, 
  Loader2,
  CheckCircle2,
  FileText,
  Camera,
  Globe,
  Linkedin,
  Github,
  Sparkles
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    location: '',
    bio: '',
    skills: [],
    education: [],
    experience: []
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profession: user.profession || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || [],
        education: user.education || [],
        experience: user.experience || []
      });
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', duration: '' }]
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...formData.experience];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    setFormData({ ...formData, experience: updatedExp });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.put('http://localhost:8800/users/update-user', formData);
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify({ ...res.data.user, token: user.token }));
        setMessage({ type: 'success', text: 'Profile synchronization complete!' });
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to sync profile data.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-24 gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-slate-500 animate-pulse">Loading Profile Ecosystem...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-blue-600 rounded-[2rem] shadow-lg"></div>
        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2rem] bg-white p-1.5 shadow-xl border border-slate-100">
              {user?.profileUrl ? (
                <img src={user.profileUrl} alt="profile" className="w-full h-full rounded-[1.7rem] object-cover" />
              ) : (
                <div className="w-full h-full rounded-[1.7rem] bg-slate-50 flex items-center justify-center text-4xl font-black text-blue-600">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <button className="absolute bottom-1 right-1 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-blue-600 transition-all hover:scale-110">
              <Camera size={18} />
            </button>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{formData.firstName} {formData.lastName}</h1>
            <p className="text-slate-500 font-bold flex items-center gap-2">
              <Briefcase size={16} /> {formData.profession || 'Talent Professional'}
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <MapPin size={16} /> {formData.location || 'Remote'}
            </p>
          </div>
        </div>
        <div className="absolute -bottom-12 right-8 hidden md:flex gap-3">
          <Button variant="outline" size="sm" icon={Globe}>Public Link</Button>
          <Button variant="primary" size="sm" icon={Save} loading={saving} onClick={handleSubmit}>Save Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
        {/* Left Column: Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Complete your profile</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-600">Profile Strength</span>
                <span className="text-slate-500">75%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Add 2 more skills to reach <span className="text-blue-600 font-bold">Expert level</span> and get 2x more views.
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Network Links</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-blue-200 transition-all">
                <Linkedin size={20} className="text-slate-400 group-hover:text-blue-600" />
                <span className="text-sm font-bold text-slate-600">LinkedIn Profile</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-blue-200 transition-all">
                <Github size={20} className="text-slate-400 group-hover:text-slate-900" />
                <span className="text-sm font-bold text-slate-600">GitHub Repository</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Main Form */}
        <div className="lg:col-span-2 space-y-8">
          {message.text && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
              message.type === 'success' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <Trash2 size={20} />}
              <p className="text-sm font-bold">{message.text}</p>
            </div>
          )}

          <Card>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <UserCircle size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              <Input label="Professional Headline" name="profession" value={formData.profession} onChange={handleInputChange} icon={Briefcase} placeholder="e.g. Lead Software Architect" />
              <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} icon={MapPin} placeholder="City, Country" />
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block ml-1">About / Professional Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all resize-none font-medium text-slate-700"
                  placeholder="Share your professional story..."
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Core Expertise</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <Input 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add a skill (e.g. Kubernetes)"
                  className="flex-1"
                />
                <Button variant="secondary" onClick={handleAddSkill} className="mt-7">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <Badge key={skill} variant="primary" className="pl-4 pr-2 py-2 text-sm">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 p-0.5 hover:bg-blue-200 rounded-full transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Work History</h2>
              </div>
              <Button variant="ghost" size="sm" icon={PlusCircle} onClick={handleAddExperience}>Add Experience</Button>
            </div>
            
            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Title" value={exp.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} />
                    <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                    <div className="md:col-span-2">
                      <Input label="Duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} placeholder="e.g. 2021 - Present" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" size="lg" className="px-10">Discard</Button>
            <Button variant="primary" size="lg" icon={Save} className="px-10 shadow-xl shadow-blue-200" loading={saving} onClick={handleSubmit}>Sync Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
