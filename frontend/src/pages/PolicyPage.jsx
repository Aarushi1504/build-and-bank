import React from 'react';
import {
  ShieldCheck,
  Calendar,
  IndianRupee,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  PhoneCall,
  Lock,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

export const PolicyPage = () => {
  const {
    profile,
    annualTarget,
    currentPremium,
    currentIncome,
    baselineIncome,
    incomeDiffPct,
  } = usePolicy();

  const benefits = [
    {
      title: 'Accidental Death & Permanent Total Disability',
      coverage: '₹5,00,000',
      description: '24/7 protection whether on an active delivery order or off-shift.',
    },
    {
      title: 'In-Patient Emergency Hospitalization',
      coverage: 'Up to ₹2,00,000',
      description: 'Cashless admission across 6,800+ network hospitals pan-India.',
    },
    {
      title: 'Daily Shift Injury Hospital Cash',
      coverage: '₹1,000 / day',
      description: 'Compensates lost delivery earnings for up to 30 days of recovery.',
    },
    {
      title: 'OPD & Roadside Trauma Care',
      coverage: 'Up to ₹25,000',
      description: 'Covers immediate outpatient stitches, minor fractures, and scans.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
            Policy details
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Complete credentials and active coverage rules for your income-adaptive policy.
          </p>
        </div>

        {/* Download PDF Certificate button */}
        <button
          onClick={() => alert('Downloading official policy schedule certificate (PDF)...')}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7E1D7] hover:bg-[#FFF8EC] text-xs font-semibold text-[#214B9D] shadow-xs self-start sm:self-auto transition-colors"
        >
          <Download className="w-4 h-4 text-[#FF711F]" />
          <span>Download Policy Schedule (PDF)</span>
        </button>
      </div>

      {/* Primary Credentials Card */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E1D7]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] border border-[#d2e2fc] flex items-center justify-center text-[#214B9D]">
              <ShieldCheck className="w-5 h-5 text-[#214B9D]" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-medium text-[#667085]">
                CERTIFICATE #{profile.policyId}
              </span>
              <h3 className="text-base font-bold text-[#172033]">
                FlexCover Gig Partner Income-Shield
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
              <span className="w-2 h-2 rounded-full bg-[#2E8B67] mr-1.5 animate-pulse"></span>
              {profile.policyStatus}
            </span>
          </div>
        </div>

        {/* Key Parameters 4-column strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <div className="p-3.5 bg-[#FFF8EC]/60 rounded-lg border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Annual premium target:</span>
            <span className="text-xl font-bold text-[#172033] mt-1 block">
              ₹{annualTarget.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-[#214B9D] mt-0.5 block font-medium">Guaranteed ceiling</span>
          </div>

          <div className="p-3.5 bg-[#FFF8EC]/60 rounded-lg border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Policy period:</span>
            <span className="text-sm font-bold text-[#172033] mt-1 block">
              {profile.policyPeriod}
            </span>
            <span className="text-[11px] text-[#667085] mt-0.5 block">12 calendar months</span>
          </div>

          <div className="p-3.5 bg-[#FFF8EC]/60 rounded-lg border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Total sum insured (Coverage):</span>
            <span className="text-xl font-bold text-[#214B9D] mt-1 block">
              ₹{(profile.coverageAmount / 100000).toFixed(0)} Lakhs
            </span>
            <span className="text-[11px] text-[#2E8B67] mt-0.5 block font-medium">100% active</span>
          </div>

          <div className="p-3.5 bg-[#FFF8EC]/60 rounded-lg border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Next payment due:</span>
            <span className="text-xl font-bold text-[#FF711F] mt-1 block">
              ₹{currentPremium}
            </span>
            <span className="text-[11px] text-[#172033] mt-0.5 block font-semibold">
              30 Sep 2026
            </span>
          </div>
        </div>
      </section>

      {/* CORE EXPLANATION SECTION: Fixed Target vs Adaptive Timing */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#214B9D] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-[#FF711F]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#214B9D]">
              Your annual target does not change.
            </h3>
            <p className="text-sm text-[#172033] mt-1.5 font-medium leading-relaxed">
              “Only the timing and amount of monthly contributions can change according to your income.”
            </p>
            <p className="text-xs text-[#667085] mt-2 leading-relaxed max-w-3xl">
              Unlike traditional insurance policies that penalize or cancel your cover when you miss a high premium in a quiet month, FlexCover recalculates your monthly share proportionally. When delivery demand dips, your installment shrinks. When you earn well during festivals or monsoons, your share catches up naturally. Your ₹5,00,000 protection stays active every single day.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: WHY YOUR PREMIUM CHANGED */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="pb-3 border-b border-[#E7E1D7]">
          <h3 className="text-base font-bold text-[#214B9D]">Why your premium changed</h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Transparent breakdown of this month’s adaptive calculation.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Current income</span>
            <span className="text-xl font-bold text-[#172033] mt-1 block">
              ₹{currentIncome.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-[#667085] mt-1 block">Swiggy September payout</span>
          </div>

          <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Historical baseline</span>
            <span className="text-xl font-bold text-[#172033] mt-1 block">
              ₹{baselineIncome.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-[#667085] mt-1 block">12-month average for Sep</span>
          </div>

          <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
            <span className="text-xs text-[#667085] block">Difference</span>
            <span
              className={`text-xl font-bold mt-1 block ${
                incomeDiffPct < 0
                  ? 'text-[#FF711F]'
                  : incomeDiffPct > 0
                  ? 'text-[#2E8B67]'
                  : 'text-[#172033]'
              }`}
            >
              {incomeDiffPct > 0 ? `+${incomeDiffPct}%` : `${incomeDiffPct}%`}
            </span>
            <span className="text-[11px] text-[#667085] mt-1 block">Proportional income shift</span>
          </div>

          <div className="p-4 rounded-lg bg-[#EEF4FF] border border-[#c4dcff]">
            <span className="text-xs text-[#214B9D] font-semibold block">Adjusted premium</span>
            <span className="text-2xl font-bold text-[#214B9D] mt-1 block">
              ₹{currentPremium}
            </span>
            <span className="text-[11px] text-[#214B9D] mt-1 block">Automatically debited on 30 Sep</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] text-xs text-[#172033] flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B67] flex-shrink-0" />
          <span>
            Formula applied: <code className="bg-white px-1.5 py-0.5 rounded border border-[#E7E1D7] text-[#214B9D]">Adjusted = Expected (₹470) × (Current Income / Baseline)</code>. No hidden penalty fees.
          </span>
        </div>
      </section>

      {/* Policy Benefits Breakdown */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
        <h3 className="text-base font-bold text-[#214B9D] mb-4">
          Coverage Inclusions (₹5,00,000 Annual Value)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="p-4 rounded-lg border border-[#E7E1D7] bg-[#FFF8EC]/40">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-[#172033]">{b.title}</h4>
                <span className="font-bold text-xs text-[#214B9D] bg-white px-2 py-0.5 rounded border border-[#E7E1D7]">
                  {b.coverage}
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E7E1D7] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#667085] gap-2">
          <span>Need to file a claim? 24x7 cashless assistance available for all verified delivery partners.</span>
          <a
            href="tel:18001234567"
            className="inline-flex items-center space-x-1.5 font-bold text-[#214B9D] hover:underline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FF711F]" />
            <span>Emergency Helpline: 1800-123-4567</span>
          </a>
        </div>
      </section>
    </div>
  );
};
