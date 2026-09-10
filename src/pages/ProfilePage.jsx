import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  RefreshCw,
  Link2,
  Lock,
  CheckCircle2,
  ExternalLink,
  Plus,
  AlertCircle,
  Smartphone,
  Calendar,
  Building,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

export const ProfilePage = () => {
  const { profile, isSyncing, triggerSync } = usePolicy();

  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 'swiggy',
      name: 'Swiggy Delivery Partner',
      status: 'Connected',
      lastSynced: profile.lastIncomeSync,
      ordersVerified: '2,490 trips (Past 12 mos)',
      isPrimary: true,
    },
  ]);

  const [availablePlatforms, setAvailablePlatforms] = useState([
    { id: 'zomato', name: 'Zomato Delivery', desc: 'Connect secondary food delivery payouts' },
    { id: 'uber', name: 'Uber Driver', desc: 'Connect rideshare driver wallet' },
    { id: 'rapido', name: 'Rapido Captain', desc: 'Connect bike taxi earnings' },
  ]);

  const handleConnectAdditional = (plat) => {
    setConnectedPlatforms([
      ...connectedPlatforms,
      {
        id: plat.id,
        name: plat.name,
        status: 'Connected',
        lastSynced: 'Just now',
        ordersVerified: '120 trips (Verified)',
        isPrimary: false,
      },
    ]);
    setAvailablePlatforms(availablePlatforms.filter((p) => p.id !== plat.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
          Profile & data connection
        </h1>
        <p className="text-sm text-[#667085] mt-0.5">
          Manage your verified gig worker identity, payout data feeds, and privacy settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Personal Info & Data Connections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E1D7]">
              <h3 className="text-base font-bold text-[#214B9D]">Personal information</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
                KYC Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-3 rounded-lg bg-[#FFF8EC]/60 border border-[#E7E1D7]">
                <span className="text-[#667085] block">Full Name</span>
                <span className="font-bold text-sm text-[#172033] mt-0.5 block">
                  {profile.name}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFF8EC]/60 border border-[#E7E1D7]">
                <span className="text-[#667085] block">Mobile Number</span>
                <span className="font-bold text-sm text-[#172033] mt-0.5 block">
                  {profile.phone}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFF8EC]/60 border border-[#E7E1D7]">
                <span className="text-[#667085] block">Delivery Partner ID</span>
                <span className="font-mono font-bold text-sm text-[#214B9D] mt-0.5 block">
                  {profile.partnerId}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFF8EC]/60 border border-[#E7E1D7]">
                <span className="text-[#667085] block">Operational City</span>
                <span className="font-bold text-sm text-[#172033] mt-0.5 block">
                  {profile.city}
                </span>
              </div>
            </div>
          </section>

          {/* Connected Platform & Data Sync */}
          <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E1D7] gap-3">
              <div>
                <h3 className="text-base font-bold text-[#214B9D]">Connected platforms</h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Verified API feeds that calculate your income-adaptive premium schedule.
                </p>
              </div>

              {/* Sync Button */}
              <button
                onClick={triggerSync}
                disabled={isSyncing}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#FF711F] hover:bg-[#e86214] text-white text-xs font-bold shadow-xs transition-colors self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing payouts...' : 'Sync earnings'}</span>
              </button>
            </div>

            {/* Platform Connection Status Cards */}
            <div className="mt-4 space-y-3">
              {connectedPlatforms.map((plat) => (
                <div
                  key={plat.id}
                  className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-[#214B9D] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {plat.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-sm text-[#172033]">{plat.name}</h4>
                        {plat.isPrimary && (
                          <span className="text-[10px] font-bold bg-[#FFF2E8] text-[#FF711F] px-2 py-0.2 rounded border border-[#ffcfb0]">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#667085] mt-1">
                        <span>Data connection: <strong className="text-[#2E8B67] font-semibold">{plat.status}</strong></span>
                        <span>•</span>
                        <span>Historical data: <strong className="text-[#172033]">12 months</strong></span>
                        <span>•</span>
                        <span>Last sync: <strong className="text-[#172033]">{profile.lastIncomeSync}</strong></span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#214B9D] font-medium bg-white px-2.5 py-1 rounded border border-[#E7E1D7] self-start sm:self-auto">
                    {plat.ordersVerified}
                  </span>
                </div>
              ))}
            </div>

            {/* Option to link secondary platforms */}
            {availablePlatforms.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[#E7E1D7]">
                <span className="text-xs font-bold text-[#172033] block mb-2">
                  Work on multiple platforms? Add secondary feeds:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {availablePlatforms.map((plat) => (
                    <button
                      key={plat.id}
                      onClick={() => handleConnectAdditional(plat)}
                      className="p-2.5 rounded-lg border border-[#E7E1D7] bg-white hover:bg-[#FFF8EC] text-left transition-all flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#172033] block">{plat.name}</span>
                        <span className="text-[10px] text-[#667085]">Link earnings</span>
                      </div>
                      <Plus className="w-4 h-4 text-[#214B9D]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right 1 Column: Privacy & Security Section */}
        <div className="space-y-6">
          {/* Privacy & Financial Security Charter */}
          <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-[#E7E1D7]">
              <Lock className="w-5 h-5 text-[#214B9D]" />
              <h3 className="text-base font-bold text-[#214B9D]">Data privacy</h3>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-[#667085] leading-relaxed">
              <p className="font-medium text-[#172033] bg-[#FFF8EC] p-3 rounded-lg border border-[#E7E1D7]">
                “Your earnings data is used to calculate your adaptive premium.”
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B67] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172033]">Read-only access:</strong> We only import aggregate monthly earnings numbers to adjust premiums. We cannot touch or initiate payouts from your bank.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B67] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172033]">No credit checks:</strong> This is an insurance protection product, not a loan. Fluctuating income never hurts your CIBIL score.
                  </span>
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E8B67] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#172033]">Zero data brokerage:</strong> Your gig hours and order routes are never sold to advertisers or third parties.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E1D7]">
                <span className="text-[11px] text-[#667085] block">
                  Encrypted using 256-bit AES banking standards compliant with RBI Account Aggregator framework.
                </span>
              </div>
            </div>
          </section>

          {/* Help & Support Card */}
          <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle text-xs">
            <h4 className="font-bold text-sm text-[#172033] mb-2">Need Help?</h4>
            <p className="text-[#667085] leading-relaxed">
              Have questions about your monthly adaptive debit or Swiggy wallet connection?
            </p>
            <div className="mt-3 space-y-1.5 font-medium text-[#214B9D]">
              <div>Email: support@at-your-ease.in</div>
              <div>WhatsApp Partner Desk: +91 80 4567 8900</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
