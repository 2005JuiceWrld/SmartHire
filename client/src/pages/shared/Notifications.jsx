import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import ThemeIcon from '../../components/common/ThemeIcon';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'connection',
      title: 'Network Expansion',
      description: 'Alex Rivera sent you a connection request. They are a Senior Product Designer at Meta.',
      time: '2h ago',
      icon: 'UserPlus',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      unread: true
    },
    {
      id: 2,
      type: 'analysis',
      title: 'Neural Analysis Complete',
      description: 'Your latest resume synchronization is finished. Your ATS score improved by 15%.',
      time: '5h ago',
      icon: 'Zap',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      title: 'New Direct Message',
      description: 'Sarah Jenkins (Recruiter) sent you a message regarding the Senior Architect role.',
      time: 'Yesterday',
      icon: 'MessageSquare',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      unread: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Activity Center</h1>
          <p className="text-slate-500 font-semibold mt-1">Stay synchronized with your network and AI career insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={(props) => <ThemeIcon name="CheckCircle2" {...props} />}>Mark all read</Button>
          <Button variant="ghost" size="sm" icon={(props) => <ThemeIcon name="MoreHorizontal" {...props} />}></Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          return (
            <Card key={notification.id} className={`group hover:border-blue-200 cursor-pointer transition-all duration-300 border-l-4 ${notification.unread ? 'border-l-blue-500 bg-blue-50/10' : 'border-l-transparent'}`}>
              <div className="flex items-start gap-6">
                <div className={`w-14 h-14 rounded-2xl ${notification.bg} ${notification.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-white group-hover:scale-110 transition-transform`}>
                  <ThemeIcon name={notification.icon} size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black text-slate-900">{notification.title}</h3>
                      {notification.unread && <Badge variant="primary" dot>New</Badge>}
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{notification.time}</span>
                  </div>
                  <p className="text-slate-500 font-medium leading-relaxed">{notification.description}</p>
                  
                  <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="primary" size="sm" className="py-2 text-xs">View Details</Button>
                    <Button variant="ghost" size="sm" className="py-2 text-xs">Dismiss</Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {notifications.length === 0 && (
          <EmptyState 
            title="All caught up!" 
            description="You don't have any new notifications at the moment. Check back later for updates."
            icon={(props) => <ThemeIcon name="Bell" {...props} />}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
