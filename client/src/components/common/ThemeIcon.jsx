import React from 'react';

const ICON_MAP = {
  LayoutDashboard: 'dashboards.png',
  UserCircle: '007-user-1.png',
  Users: '006-user.png',
  FileSearch: '006-resume.png',
  Briefcase: '008-briefcase.png',
  Bell: '005-bell.png',
  Settings: '002-settings.png',
  LogOut: '004-exit.png',
  Menu: '010-menu.png',
  X: '003-close.png',
  ChevronRight: '010-right-arrow.png',
  ChevronDown: '002-down.png',
  Search: '001-loupe.png',
  Sparkles: '013-star.png',
  PlusCircle: '008-add-user.png',
  TrendingUp: '009-rise.png',
  FileText: '007-google-docs.png',
  Clock: '005-wall-clock.png',
  CheckCircle: '003-success.png',
  CheckCircle2: '004-check.png',
  AlertCircle: '002-danger.png',
  Star: '001-star.png',
  Zap: '008-graph.png',
  Target: '011-goal.png',
  ArrowRight: '010-right-arrow.png',
  Upload: '009-upload.png',
  UserPlus: '008-add-user.png',
  MessageSquare: '007-email.png',
  Shield: '006-shield.png',
  Globe: '004-internet.png',
  Lock: '003-insurance.png',
  Sliders: '009-setting.png',
  MoreHorizontal: '001-more.png',
  Moon: '001-star.png'
};

const ThemeIcon = ({ name, size = 16, className = '', alt, ...props }) => {
  const fileName = ICON_MAP[name];
  if (!fileName) return null;

  return (
    <img
      src={`/theme-icons/${fileName}`}
      alt={alt || name}
      width={size}
      height={size}
      className={`inline-block shrink-0 object-contain ${className}`.trim()}
      {...props}
    />
  );
};

export default ThemeIcon;
