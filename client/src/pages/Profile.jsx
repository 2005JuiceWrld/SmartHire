import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Island from '../components/Island';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  CheckCircle2,
  FileText
} from 'lucide-react';

const Profile = () => {
  const { user, login } = useAuth();
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

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, ""]
    });
  };

  const handleEducationChange = (index, value) => {
    const updatedEdu = [...formData.education];
    updatedEdu[index] = value;
    setFormData({ ...formData, education: updatedEdu });
  };

  const handleRemoveEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
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

  const handleRemoveExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.put('http://localhost:8800/users/update-user', formData);
      if (res.data.sucess) {
        // Update local auth context
        const updatedUser = { ...res.data.user, token: user.token };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload(); // Refresh to propagate changes
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;

  return (
    <Island className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Profile</h1>
        {message.text && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <Trash2 size={16} />}
            {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-300 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <User size={20} className="text-indigo-600" />
              Basic Information
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">First Name</label>
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Last Name</label>
              <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Profession</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. New York, USA"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">About / Bio</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                placeholder="Tell us about your professional background..."
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-300 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-indigo-600" />
              Professional Skills
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <input 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add a skill (e.g. React)"
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button 
                type="button"
                onClick={handleAddSkill}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Plus size={18} /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map(skill => (
                <span key={skill} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100 group">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-indigo-400 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-300 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Briefcase size={20} className="text-indigo-600" />
              Work Experience
            </h2>
            <button 
              type="button"
              onClick={handleAddExperience}
              className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:text-indigo-700"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
          <div className="p-6 space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-300 space-y-4 relative group">
                <button 
                  type="button" 
                  onClick={() => handleRemoveExperience(index)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Job Title</label>
                    <input 
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Company</label>
                    <input 
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      placeholder="e.g. Google"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Duration</label>
                    <input 
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
                      placeholder="e.g. Jan 2020 - Present"
                    />
                  </div>
                </div>
              </div>
            ))}
            {formData.experience.length === 0 && (
              <p className="text-center text-slate-400 text-sm italic py-4">No experience added yet.</p>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-300 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap size={20} className="text-indigo-600" />
              Education
            </h2>
            <button 
              type="button"
              onClick={handleAddEducation}
              className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:text-indigo-700"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
          <div className="p-6 space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  value={edu}
                  onChange={(e) => handleEducationChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                  placeholder="e.g. B.S. in Computer Science"
                />
                <button type="button" onClick={() => handleRemoveEducation(index)} className="text-slate-300 hover:text-red-500 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {formData.education.length === 0 && (
              <p className="text-center text-slate-400 text-sm italic py-4">No education history added.</p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={saving}
            className="bg-indigo-600 text-white px-12 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saving ? 'Saving Profile...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </Island>
  );
};

export default Profile;
