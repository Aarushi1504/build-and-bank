import React, { useState } from 'react';
import {
  Receipt,
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  Filter,
  ArrowDownRight,
  ArrowUpRight,
  FileCheck,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

export const HistoryPage = () => {
  const { scheduleData, currentIncome, currentPremium, paidSoFar, annualTarget } = usePolicy();
  const [filter, setFilter] = useState('all'); // all | paid | upcoming

  // Merge the dynamic September state with the history items
  const historyItems = scheduleData.map((item) => {
    if (item.monthKey === 'Sep') {
      return {
        ...item,
        actualIncome: currentIncome,
        actualPremium: currentPremium,
      };
    }
    return item;
  });

  const filteredItems = historyItems.filter((item) => {
    if (filter === 'paid') return item.status === 'Paid';
    if (filter === 'upcoming') return item.status === 'Upcoming' || item.status === 'Scheduled';
    return true;
  });

  const handleDownloadReceipt = (month) => {
    alert(`Downloading payment receipt for ${month} (PDF)...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
            Premium history
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Transparent record of your monthly earnings, baseline targets, and actual premiums paid.
          </p>
        </div>

        {/* Download Statement Button */}
        <button
          onClick={() => alert('Downloading complete year statement (PDF)...')}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-white border border-[#E7E1D7] hover:bg-[#FFF8EC] text-xs font-semibold text-[#214B9D] shadow-xs self-start sm:self-auto transition-colors"
        >
          <Download className="w-4 h-4 text-[#FF711F]" />
          <span>Download Statement (FY 2026-27)</span>
        </button>
      </div>

      {/* Summary Strip */}
      <div className="bg-white border border-[#E7E1D7] rounded-xl p-4 sm:p-5 shadow-subtle grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-xs text-[#667085] block">Total Paid to Date:</span>
          <span className="text-xl font-bold text-[#2E8B67] mt-0.5 block">
            ₹{paidSoFar.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-[#667085]">5 monthly cycles</span>
        </div>
        <div>
          <span className="text-xs text-[#667085] block">Annual Target:</span>
          <span className="text-xl font-bold text-[#172033] mt-0.5 block">
            ₹{annualTarget.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-[#214B9D] font-medium">₹3,150 remaining</span>
        </div>
        <div>
          <span className="text-xs text-[#667085] block">On-Time Payment Rate:</span>
          <span className="text-xl font-bold text-[#214B9D] mt-0.5 block">
            100%
          </span>
          <span className="text-[11px] text-[#2E8B67] font-medium">Zero lapses</span>
        </div>
        <div>
          <span className="text-xs text-[#667085] block">Auto-Debit Mechanism:</span>
          <span className="text-sm font-bold text-[#172033] mt-1 block">
            Swiggy Payout Deduct
          </span>
          <span className="text-[11px] text-[#667085]">Seamless deduction</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-[#667085]" />
          <span className="text-xs font-semibold text-[#667085]">Filter:</span>
          <div className="inline-flex bg-white p-0.5 rounded-lg border border-[#E7E1D7] text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-[#214B9D] text-white font-medium'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              All (12 Months)
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'paid'
                  ? 'bg-[#214B9D] text-white font-medium'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              Paid (5)
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'upcoming'
                  ? 'bg-[#214B9D] text-white font-medium'
                  : 'text-[#667085] hover:text-[#172033]'
              }`}
            >
              Upcoming / Scheduled (7)
            </button>
          </div>
        </div>
      </div>

      {/* Table for Desktop & Tablet */}
      <div className="hidden md:block bg-white border border-[#E7E1D7] rounded-xl overflow-hidden shadow-subtle">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFF8EC] border-b border-[#E7E1D7] text-xs font-bold text-[#172033]">
              <th className="py-3.5 px-5">Month</th>
              <th className="py-3.5 px-5">Income</th>
              <th className="py-3.5 px-5">Expected Premium</th>
              <th className="py-3.5 px-5">Actual Premium</th>
              <th className="py-3.5 px-5">Status</th>
              <th className="py-3.5 px-5 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E1D7] text-xs">
            {filteredItems.map((item, index) => {
              const isUpcoming = item.status === 'Upcoming';
              const isPaid = item.status === 'Paid';

              return (
                <tr
                  key={item.monthKey}
                  className={`hover:bg-[#FFF8EC]/50 transition-colors ${
                    isUpcoming ? 'bg-[#FFF2E8]/30 font-medium' : ''
                  }`}
                >
                  {/* Month */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-[#172033]">{item.fullName}</div>
                    <div className="text-[11px] text-[#667085] mt-0.5">{item.paidDate}</div>
                  </td>

                  {/* Income */}
                  <td className="py-4 px-5">
                    {item.actualIncome > 0 ? (
                      <span className="font-semibold text-[#172033]">
                        ₹{item.actualIncome.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-[#667085] font-mono">
                        ~₹{item.baselineIncome.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-[#667085]">(proj)</span>
                      </span>
                    )}
                  </td>

                  {/* Expected Premium */}
                  <td className="py-4 px-5 text-[#667085] font-medium">
                    ₹{item.expectedPremium}
                  </td>

                  {/* Actual Premium */}
                  <td className="py-4 px-5">
                    {item.actualPremium > 0 ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-[#172033]">
                          ₹{item.actualPremium}
                        </span>
                        {item.actualPremium !== item.expectedPremium && (
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                              item.actualPremium < item.expectedPremium
                                ? 'bg-[#FFF2E8] text-[#FF711F]'
                                : 'bg-[#EEF4FF] text-[#214B9D]'
                            }`}
                          >
                            {item.actualPremium < item.expectedPremium ? 'Saved' : 'Surge'}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-[#667085] italic">TBD at cycle end</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    {isPaid ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Paid
                      </span>
                    ) : isUpcoming ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF2E8] text-[#FF711F] border border-[#ffcfb0]">
                        <Clock className="w-3 h-3 mr-1" />
                        Upcoming
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0F6FE] text-[#214B9D] border border-[#d4e2fc]">
                        Scheduled
                      </span>
                    )}
                  </td>

                  {/* Receipt */}
                  <td className="py-4 px-5 text-right">
                    {isPaid ? (
                      <button
                        onClick={() => handleDownloadReceipt(item.fullName)}
                        className="p-1.5 rounded text-[#214B9D] hover:bg-[#EEF4FF] transition-colors"
                        title="Download Tax Receipt"
                      >
                        <FileCheck className="w-4 h-4 text-[#214B9D]" />
                      </button>
                    ) : (
                      <span className="text-[#667085] text-[11px]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Responsive Mobile Cards for Phone screens */}
      <div className="block md:hidden space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.monthKey}
            className={`bg-white border border-[#E7E1D7] rounded-xl p-4 shadow-subtle ${
              item.status === 'Upcoming' ? 'border-[#FF711F] bg-[#FFF2E8]/20' : ''
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E7E1D7] pb-2 mb-2.5">
              <div>
                <h4 className="font-bold text-sm text-[#172033]">{item.fullName}</h4>
                <span className="text-[10px] text-[#667085]">{item.paidDate}</span>
              </div>
              <div>
                {item.status === 'Paid' ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
                    Paid
                  </span>
                ) : item.status === 'Upcoming' ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF2E8] text-[#FF711F] border border-[#ffcfb0]">
                    Upcoming
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#F0F6FE] text-[#214B9D] border border-[#d4e2fc]">
                    Scheduled
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[#667085] text-[10px] block">Income</span>
                <span className="font-semibold text-[#172033]">
                  {item.actualIncome > 0
                    ? `₹${item.actualIncome.toLocaleString('en-IN')}`
                    : `~₹${item.baselineIncome.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div>
                <span className="text-[#667085] text-[10px] block">Expected</span>
                <span className="text-[#667085] font-medium">₹{item.expectedPremium}</span>
              </div>
              <div>
                <span className="text-[#667085] text-[10px] block">Actual</span>
                <span className="font-bold text-[#FF711F]">
                  {item.actualPremium > 0 ? `₹${item.actualPremium}` : 'TBD'}
                </span>
              </div>
            </div>

            {item.status === 'Paid' && (
              <div className="mt-3 pt-2 border-t border-[#E7E1D7] flex justify-end">
                <button
                  onClick={() => handleDownloadReceipt(item.fullName)}
                  className="text-xs text-[#214B9D] font-semibold hover:underline flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF711F]" />
                  <span>Download Receipt</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
