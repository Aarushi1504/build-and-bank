import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileNav } from './MobileNav';
import { usePolicy } from '../../context/PolicyContext';
import { CheckCircle2, X } from 'lucide-react';

export const AppLayout = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { syncSuccessToast } = usePolicy();

  return (
    <div className="flex h-screen bg-[#FFF8EC] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50 shadow-xl">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-md text-[#667085] hover:text-[#172033]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar onCloseMobile={() => setMobileDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader onOpenMobileMenu={() => setMobileDrawerOpen(true)} />

        {/* Sync Toast Notification */}
        {syncSuccessToast && (
          <div className="bg-[#EBF7F1] border-b border-[#d2edd9] px-4 py-2.5 flex items-center justify-between text-xs text-[#2E8B67] transition-all">
            <div className="flex items-center space-x-2 max-w-4xl mx-auto w-full">
              <CheckCircle2 className="w-4 h-4 text-[#2E8B67] flex-shrink-0" />
              <span className="font-medium">
                Earnings data successfully synchronized from Swiggy Delivery API. Historical baseline verified.
              </span>
            </div>
          </div>
        )}

        {/* Scrollable Page Area */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 p-4 md:p-8 bg-[#FFF8EC]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </div>
  );
};
