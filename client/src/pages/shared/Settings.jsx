import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Settings as SettingsIcon, Shield, Bell, Moon, LogOut, ChevronRight, User, Globe, Lock, Sliders, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { logout } = useAuth();

  const sections = [
    {
      title: 'Professional Profile',
      description: 'Manage how recruiters and peers see your professional persona.',
      icon: User,
      items: [
        { label: 'Public Visibility', desc: 'Control who can discover your profile' },
        { label: 'Language & Region', desc: 'Set your preferred interface language' },
        { label: 'Social Integration', desc: 'Connect LinkedIn, GitHub, and Portfolio' }
      ]
    },
    {
      title: 'Privacy & Security',
      description: 'Advanced settings to keep your professional data safe.',
      icon: Shield,
      items: [
        { label: 'Authentication', desc: 'Password and Two-Factor settings' },
        { label: 'Session Management', desc: 'View and manage active devices' },
        { label: 'Data Export', desc: 'Download a copy of your AI-analyzed data' }
      ]
    },
    {
      title: 'Intelligence Alerts',
      description: 'Configure how you receive AI matching notifications.',
      icon: Sparkles,
      items: [
        { label: 'Job Match Frequency', desc: 'How often to receive new job matches' },
        { label: 'Neural Digest', desc: 'Weekly summary of network activity' },
        { label: 'Push Notifications', desc: 'Real-time platform activity alerts' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Preferences</h1>
          <p className="text-slate-500 font-semibold mt-1">Customize your SmartHire experience and security protocols.</p>
        </div>
        <Button 
          variant="outline" 
          icon={LogOut} 
          onClick={logout}
          className="text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
        >
          Sign Out
        </Button>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <Card key={idx} noPadding className="overflow-hidden border-none shadow-xl shadow-slate-100/50">
              <div className="p-8 flex items-start gap-6 bg-slate-50/50 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100">
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{section.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mt-0.5">{section.description}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {section.items.map((item, itemIdx) => (
                  <button key={itemIdx} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all text-left group">
                    <div>
                      <span className="text-base font-bold text-slate-800 block group-hover:text-blue-600 transition-colors">{item.label}</span>
                      <span className="text-xs font-semibold text-slate-400 mt-0.5 block">{item.desc}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </Card>
          );
        })}

        <Card className="bg-blue-100 p-8 border border-blue-200 shadow-sm relative overflow-hidden group cursor-pointer">
          <div className="relative z-10 flex items-center justify-between text-slate-900">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-blue-200 group-hover:bg-blue-200 transition-colors">
                <Moon size={28} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-black">Interface Theme</h3>
                <p className="text-slate-600 text-sm font-medium">Currently using <span className="text-blue-700 font-bold uppercase tracking-widest text-xs">Light Protocol</span></p>
              </div>
            </div>
            <div className="w-14 h-7 bg-white rounded-full p-1.5 border border-blue-200 relative transition-colors group-hover:border-blue-400">
              <div className="w-4 h-4 bg-blue-500 rounded-full transition-all"></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/60 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
