import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { 
  Search, 
  Filter, 
  UserCircle, 
  MapPin, 
  Zap, 
  Star, 
  ChevronRight, 
  Briefcase,
  Trophy,
  Sparkles
} from 'lucide-react';

const Recruiter = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    minScore: 0,
    skills: ''
  });

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8800/users/get-candidates', {
        search: filters.search,
        minScore: filters.minScore,
        skills: filters.skills ? filters.skills.split(',').map(s => s.trim()) : []
      });
      setCandidates(res.data.data);
    } catch (err) {
      console.error("Error fetching candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCandidates();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Talent Network</h1>
          <p className="text-slate-500 font-semibold">Search and filter through the global professional ecosystem.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-700 shadow-sm"
            />
          </div>
          <Button type="submit" variant="primary" icon={Search} className="px-8 shadow-xl shadow-blue-100">
            Find Talent
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-50/50 border-slate-200 space-y-6 p-6">
            <div className="flex items-center gap-2 px-1">
              <Filter size={18} className="text-blue-600" />
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Audit Parameters</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Min Suitability Score ({filters.minScore}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.minScore}
                  onChange={(e) => setFilters({...filters, minScore: e.target.value})}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 px-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Core Competencies</label>
                <textarea 
                  placeholder="e.g. React, Python, AWS"
                  value={filters.skills}
                  onChange={(e) => setFilters({...filters, skills: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none h-32 resize-none transition-all"
                />
              </div>

              <Button 
                onClick={fetchCandidates}
                variant="outline"
                className="w-full font-black py-3 text-xs"
              >
                Sync Filters
              </Button>
            </div>
          </Card>

          <Card className="bg-blue-100 border border-blue-200 p-6 text-slate-900 space-y-4 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <div className="bg-white w-fit p-2 rounded-xl mb-4 border border-blue-200">
                <Sparkles size={20} className="text-blue-600" />
              </div>
              <h3 className="font-black text-lg tracking-tight uppercase text-xs tracking-[0.2em] mb-2">Market Insights</h3>
              <p className="text-slate-700 text-sm font-medium leading-relaxed">Most searched skill this week is <span className="font-black text-blue-700 underline decoration-blue-400">FastAPI</span>. 12 new matches found.</p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          </Card>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <LoadingSpinner size="lg" />
              <p className="text-slate-500 font-black mt-4 animate-pulse uppercase tracking-[0.2em] text-xs">Scanning Global Network...</p>
            </div>
          ) : candidates.length > 0 ? (
            candidates.map((candidate) => (
              <Card key={candidate._id} className="p-6 hover:border-blue-200 group transition-all duration-300 flex flex-col md:flex-row items-center gap-6 border-none shadow-xl shadow-slate-100/50">
                {/* Profile Pic & Score */}
                <div className="relative flex-shrink-0">
                  {candidate.profileUrl ? (
                    <img src={candidate.profileUrl} alt="profile" className="w-20 h-20 rounded-[1.5rem] object-cover border-2 border-slate-50 shadow-md group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-20 h-20 rounded-[1.5rem] bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-black border-2 border-white shadow-md group-hover:bg-blue-200 transition-colors">
                      {candidate.firstName[0]}{candidate.lastName[0]}
                    </div>
                  )}
                  <div className="absolute -right-2 -bottom-2 bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg">
                    {candidate.atsScore}%
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{candidate.firstName} {candidate.lastName}</h3>
                    {candidate.atsScore >= 85 && (
                      <Badge variant="success" dot className="font-black">Top Choice</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-400" />
                      {candidate.profession || 'Talent Professional'}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-400" />
                      {candidate.location || 'Remote Hub'}
                    </div>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    {candidate.skills?.slice(0, 5).map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-600 border-slate-200">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills?.length > 5 && (
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-1">+{candidate.skills.length - 5} more</span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                  <Button variant="outline" size="sm" icon={ChevronRight} className="w-full md:w-auto font-black py-3">
                    Access Dossier
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <EmptyState 
              title="No talent detected" 
              description="Our neural network couldn't find matches for those specific parameters. Try widening your audit range."
              icon={UserCircle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
