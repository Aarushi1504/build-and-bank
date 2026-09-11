import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, Shield, RefreshCw } from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';

export const TopHeader = ({ onOpenMobileMenu }) => {
  const { profile, alerts, isSyncing, triggerSync } = usePolicy();
  const pendingAlertsCount = alerts.filter((a) => a.actionRequired && a.status === 'pending').length;

  return (
    <header className="sticky top-0 z-20 bg-[#FFFFFF] border-b border-[#E7E1D7] px-4 md:px-8 py-3.5 flex items-center justify-between shadow-subtle">
      {/* Left side: Hamburger for mobile + Greeting */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#172033] hover:bg-[#FFF8EC] border border-[#E7E1D7] transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-[#214B9D]" />
        </button>

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base md:text-lg font-bold text-[#172033] tracking-tight">
              Good morning, {profile.name.split(' ')[0]}
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
              Verified Partner
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-[#667085]">
            <span>Policy ID:</span>
            <span className="font-mono font-semibold text-[#214B9D]">{profile.policyId}</span>
          </div>
        </div>
      </div>

      {/* Right side: Sync quick button, Notification icon, Avatar */}
      <div className="flex items-center space-x-2.5 md:space-x-4">
        {/* Quick Sync indicator */}
        <button
          onClick={triggerSync}
          disabled={isSyncing}
          title="Quick sync earnings with Swiggy partner portal"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#214B9D] bg-[#FFF8EC] hover:bg-[#ffeed3] border border-[#E7E1D7] rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#FF711F] ${isSyncing ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">{isSyncing ? 'Syncing...' : 'Sync Earnings'}</span>
        </button>

        {/* Notification Bell */}
        <Link
          to="/alerts"
          className="relative p-2 rounded-lg text-[#172033] hover:bg-[#FFF8EC] border border-[#E7E1D7] transition-colors"
          title="Alerts & Adjustments"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5 text-[#214B9D]" />
          {pendingAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF711F] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
              {pendingAlertsCount}
            </span>
          )}
        </Link>

        {/* Worker Mini Avatar */}
        <Link
          to="/profile"
          className="flex items-center space-x-2 p-1.5 pr-2.5 rounded-lg border border-[#E7E1D7] bg-[#FFF8EC] hover:border-[#cbd5e1] transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-[#214B9D] text-white flex items-center justify-center font-bold text-xs">
            RS
          </div>
          <div className="hidden lg:block text-left">
            <span className="block text-xs font-semibold text-[#172033] leading-none">Rahul S.</span>
            <span className="text-[10px] text-[#667085] leading-none">Swiggy Gold</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
