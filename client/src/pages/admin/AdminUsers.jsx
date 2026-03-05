import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Island from '../../components/Island';
import { Trash2, User, Mail, Shield } from 'lucide-react';

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
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:8800/api/admin/users/${userId}`);
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Error deleting user", err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <Island className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
        <p className="text-slate-500 mt-1">Manage all user accounts registered on the platform.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <span className="font-bold text-slate-800">{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-600 font-medium">{user.email}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600 border border-red-100' :
                      user.role === 'recruiter' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={user.role === 'admin'}
                      className={`p-2 rounded-xl transition-all ${
                        user.role === 'admin' 
                        ? 'text-slate-300 cursor-not-allowed' 
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100'
                      }`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Island>
  );
};

export default AdminUsers;
