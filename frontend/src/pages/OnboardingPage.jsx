import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Link2, Sparkles, Building2 } from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = usePolicy();

  const [formData, setFormData] = useState({
    name: profile.name || 'Rahul Sharma',
    phone: profile.phone || '+91 98765 43210',
    platform: profile.platform || 'Swiggy',
    incomeRange: '₹25,000 - ₹35,000',
  });

  const [connectState, setConnectState] = useState('idle'); // idle | connecting | connected
  const [connectProgress, setConnectProgress] = useState(0);

  const platforms = [
    { id: 'Swiggy', name: 'Swiggy Delivery Partner', badge: 'Popular' },
    { id: 'Zomato', name: 'Zomato Delivery Partner', badge: 'Popular' },
    { id: 'Uber', name: 'Uber Driver Partner', badge: '' },
    { id: 'Rapido', name: 'Rapido Captain', badge: '' },
    { id: 'Other', name: 'Other Delivery / Gig Work', badge: '' },
  ];

  const incomeRanges = [
    '₹15,000 – ₹25,000',
    '₹25,000 – ₹35,000',
    '₹35,000 – ₹50,000',
    '₹50,000+',
  ];

  const handleSimulateConnect = () => {
    setConnectState('connecting');
    setConnectProgress(20);

    setTimeout(() => {
      setConnectProgress(60);
    }, 600);

    setTimeout(() => {
      setConnectProgress(100);
      setConnectState('connected');
    }, 1300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      platform: formData.platform,
      dataConnection: 'Connected',
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E1D7] text-xs font-semibold text-[#214B9D] mb-4 shadow-subtle">
            <Shield className="w-4 h-4 text-[#FF711F]" />
            <span>At-Your-Ease • FlexCover</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
            Insurance that adjusts to your income.
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-[#667085] leading-relaxed max-w-lg mx-auto">
            Your annual coverage stays protected while your monthly premium adapts to what you actually earn.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#FFFFFF] border border-[#E7E1D7] rounded-xl shadow-subtle p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Phone */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EC]/60 border border-[#E7E1D7] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#214B9D] focus:bg-white transition-colors"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EC]/60 border border-[#E7E1D7] rounded-lg text-sm text-[#172033] focus:outline-none focus:border-[#214B9D] focus:bg-white transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Gig Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-2">
                Primary Gig Platform
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {platforms.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: plat.id })}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-all ${
                      formData.platform === plat.id
                        ? 'border-[#214B9D] bg-[#EEF4FF] text-[#214B9D] font-semibold'
                        : 'border-[#E7E1D7] bg-white text-[#172033] hover:bg-[#FFF8EC]'
                    }`}
                  >
                    <span>{plat.name}</span>
                    {plat.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E7E1D7] text-[#667085]">
                        {plat.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Income Range */}
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-2">
                Typical Monthly Income Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                {incomeRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, incomeRange: range })}
                    className={`py-2 px-3 rounded-lg border text-xs text-center transition-all ${
                      formData.incomeRange === range
                        ? 'border-[#FF711F] bg-[#FFF2E8] text-[#FF711F] font-semibold'
                        : 'border-[#E7E1D7] bg-white text-[#667085] hover:bg-[#FFF8EC]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Earnings Connection Simulation */}
            <div className="pt-2 border-t border-[#E7E1D7]">
              <div className="flex items-start space-x-3 p-3.5 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
                <Link2 className="w-5 h-5 text-[#214B9D] flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-xs">
                  <h4 className="font-semibold text-[#172033]">Connect your earnings</h4>
                  <p className="text-[#667085] mt-0.5 leading-relaxed">
                    Import historical earnings securely to calculate an income-adaptive premium schedule based on your real payout patterns.
                  </p>

                  <div className="mt-3">
                    {connectState === 'idle' && (
                      <button
                        type="button"
                        onClick={handleSimulateConnect}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-[#214B9D] hover:bg-[#183b7f] text-white font-medium text-xs shadow-xs transition-colors"
                      >
                        <span>Connect {formData.platform} Payouts</span>
                      </button>
                    )}

                    {connectState === 'connecting' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#214B9D] font-medium">
                          <span>Importing 12-month earnings records...</span>
                          <span>{connectProgress}%</span>
                        </div>
                        <div className="w-full bg-[#E7E1D7] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#214B9D] h-full transition-all duration-500 rounded-full"
                            style={{ width: `${connectProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {connectState === 'connected' && (
                      <div className="flex items-center space-x-2 text-[11px] font-medium text-[#2E8B67]">
                        <CheckCircle2 className="w-4 h-4 text-[#2E8B67]" />
                        <span>12 months of payout records verified & connected.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg bg-[#FF711F] hover:bg-[#e86214] text-white font-semibold text-sm shadow-sm transition-colors"
              >
                <span>Go to Policy Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-[#667085] mt-2.5">
                Target: ₹6,000/year • No penalty for low-earning months • Full ₹5 Lakh coverage
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer reassurance */}
      <div className="max-w-xl mx-auto w-full text-center mt-6 text-xs text-[#667085]">
        Designed for Swiggy, Zomato, Uber, Rapido, and Amazon delivery partners.
      </div>
    </div>
  );
};
