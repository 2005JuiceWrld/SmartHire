import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, CheckCircle, XCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const JobMatches = () => {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchMatches();
  }, [id]);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/api/jobs/${id}/matches`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.data.success) {
        setCandidates(response.data.data);
        setJobTitle(response.data.jobTitle);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch matches.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link to="/recruiter/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={18} />
        Back to Jobs
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">AI Matches for "{jobTitle}"</h1>
        <p className="text-slate-500">Ranked by relevance to your job description and required skills.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mb-6">
          {error}
        </div>
      )}

      {candidates.length === 0 && !error ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-slate-400" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching candidates found</h3>
          <p className="text-slate-500">Wait for more candidates to join or adjust your job requirements.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="bg-white p-8 rounded-[2.5rem] border-[3px] border-slate-800 shadow-2xl hover:shadow-indigo-200/50 hover:border-indigo-600 transition-all duration-300 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                {candidate.profileUrl ? (
                  <img 
                    src={candidate.profileUrl} 
                    alt={candidate.firstName} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-200 shadow-sm">
                    <User size={32} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {candidate.firstName} {candidate.lastName}
                  </h3>
                  <p className="text-slate-500 font-medium mb-2">{candidate.profession || 'Open to Work'}</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills?.slice(0, 5).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                        {skill}
                      </span>
                    ))}
                    {(candidate.skills?.length > 5) && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                        +{candidate.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold mb-2">
                  <Star size={16} className="fill-indigo-700" />
                  {candidate.matchScore}% Match
                </div>
                <p className={`text-sm font-medium ${
                    candidate.matchScore >= 80 ? 'text-green-600' : 
                    candidate.matchScore >= 60 ? 'text-indigo-600' : 'text-slate-500'
                }`}>
                    {candidate.suitabilityMessage}
                </p>
              </div>
            </div>

            {/* Match Details */}
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  Matching Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.matchingSkills?.length > 0 ? (
                    candidate.matchingSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400 italic">None found</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <XCircle size={16} className="text-red-400" />
                  Missing Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.missingSkills?.length > 0 ? (
                    candidate.missingSkills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-100">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400 italic">None missing</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                        candidate.matchScore >= 80 ? 'bg-green-500' : 
                        candidate.matchScore >= 60 ? 'bg-indigo-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${candidate.matchScore}%` }}
                ></div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default JobMatches;
