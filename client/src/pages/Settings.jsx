import React from 'react';
import Island from '../components/Island';
import { Settings as SettingsIcon, Shield, Bell, Moon, LogOut, ChevronRight } from 'lucide-react';

const Settings = () => {
  const sections = [
    {
      title: 'Account Settings',
      description: 'Manage your profile and account information',
      icon: SettingsIcon,
      items: ['Profile Visibility', 'Language Preferences', 'Region Settings']
    },
    {
      title: 'Security',
      description: 'Keep your account secure and protected',
      icon: Shield,
      items: ['Password Management', 'Two-Factor Authentication', 'Connected Devices']
    },
    {
      title: 'Notifications',
      description: 'Control how you receive alerts and updates',
      icon: Bell,
      items: ['Email Notifications', 'Push Alerts', 'Smart Feed Digest']
    }
  ];

  return (
    <Island className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your professional presence and platform preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all font-semibold border border-slate-200">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md">
            <div className="p-6 flex items-start gap-6 border-b border-slate-200 bg-white/50">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                <section.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="text-sm text-slate-500">{section.description}</p>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {section.items.map((item, itemIdx) => (
                <button key={itemIdx} className="w-full p-4 px-6 flex items-center justify-between hover:bg-slate-100/50 transition-colors text-left group">
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group cursor-pointer">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                <Moon size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Dark Mode</h3>
                <p className="text-slate-400 text-sm">Experience SmartHire in a new light (or dark).</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-slate-800 rounded-full p-1 border border-slate-700 relative">
              <div className="w-4 h-4 bg-slate-600 rounded-full transition-all"></div>
            </div>
          </div>
        </div>
      </div>
    </Island>
  );
};

export default Settings;
