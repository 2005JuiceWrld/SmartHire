import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Trash2, User, Mail, Shield, ShieldCheck, Globe } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/admin/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? All associated data will be purged. This action is terminal.")) return;
    
    try {
      await axios.delete(`http://localhost:8800/api/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
      alert("Failed to purge user record.");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-slate-500 font-bold animate-pulse">Synchronizing Global Identity Index...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             User Ecosystem Audit
          </h1>
          <p className="text-slate-500 font-semibold mt-1">Monitor and manage all authenticated identities across the platform.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Globe} size="sm">Export Directory</Button>
        </div>
      </div>

      <Card noPadding className="border-none shadow-2xl shadow-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Endpoint</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Authorization</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">System Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 border-4 border-white shadow-md font-black text-sm group-hover:bg-blue-200 transition-colors">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <span className="font-black text-slate-900 block group-hover:text-blue-600 transition-colors">{user.firstName} {user.lastName}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">UID: {user._id.slice(-8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                      <Mail size={16} className="text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={
                      user.role === 'admin' ? 'danger' :
                      user.role === 'recruiter' ? 'warning' :
                      'primary'
                    } dot className="font-black py-1.5 px-4 min-w-[120px]">
                      {user.role} tier
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={user.role === 'admin'}
                      className={`p-2.5 rounded-xl transition-all ${
                        user.role === 'admin' 
                        ? 'text-slate-200 cursor-not-allowed opacity-30' 
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100'
                      }`}
                      icon={Trash2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
