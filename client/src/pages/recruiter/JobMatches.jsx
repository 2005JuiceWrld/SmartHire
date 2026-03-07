import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, XCircle, User, Sparkles, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

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
      setError('Failed to compute talent matches for this listing.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-slate-500 font-bold animate-pulse">Running AI matching algorithms...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <Link to="/recruiter/jobs">
          <Button variant="ghost" icon={ArrowLeft} className="text-slate-500 font-bold">Back to Listings</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Talent Pool</h1>
          <p className="text-slate-500 font-semibold mt-1 flex items-center gap-2">
            Optimized candidates for <span className="text-blue-600 font-black underline decoration-blue-200">"{jobTitle}"</span>
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl font-bold border border-blue-100 flex items-center gap-2">
          <Sparkles size={18} />
          {candidates.length} Matches Found
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold text-sm flex items-center gap-3 animate-shake">
          <XCircle size={18} /> {error}
        </div>
      )}

      {candidates.length === 0 && !error ? (
        <EmptyState 
          title="No direct matches found" 
          description="The AI hasn't found high-confidence matches yet. Try broadening your job description skills to attract more talent."
          icon={User}
          actionLabel="Edit Job Listing"
          onAction={() => window.location.href = `/recruiter/jobs`}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8">
            {candidates.map((candidate) => (
              <Card key={candidate._id} className="p-0 overflow-hidden hover:border-blue-200 group transition-all duration-300 border-2">
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
                            <User size={32} />
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
                        {candidate.matchScore}% Match
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest text-right">
                        Neural Suitability
                      </p>
                      <p className={`text-xs font-black px-3 py-1 rounded-lg ${
                          candidate.matchScore >= 80 ? 'bg-blue-50 text-blue-600' : 
                          candidate.matchScore >= 60 ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                          {candidate.suitabilityMessage}
                      </p>
                    </div>
                  </div>

                  {/* Skills Comparison */}
                  <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle size={16} className="text-blue-500" />
                        Skills Present
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.matchingSkills?.length > 0 ? (
                          candidate.matchingSkills.map((skill, i) => (
                            <Badge key={i} variant="success" className="font-bold py-1.5">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-slate-400 italic bg-slate-50 px-3 py-1 rounded-lg">No direct matches</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <XCircle size={16} className="text-red-500" />
                        Skills Deficit
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.missingSkills?.length > 0 ? (
                          candidate.missingSkills.map((skill, i) => (
                            <Badge key={i} variant="danger" className="font-bold py-1.5">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-blue-600 italic bg-blue-50 px-3 py-1 rounded-lg">Full requirement match</span>
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
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Schedule Call</Button>
                    <Button variant="primary" size="sm" className="font-black">
                      View Profile <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
      )}
    </div>
  );
};

export default JobMatches;
