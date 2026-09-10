import React, { useState } from 'react';
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Sliders,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

export const AlertsPage = () => {
  const {
    alerts,
    adjustmentPlanAccepted,
    acceptAdjustmentPlan,
    keepCurrentPlan,
  } = usePolicy();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [spreadChoice, setSpreadChoice] = useState('4-months'); // '4-months' | '2-months' | 'one-time'

  // Primary deficit alert item
  const deficitAlert = alerts.find((a) => a.id === 'alert-deficit-4m');
  const secondaryAlerts = alerts.filter((a) => a.id !== 'alert-deficit-4m');

  const handleConfirmAdjustment = () => {
    acceptAdjustmentPlan();
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
          Alerts & smart adjustments
        </h1>
        <p className="text-sm text-[#667085] mt-0.5">
          Proactive notifications and gentle rebalancing options to keep your annual insurance target protected.
        </p>
      </div>

      {/* CORE FEATURE: 4-MONTH REMAINING DEFICIT ALERT */}
      {deficitAlert && (
        <section className="bg-white border-2 border-[#FF711F] rounded-xl p-5 sm:p-7 shadow-card relative overflow-hidden">
          {/* Subtle Orange Left Stripe */}
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#FF711F]" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] border border-[#ffcfb0] flex items-center justify-center text-[#FF711F] flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-[#FF711F]" />
              </div>
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#FF711F] bg-[#FFF2E8] px-2.5 py-0.5 rounded border border-[#ffcfb0]">
                    Cycle Rebalancing • 4 Months Remaining
                  </span>
                  <span className="text-xs text-[#667085]">{deficitAlert.date}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#172033] mt-1.5">
                  {deficitAlert.title}
                </h2>

                <p className="text-sm text-[#667085] mt-1.5 leading-relaxed">
                  {deficitAlert.message}
                </p>
              </div>
            </div>

            {/* Status indicator if already accepted */}
            {adjustmentPlanAccepted && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9] self-start">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Adjustment Activated
              </span>
            )}
          </div>

          {/* Key Metrics: Current Shortfall, Months Remaining, Suggested Adjustment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
              <span className="text-xs text-[#667085] block font-medium">Current shortfall:</span>
              <span className="text-2xl font-bold text-[#FF711F] mt-1 block">
                ₹{deficitAlert.shortfall}
              </span>
              <span className="text-[11px] text-[#667085] mt-0.5 block">
                Accumulated from low-income months
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7]">
              <span className="text-xs text-[#667085] block font-medium">Months remaining:</span>
              <span className="text-2xl font-bold text-[#214B9D] mt-1 block">
                {deficitAlert.monthsRemaining}
              </span>
              <span className="text-[11px] text-[#667085] mt-0.5 block">
                Dec 2026 – Mar 2027
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#EEF4FF] border border-[#c6ddff]">
              <span className="text-xs text-[#214B9D] block font-semibold">
                Suggested monthly adjustment:
              </span>
              <span className="text-2xl font-bold text-[#214B9D] mt-1 block">
                ₹{deficitAlert.suggestedAdjustment}
                <span className="text-xs font-normal text-[#667085]">/month</span>
              </span>
              <span className="text-[11px] text-[#214B9D] mt-0.5 block font-medium">
                Smooths payment without a year-end shock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-[#E7E1D7] flex flex-wrap items-center gap-3">
            {!adjustmentPlanAccepted ? (
              <>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-5 py-2.5 rounded-lg bg-[#FF711F] hover:bg-[#e86214] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Review adjustment
                </button>
                <button
                  onClick={keepCurrentPlan}
                  className="px-5 py-2.5 rounded-lg bg-white border border-[#E7E1D7] hover:bg-[#FFF8EC] text-xs font-semibold text-[#172033] shadow-xs transition-colors"
                >
                  Keep current plan
                </button>
              </>
            ) : (
              <div className="text-xs text-[#2E8B67] font-medium flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  You agreed to spread ₹155/month across Dec, Jan, Feb, and Mar. Your policy will smoothly finish at exactly ₹6,000.
                </span>
              </div>
            )}
            <span className="text-xs text-[#667085] ml-auto">
              No cancellation risk — your ₹5 Lakh cover remains 100% active.
            </span>
          </div>
        </section>
      )}

      {/* SECONDARY REALISTIC ALERTS */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-[#214B9D] uppercase tracking-wider">
          Recent Notifications & Activity
        </h3>

        {/* Dynamic Secondary Alerts */}
        <div className="space-y-3">
          {secondaryAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white border border-[#E7E1D7] rounded-xl p-4 sm:p-5 shadow-subtle flex items-start justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    alert.type === 'success'
                      ? 'bg-[#EBF7F1] text-[#2E8B67]'
                      : 'bg-[#F0F6FE] text-[#214B9D]'
                  }`}
                >
                  {alert.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Info className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-[#172033]">{alert.title}</h4>
                    <span className="text-[10px] text-[#667085]">{alert.date}</span>
                  </div>
                  <p className="text-xs text-[#667085] mt-1 leading-relaxed max-w-2xl">
                    {alert.message}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#667085] font-medium whitespace-nowrap hidden sm:inline">
                Verified
              </span>
            </div>
          ))}

          {/* Example prompt alert item: "Your income increased 12% this month" */}
          <div className="bg-white border border-[#E7E1D7] rounded-xl p-4 sm:p-5 shadow-subtle flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#EBF7F1] text-[#2E8B67] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-[#172033]">
                    Your income increased 12% in July
                  </h4>
                  <span className="text-[10px] text-[#667085]">30 Jul 2026</span>
                </div>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed max-w-2xl">
                  Your premium was automatically adjusted to ₹590 during the monsoon surge, allowing you to bank surplus contributions toward quieter months.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#2E8B67] font-semibold whitespace-nowrap hidden sm:inline">
              Auto-balanced
            </span>
          </div>
        </div>
      </section>

      {/* REVIEW ADJUSTMENT MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E1D7] rounded-xl max-w-lg w-full p-6 shadow-xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#667085] hover:text-[#172033]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 text-[#214B9D] mb-1">
              <Sliders className="w-5 h-5 text-[#FF711F]" />
              <h3 className="text-lg font-bold">Review Smart Rebalancing</h3>
            </div>
            <p className="text-xs text-[#667085]">
              Choose how you’d like to settle the ₹620 shortfall over the remainder of the policy year.
            </p>

            <div className="space-y-3 mt-4">
              {/* Option A: Recommended 4 Months */}
              <label
                onClick={() => setSpreadChoice('4-months')}
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  spreadChoice === '4-months'
                    ? 'border-[#FF711F] bg-[#FFF2E8]'
                    : 'border-[#E7E1D7] hover:bg-[#FFF8EC]'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-[#172033]">
                      Spread over remaining 4 months
                    </span>
                    <span className="text-[10px] bg-[#FF711F] text-white px-1.5 py-0.2 rounded font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#667085] mt-1">
                    Adds ₹155/month to your scheduled premium in Dec, Jan, Feb, and Mar.
                  </p>
                </div>
                <span className="font-bold text-sm text-[#FF711F]">₹155/mo</span>
              </label>

              {/* Option B: 2 Months */}
              <label
                onClick={() => setSpreadChoice('2-months')}
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  spreadChoice === '2-months'
                    ? 'border-[#214B9D] bg-[#EEF4FF]'
                    : 'border-[#E7E1D7] hover:bg-[#FFF8EC]'
                }`}
              >
                <div>
                  <span className="font-bold text-xs text-[#172033]">
                    Clear in 2 months (Diwali festive bonus)
                  </span>
                  <p className="text-xs text-[#667085] mt-1">
                    Adds ₹310/month across October and November when orders are elevated.
                  </p>
                </div>
                <span className="font-bold text-sm text-[#214B9D]">₹310/mo</span>
              </label>

              {/* Option C: Keep Current */}
              <label
                onClick={() => setSpreadChoice('one-time')}
                className={`p-3.5 rounded-lg border flex items-start justify-between cursor-pointer transition-all ${
                  spreadChoice === 'one-time'
                    ? 'border-[#214B9D] bg-[#EEF4FF]'
                    : 'border-[#E7E1D7] hover:bg-[#FFF8EC]'
                }`}
              >
                <div>
                  <span className="font-bold text-xs text-[#172033]">
                    One-time catch up at cycle end (March 2027)
                  </span>
                  <p className="text-xs text-[#667085] mt-1">
                    Pay whatever deficit remains on 31 March 2027.
                  </p>
                </div>
                <span className="font-bold text-sm text-[#172033]">₹620</span>
              </label>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E7E1D7] flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-lg border border-[#E7E1D7] text-xs font-semibold text-[#172033] hover:bg-[#FFF8EC]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdjustment}
                className="px-4 py-2 rounded-lg bg-[#FF711F] hover:bg-[#e86214] text-white text-xs font-bold shadow-xs"
              >
                Confirm Plan Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
