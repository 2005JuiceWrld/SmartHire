import React from 'react';
import Island from '../components/Island';
import { Bell, MessageSquare, UserPlus, Heart, Zap } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'connection',
      title: 'New Connection Request',
      description: 'Alex Rivera wants to connect with you.',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'analysis',
      title: 'Resume Analysis Ready',
      description: 'Your latest resume analysis is complete. Check your new ATS score.',
      time: '5 hours ago',
      icon: Zap,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      description: 'Sarah Jenkins sent you a message regarding the Senior Dev role.',
      time: 'Yesterday',
      icon: MessageSquare,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <Island className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated with your professional network and AI insights.</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white p-6 rounded-2xl border border-slate-300 flex items-start gap-6 transition-all hover:shadow-md hover:border-slate-300 group cursor-pointer shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${notification.bg} ${notification.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100`}>
              <notification.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{notification.title}</h3>
                <span className="text-xs font-medium text-slate-400">{notification.time}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{notification.description}</p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-300 border-dashed">
            <Bell size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No new notifications</p>
          </div>
        )}
      </div>
    </Island>
  );
};

export default Notifications;
