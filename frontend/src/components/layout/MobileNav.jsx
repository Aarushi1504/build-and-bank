import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, ShieldCheck, Receipt, Bell, UserCheck } from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';

export const MobileNav = () => {
  const { alerts } = usePolicy();
  const pendingAlertsCount = alerts.filter((a) => a.actionRequired && a.status === 'pending').length;

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/analytics', label: 'Analytics', icon: TrendingUp },
    { to: '/policy', label: 'Policy', icon: ShieldCheck },
    { to: '/history', label: 'History', icon: Receipt },
    {
      to: '/alerts',
      label: 'Alerts',
      icon: Bell,
      badge: pendingAlertsCount > 0 ? pendingAlertsCount : null,
    },
    { to: '/profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF] border-t border-[#E7E1D7] px-2 py-1.5 shadow-lg flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-[#214B9D] font-bold'
                  : 'text-[#667085] hover:text-[#172033]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 mb-0.5 ${
                      isActive ? 'text-[#FF711F]' : 'text-[#667085]'
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#FF711F] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
