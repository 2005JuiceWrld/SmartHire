import React, { useState } from 'react';
import axios from 'axios';
import { Search, UserCircle, Star, CheckCircle, XCircle, Filter, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const RecruiterSearch = () => {
  const [skills, setSkills] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!skills.trim()) return;

    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const skillList = skills.split(',').map(s => s.trim()).filter(Boolean);
      
      const response = await axios.post('http://localhost:8800/api/recruiter/search', {
        skills: skillList
      }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
      });

      if (response.data.success) {
        setCandidates(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch candidates. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Talent Discovery</h1>
          <p className="text-slate-500 font-semibold mt-1">AI-powered search to find the perfect match for your team.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={Filter}>Advanced Filters</Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="p-8 border border-blue-200 bg-blue-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={24} />
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Required skills (e.g. React, Node.js, AWS, TypeScript)"
                className="w-full pl-14 pr-6 py-5 bg-white border border-blue-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:bg-white focus:text-slate-900 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-lg font-medium"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !skills.trim()}
              className="px-10 py-5 bg-blue-600 text-white hover:bg-blue-700 rounded-[1.5rem] shadow-sm text-lg font-black min-w-[200px]"
              loading={loading}
            >
              Search Talent
            </Button>
          </div>
        </form>
      </Card>

      {/* Error State */}
      {error && (
        <div className="p-5 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold flex items-center gap-3 animate-shake">
          <XCircle size={20} />
          {error}
        </div>
      )}

      {/* Results Section */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-slate-500 font-bold animate-pulse">Scanning global talent pool...</p>
          </div>
        ) : searched && candidates.length === 0 ? (
          <EmptyState 
            title="No candidates matched" 
            description="We couldn't find any candidates with those specific skills. Try broadening your search terms."
            icon={UserCircle}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {candidates.map((candidate) => (
              <Card key={candidate._id} className="p-0 overflow-hidden hover:border-blue-200 group transition-all duration-300">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex gap-6">
                      <div className="relative">
                        {candidate.profileUrl ? (
                          <img 
                            src={candidate.profileUrl} 
                            alt={candidate.firstName} 
                            className="w-20 h-20 rounded-[1.5rem] object-cover border-2 border-slate-50 shadow-md group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-[1.5rem] bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-50 shadow-md group-hover:bg-blue-50 group-hover:text-blue-400 transition-all">
                            <UserCircle size={32} />
                          </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-blue-500 w-5 h-5 rounded-full border-4 border-white"></div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <p className="text-slate-500 font-bold flex items-center gap-2 mb-4">
                          <Briefcase size={16} /> {candidate.profession || 'Talent Professional'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills?.slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-slate-50 text-slate-600 border-slate-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[200px]">
                      <div className="bg-blue-50 text-blue-700 px-5 py-2.5 rounded-2xl font-black flex items-center gap-2 border border-blue-100 shadow-sm">
                        <Star size={18} className="fill-blue-700" />
                        {candidate.matchScore}% AI Match
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-right">
                        Suitability Index
                      </p>
                      <p className={`text-xs font-black px-3 py-1 rounded-lg ${
                          candidate.matchScore >= 80 ? 'bg-blue-50 text-blue-600' : 
                          candidate.matchScore >= 60 ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                          {candidate.suitabilityMessage}
                      </p>
                    </div>
                  </div>

                  {/* Skills Deep Dive */}
                  <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle size={16} className="text-blue-500" />
                        Matching Competencies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.matchingSkills?.length > 0 ? (
                          candidate.matchingSkills.map((skill, i) => (
                            <Badge key={i} variant="success" className="font-bold py-1.5">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-slate-400 italic bg-slate-50 px-3 py-1 rounded-lg">No direct matches identified</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <XCircle size={16} className="text-red-500" />
                        Missing Requirements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.missingSkills?.length > 0 ? (
                          candidate.missingSkills.map((skill, i) => (
                            <Badge key={i} variant="danger" className="font-bold py-1.5">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-blue-600 italic bg-blue-50 px-3 py-1 rounded-lg">Matches all criteria</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between group-hover:bg-slate-50 transition-colors">
                  <div className="flex-1 mr-8">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                            candidate.matchScore >= 80 ? 'bg-blue-500' : 
                            candidate.matchScore >= 60 ? 'bg-blue-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${candidate.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 font-black">
                    View Full Profile <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterSearch;
