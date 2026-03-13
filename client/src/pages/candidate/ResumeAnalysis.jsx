import React, { useState } from 'react';
import axios from 'axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ThemeIcon from '../../components/common/ThemeIcon';

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Job Match State
  const [jobDescription, setJobDescription] = useState('');
  const [matching, setMatching] = useState(false);
  const [matchResult, setMatchResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:8800/users/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.user);
    } catch (err) {
      console.error('Error analyzing resume:', err);
      setError(err.response?.data?.message || 'Failed to analyze resume. Ensure the AI service is running.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleJobMatch = async () => {
    if (!jobDescription) return;
    
    setMatching(true);
    try {
      const response = await axios.post('http://localhost:8800/users/job-match', {
        jobDescription
      });
      setMatchResult(response.data.data);
    } catch (err) {
      console.error('Job match error:', err);
      setError('Failed to perform job match. Make sure you have uploaded a resume.');
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">AI Resume Intelligence</h1>
        <p className="text-slate-500 max-w-lg mx-auto text-lg">Analyze your resume and match it against job requirements instantly.</p>
      </div>

      {/* Upload Area */}
      {!result && (
        <div className="bg-slate-50 p-10 rounded-md border-2 border-dashed border-slate-200 shadow-sm text-center transition-all hover:border-blue-400 group">
          <input 
            type="file" 
            id="resume-upload" 
            className="hidden" 
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
            <div className="w-20 h-20 bg-white text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
              <ThemeIcon name="Upload" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {file ? file.name : 'Click to select PDF'}
            </h3>
            <p className="text-slate-400 text-sm mb-8">Maximum file size: 5MB</p>
            
            <button 
              onClick={(e) => {
                if(file) {
                  e.preventDefault();
                  handleUpload();
                }
              }}
              disabled={!file || analyzing}
              className="bg-blue-600 text-white px-10 py-3.5 rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-200 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
            >
              {analyzing ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <ThemeIcon name="Zap" size={20} />
                  Start Analysis
                </>
              )}
            </button>
          </label>
          
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-600 font-medium bg-red-50 py-3 rounded-md border border-red-100">
              <ThemeIcon name="AlertCircle" size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-700">
          {/* Top Score Card */}
          <div className="bg-slate-50 p-8 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="#e2e8f0" strokeWidth="12" />
                <circle
                  cx="80" cy="80" r="70" fill="transparent" stroke="#4f46e5" strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * (result.atsScore || 70)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{result.atsScore || 70}%</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ATS Score</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-blue-100">
                <ThemeIcon name="Star" size={14} /> AI Analysis Complete
              </div>
              <h2 className="text-2xl font-bold text-slate-900">General Resume Analysis</h2>
              <p className="text-slate-500">We've identified {result.skills?.length || 8} skills and {result.education?.length || 1} credentials. See below for job-specific matching.</p>
              <button onClick={() => setResult(null)} className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1 mx-auto md:mx-0">
                Upload a different resume <ThemeIcon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="bg-slate-50 p-6 rounded-md border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 px-2">
                <ThemeIcon name="CheckCircle" size={18} /> Key Strengths
              </h3>
              <div className="space-y-3">
                {(result.keyStrengths?.length > 0 ? result.keyStrengths : ["Strong technical foundation", "Relevant educational background", "Professional formatting"]).map((s, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ThemeIcon name="CheckCircle" size={12} />
                    </div>
                    <p className="text-sm text-slate-700 font-medium">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* General Improvements */}
            <div className="bg-slate-50 p-6 rounded-md border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 px-2">
                <ThemeIcon name="Target" size={18} /> Improvement Suggestions
              </h3>
              <div className="space-y-3">
                {(result.improvementSuggestions?.length > 0 ? result.improvementSuggestions : ["Add more cloud-native skills", "Quantify achievement metrics", "Include personal projects link"]).map((s, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ThemeIcon name="TrendingUp" size={12} />
                    </div>
                    <p className="text-sm text-slate-700 font-medium">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Identified Skills Grid */}
          <div className="bg-slate-50 p-8 rounded-md border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ThemeIcon name="Zap" size={18} /> Skills Found in Resume
            </h3>
            <div className="flex flex-wrap gap-3">
              {(result.skills?.length > 0 ? result.skills : ["React", "JavaScript", "Node.js", "Python", "MongoDB", "Tailwind CSS", "Git"]).map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white text-blue-700 rounded-md text-sm font-bold border border-slate-200 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Match Section */}
          <div className="bg-blue-100 rounded-lg p-10 text-slate-900 shadow-sm border border-blue-200 space-y-8 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/20">
                  <ThemeIcon name="Briefcase" size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Job Description Matcher</h2>
                  <p className="text-slate-600 text-sm mt-1">Check your compatibility with any job requirements instantly.</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-6">
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={6}
                className="w-full bg-white border border-blue-200 rounded-lg p-6 text-slate-900 placeholder:text-slate-500 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg"
              />
              <button 
                onClick={handleJobMatch}
                disabled={!jobDescription || matching}
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-5 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:bg-slate-300 shadow-xl shadow-blue-600/20"
              >
                {matching ? <LoadingSpinner size="sm" color="white" /> : <ThemeIcon name="Search" size={24} />}
                {matching ? 'Calculating Match...' : 'Analyze Job Match'}
              </button>
            </div>

            {/* Match Results */}
            {matchResult && (
              <div className="relative z-10 pt-10 border-t border-blue-200 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
                <div className="bg-white p-6 rounded-md text-center space-y-2 border border-blue-200">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Match Score</p>
                  <h3 className={`text-5xl font-black ${matchResult.matchScore > 70 ? 'text-blue-400' : 'text-blue-400'}`}>
                    {matchResult.matchScore}%
                  </h3>
                </div>
                
                <div className="bg-white p-6 rounded-md space-y-4 border border-blue-200">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ThemeIcon name="CheckCircle" size={14} /> Matching Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchingSkills?.map(s => (
                      <span key={s} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-400/20">{s}</span>
                    ))}
                    {matchResult.matchingSkills?.length === 0 && <span className="text-slate-500 text-xs italic">None detected</span>}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-md space-y-4 border border-blue-200">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ThemeIcon name="Target" size={14} /> Missing Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingSkills?.map(s => (
                      <span key={s} className="px-3 py-1 bg-red-400/10 text-red-400 rounded-lg text-xs font-bold border border-red-400/20">{s}</span>
                    ))}
                    {matchResult.missingSkills?.length === 0 && <span className="text-slate-500 text-xs italic">Perfect match!</span>}
                  </div>
                </div>

                <div className="md:col-span-3 bg-white border border-blue-200 p-8 rounded-md space-y-4">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ThemeIcon name="Zap" size={14} /> AI Career Advice
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchResult.improvementSuggestions?.map((s, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                        <ThemeIcon name="ArrowRight" size={16} className="mt-0.5 flex-shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Background Accent */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-0"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
