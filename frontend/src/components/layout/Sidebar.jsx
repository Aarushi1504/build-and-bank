import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  Receipt,
  Bell,
  UserCheck,
  Shield,
  Layers,
} from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';

export const Sidebar = ({ onCloseMobile }) => {
  const { alerts, profile } = usePolicy();
  const pendingAlertsCount = alerts.filter((a) => a.actionRequired && a.status === 'pending').length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/analytics', label: 'Income & Premium', icon: TrendingUp },
    { to: '/policy', label: 'Policy', icon: ShieldCheck },
    { to: '/history', label: 'Premium History', icon: Receipt },
    {
      to: '/alerts',
      label: 'Alerts',
      icon: Bell,
      badge: pendingAlertsCount > 0 ? pendingAlertsCount : null,
    },
    { to: '/profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#E7E1D7] flex flex-col justify-between h-full select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#E7E1D7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#214B9D] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5 text-[#FF711F]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-[#214B9D] tracking-tight">FlexCover</span>
              </div>
              <span className="text-[11px] font-medium text-[#667085] tracking-wide block">
                At-Your-Ease Platform
              </span>
            </div>
          </div>
        </div>

        {/* Worker Badge Mini-strip */}
        <div className="px-5 py-3 bg-[#FFF8EC] border-b border-[#E7E1D7] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#FF711F]"></span>
            <span className="font-medium text-[#172033]">{profile.platform} Partner</span>
          </div>
          <span className="text-[11px] text-[#667085] font-mono">BLR-8921</span>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#214B9D] text-white shadow-xs'
                      : 'text-[#172033] hover:bg-[#FFF8EC] hover:text-[#214B9D]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-[#FF711F]' : 'text-[#667085]'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#FF711F] text-white'
                            : 'bg-[#FF711F] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Section */}
      <div className="p-4 border-t border-[#E7E1D7] bg-[#FFFFFF]">
        <div className="p-3 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E8B67] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2E8B67]"></span>
              </span>
              <span className="text-xs font-semibold text-[#172033]">Policy active</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#2E8B67] font-semibold border border-[#E7E1D7]">
              ₹5L Cover
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#667085]">
            <span>Target: ₹6,000/yr</span>
            <span className="text-[#2E8B67] font-medium">On track</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
