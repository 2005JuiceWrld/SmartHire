import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/candidate/Dashboard';
import Profile from './pages/candidate/Profile';
import Connections from './pages/candidate/Connections';
import ResumeAnalysis from './pages/candidate/ResumeAnalysis';
import RecruiterSearch from './pages/recruiter/RecruiterSearch';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import CreateJob from './pages/recruiter/CreateJob';
import MyJobs from './pages/recruiter/MyJobs';
import JobMatches from './pages/recruiter/JobMatches';
import Notifications from './pages/shared/Notifications';
import Settings from './pages/shared/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminJobs from './pages/admin/AdminJobs';

const ProtectedRoute = ({ allowedRoles }) => {
  const auth = useAuth();
  
  if (!auth) {
    console.error("Auth context not found!");
    return <div className="p-10 text-red-500 font-bold">Error: Auth Context Missing. Please check AuthContext.jsx</div>;
  }

  const { user, loading } = auth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DBEAFE] text-slate-700">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading SmartHire...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role || "candidate";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
      if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
      if (userRole === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
      return <Navigate to="/" replace />;
  }

  return <Layout />;
};

function AppContent() {
  const auth = useAuth();
  
  if (!auth) {
    return <div className="p-10 text-red-500 font-bold text-center">Critical Error: Auth provider not initializing.</div>;
  }

  const { user, loading } = auth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DBEAFE] text-slate-700">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Initializing SmartHire...</p>
        </div>
      </div>
    );
  }

  const userRole = user?.role || "candidate";

  const getHomeRedirect = () => {
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (userRole === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
    return <Navigate to="/" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={user ? getHomeRedirect() : <Login />} />
      <Route path="/register" element={user ? getHomeRedirect() : <Register />} />
      
      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
      </Route>

      {/* Candidate Routes */}
      <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />
      </Route>

      {/* Recruiter Routes */}
      <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/search" element={<RecruiterSearch />} />
        <Route path="/recruiter/create-job" element={<CreateJob />} />
        <Route path="/recruiter/jobs" element={<MyJobs />} />
        <Route path="/recruiter/jobs/:id/matches" element={<JobMatches />} />
      </Route>

      {/* Shared Routes */}
      <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter', 'admin']} />}>
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={user ? (userRole === 'admin' ? "/admin/dashboard" : (userRole === 'recruiter' ? "/recruiter/dashboard" : "/")) : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
