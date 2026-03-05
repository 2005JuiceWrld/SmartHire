import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Connections from './pages/Connections';
import ResumeAnalysis from './pages/ResumeAnalysis';
// import Recruiter from './pages/Recruiter'; // Replaced by RecruiterDashboard
import RecruiterSearch from './pages/RecruiterSearch';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CreateJob from './pages/CreateJob';
import MyJobs from './pages/MyJobs';
import JobMatches from './pages/JobMatches';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-bold text-indigo-600">
        Loading SmartHire...
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-bold text-indigo-600">
        Initializing...
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
