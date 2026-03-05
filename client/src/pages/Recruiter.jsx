import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Island from '../components/Island';
import { 
  Search, 
  Filter, 
  User, 
  MapPin, 
  Zap, 
  Star, 
  ChevronRight, 
  Loader2,
  Briefcase,
  Trophy
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
    <Island className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Talent Discovery</h1>
          <p className="text-slate-500 text-lg">Find the best matching candidates using AI-powered ATS scores.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
            <Search size={20} />
            Find Talent
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <Filter size={18} className="text-indigo-600" />
              <h3 className="font-bold text-slate-900">Advanced Filters</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 px-2">Minimum ATS Score ({filters.minScore}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.minScore}
                  onChange={(e) => setFilters({...filters, minScore: e.target.value})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 px-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 px-2">Required Skills</label>
                <textarea 
                  placeholder="e.g. React, Python, AWS"
                  value={filters.skills}
                  onChange={(e) => setFilters({...filters, skills: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none"
                />
              </div>

              <button 
                onClick={fetchCandidates}
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-[2rem] text-white space-y-4 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg">Hiring Insights</h3>
              <p className="text-indigo-100 text-sm">Most searched skill this week is <span className="font-bold underline">FastAPI</span>. 12 candidates match your criteria.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem] border border-slate-200">
              <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
              <p className="text-slate-500 font-bold">Scanning Professional Network...</p>
            </div>
          ) : candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group border-l-4 border-l-transparent hover:border-l-indigo-600 flex flex-col md:flex-row items-center gap-6 cursor-pointer">
                {/* Profile Pic & Score */}
                <div className="relative flex-shrink-0">
                  {candidate.profileUrl ? (
                    <img src={candidate.profileUrl} alt="profile" className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl font-black border-2 border-white shadow-sm">
                      {candidate.firstName[0]}{candidate.lastName[0]}
                    </div>
                  )}
                  <div className="absolute -right-2 -bottom-2 bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg">
                    {candidate.atsScore}%
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{candidate.firstName} {candidate.lastName}</h3>
                    {candidate.atsScore >= 85 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase border border-amber-100">
                        <Trophy size={10} className="fill-amber-500" /> Top Choice
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} className="text-indigo-400" />
                      {candidate.profession || 'Professional'}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-indigo-400" />
                      {candidate.location || 'Remote'}
                    </div>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    {candidate.skills?.slice(0, 5).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills?.length > 5 && (
                      <span className="text-xs text-slate-400 font-bold px-1">+{candidate.skills.length - 5} more</span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                  <button className="w-full md:w-auto px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 flex items-center justify-center gap-2">
                    View Full CV
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-200 border-dashed">
              <User size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No candidates found</h3>
              <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </Island>
  );
};

export default Recruiter;
