import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import {
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';
import { Link } from 'react-router-dom';

// Custom Tooltip for the Dual-Line Graph
const CustomDualLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-[#E7E1D7] rounded-lg shadow-card text-xs">
        <p className="font-bold text-[#172033] border-b border-[#E7E1D7] pb-1.5 mb-1.5">
          {data.fullName || label}
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <span className="text-[#629BEA] font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#629BEA] mr-1.5"></span>
              Expected Premium:
            </span>
            <span className="font-semibold text-[#172033]">₹{data.expectedPremium}</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-[#FF711F] font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF711F] mr-1.5"></span>
              Actual Charged:
            </span>
            <span className="font-bold text-[#172033]">
              {data.actualPremium > 0 ? `₹${data.actualPremium}` : 'Pending / Cycle end'}
            </span>
          </div>
          {data.actualIncome > 0 && (
            <div className="flex items-center justify-between space-x-4 pt-1 border-t border-[#E7E1D7]/70 text-[11px] text-[#667085]">
              <span>Monthly Income:</span>
              <span className="font-mono text-[#172033]">₹{data.actualIncome.toLocaleString('en-IN')}</span>
            </div>
          )}
          {data.status && (
            <div className="pt-0.5 text-[10px] text-[#667085] flex items-center justify-between">
              <span>Status:</span>
              <span className={`font-semibold ${data.status === 'Paid' ? 'text-[#2E8B67]' : 'text-[#214B9D]'}`}>
                {data.status}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const DashboardPage = () => {
  const {
    profile,
    annualTarget,
    paidSoFar,
    remainingTarget,
    progressPercent,
    currentIncome,
    setCurrentIncome,
    baselineIncome,
    expectedSeptemberPremium,
    currentPremium,
    incomeDiffPct,
    statusMessage,
    statusTone,
    dualLineChartData,
    quarterlyChartData,
    timeView,
    setTimeView,
  } = usePolicy();

  const presets = [20000, 25000, 28400, 31200, 35000, 40000];

  return (
    <div className="space-y-6">
      {/* Page Heading & Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
            Your policy at a glance
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Your premium adapts to your earnings while keeping your annual target on track.
          </p>
        </div>

        {/* View Switch: Monthly / Quarterly / Annual */}
        <div className="inline-flex bg-white p-1 rounded-lg border border-[#E7E1D7] shadow-xs text-xs self-start sm:self-auto">
          <button
            onClick={() => setTimeView('monthly')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeView === 'monthly'
                ? 'bg-[#214B9D] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeView('quarterly')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeView === 'quarterly'
                ? 'bg-[#214B9D] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setTimeView('annual')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              timeView === 'annual'
                ? 'bg-[#214B9D] text-white shadow-xs'
                : 'text-[#667085] hover:text-[#172033]'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      {/* BELIEVABLE INTERACTION: Live Income Simulator Bar */}
      <div className="bg-white border border-[#E7E1D7] rounded-xl p-4 sm:p-5 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2E8] border border-[#ffcfb0] flex items-center justify-center text-[#FF711F]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                  Interactive Demo Simulator
                </span>
                <span className="text-[10px] bg-[#EEF4FF] text-[#214B9D] px-2 py-0.5 rounded font-semibold border border-[#d6e4ff]">
                  Try different monthly earnings
                </span>
              </div>
              <p className="text-xs text-[#667085]">
                Adjust September earnings to see the premium and charts recompute in real time:
              </p>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center flex-wrap gap-1.5">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => setCurrentIncome(amt)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  currentIncome === amt
                    ? 'bg-[#FF711F] text-white shadow-xs scale-105'
                    : 'bg-[#FFF8EC] text-[#172033] hover:bg-[#ffedd5] border border-[#E7E1D7]'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
                {amt === 28400 && <span className="ml-1 text-[10px] opacity-90">(Current)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider for custom adjustment */}
        <div className="mt-3.5 pt-3 border-t border-[#E7E1D7] flex items-center space-x-4 text-xs">
          <span className="text-[#667085] font-medium whitespace-nowrap">Fine tune: ₹15,000</span>
          <input
            type="range"
            min="15000"
            max="45000"
            step="500"
            value={currentIncome}
            onChange={(e) => setCurrentIncome(Number(e.target.value))}
            className="w-full accent-[#FF711F] cursor-pointer"
          />
          <span className="text-[#667085] font-medium whitespace-nowrap">₹45,000</span>
          <span className="font-mono font-bold text-[#214B9D] px-2.5 py-1 rounded bg-[#EEF4FF] border border-[#d4e2fc]">
            ₹{currentIncome.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* SECTION A — ANNUAL POLICY SUMMARY */}
      {/* Clean single horizontal summary section showing target, paid, remaining, status */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x md:divide-[#E7E1D7]">
          {/* Annual Target */}
          <div className="md:pr-4">
            <span className="text-xs font-medium text-[#667085] block">Annual Premium Target</span>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold text-[#172033]">
                ₹{annualTarget.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#667085]">/ year</span>
            </div>
            <span className="text-[11px] text-[#214B9D] font-medium mt-1 block">
              Fixed target (₹5,00,000 cover)
            </span>
          </div>

          {/* Paid So Far */}
          <div className="md:px-4">
            <span className="text-xs font-medium text-[#667085] block">Paid So Far</span>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold text-[#2E8B67]">
                ₹{paidSoFar.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#2E8B67] font-semibold">({progressPercent}%)</span>
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">5 monthly cycles settled</span>
          </div>

          {/* Remaining */}
          <div className="md:px-4">
            <span className="text-xs font-medium text-[#667085] block">Remaining</span>
            <div className="mt-1 flex items-baseline space-x-1.5">
              <span className="text-2xl font-bold text-[#172033]">
                ₹{remainingTarget.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#667085]">to complete</span>
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">7 cycles remaining</span>
          </div>

          {/* Policy Status */}
          <div className="md:pl-4">
            <span className="text-xs font-medium text-[#667085] block">Policy Status</span>
            <div className="mt-1 flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#EBF7F1] text-[#2E8B67] border border-[#d2edd9]">
                <CheckCircle className="w-3.5 h-3.5 mr-1 text-[#2E8B67]" />
                On Track
              </span>
            </div>
            <span className="text-[11px] text-[#667085] mt-1.5 block">
              Continuous active coverage
            </span>
          </div>
        </div>
      </section>

      {/* SECTION B — PREMIUM PROGRESS */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <h2 className="text-base font-bold text-[#214B9D]">Annual premium progress</h2>
          <div className="text-sm font-semibold text-[#172033]">
            <span className="text-[#FF711F]">₹{paidSoFar.toLocaleString('en-IN')}</span> paid of{' '}
            <span>₹{annualTarget.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Clean horizontal progress bar */}
        <div className="w-full bg-[#FFF8EC] border border-[#E7E1D7] h-3.5 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#214B9D] via-[#214B9D] to-[#FF711F] rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Reassurance text */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#667085] gap-1">
          <span className="font-semibold text-[#172033]">
            {progressPercent}% of your annual target completed
          </span>
          <span className="text-[#2E8B67] font-medium flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1 inline" />
            Based on your current earnings pattern, you are on track.
          </span>
        </div>
      </section>

      {/* SECTION C & D GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION C — DUAL-LINE GRAPH (2 COLUMNS ON DESKTOP) */}
        <section className="lg:col-span-2 bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E7E1D7] gap-2">
              <div>
                <h3 className="text-base font-bold text-[#214B9D]">
                  Expected vs Actual Premium
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Expected represents historical tentative baseline. Actual represents what was adjusted and charged.
                </p>
              </div>

              {/* Legend Strip */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-[#629BEA] rounded"></span>
                  <span className="text-[#667085] font-medium">Expected Premium</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-[#FF711F] rounded"></span>
                  <span className="text-[#172033] font-bold">Actual Premium</span>
                </div>
              </div>
            </div>

            {/* Recharts Dual-Line Chart */}
            <div className="h-72 sm:h-80 w-full mt-4">
              {timeView === 'monthly' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dualLineChartData}
                    margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE4" vertical={false} />
                    <XAxis
                      dataKey="monthKey"
                      tick={{ fill: '#667085', fontSize: 11 }}
                      axisLine={{ stroke: '#E7E1D7' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 750]}
                      tick={{ fill: '#667085', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip content={<CustomDualLineTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="expectedPremium"
                      name="Expected Premium"
                      stroke="#629BEA"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#629BEA', strokeWidth: 1 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="actualPremium"
                      name="Actual Premium"
                      stroke="#FF711F"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#FF711F', strokeWidth: 1 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : timeView === 'quarterly' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={quarterlyChartData}
                    margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE4" vertical={false} />
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: '#667085', fontSize: 11 }}
                      axisLine={{ stroke: '#E7E1D7' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#667085', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip />
                    <Bar dataKey="expectedPremium" name="Expected Target" fill="#629BEA" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualPremium" name="Actual / Adjusted" fill="#FF711F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                /* Annual View */
                <div className="h-full flex flex-col justify-center items-center text-center p-6 bg-[#FFF8EC]/60 rounded-lg border border-[#E7E1D7]">
                  <h4 className="font-bold text-[#214B9D] text-lg">Annual Policy Cycle (2026 - 2027)</h4>
                  <p className="text-xs text-[#667085] mt-1 max-w-md">
                    Total annual premium target is fixed at ₹6,000. Through adaptive monthly adjustments, you pay more during high seasons (summer & festivals) and less during quiet months.
                  </p>
                  <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-5">
                    <div className="p-2.5 bg-white rounded-lg border border-[#E7E1D7]">
                      <span className="text-[10px] text-[#667085] block">Target</span>
                      <span className="font-bold text-sm text-[#172033]">₹6,000</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E7E1D7]">
                      <span className="text-[10px] text-[#667085] block">Paid (5 mos)</span>
                      <span className="font-bold text-sm text-[#2E8B67]">₹{paidSoFar}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#E7E1D7]">
                      <span className="text-[10px] text-[#667085] block">Remaining</span>
                      <span className="font-bold text-sm text-[#172033]">₹{remainingTarget}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E7E1D7] flex items-center justify-between text-xs text-[#667085]">
            <span>* Hover over points to view exact earnings & premium breakdowns.</span>
            <Link to="/analytics" className="text-[#214B9D] font-semibold hover:underline">
              View detailed analytics →
            </Link>
          </div>
        </section>

        {/* SECTION D — CURRENT MONTH */}
        <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D7]">
              <div>
                <span className="text-[11px] font-bold text-[#FF711F] uppercase tracking-wider">
                  Upcoming Contribution
                </span>
                <h3 className="text-base font-bold text-[#214B9D]">This month</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#FFF8EC] text-xs font-semibold text-[#172033] border border-[#E7E1D7]">
                September 2026
              </span>
            </div>

            {/* Income Comparison */}
            <div className="mt-4 space-y-3.5">
              <div className="p-3 rounded-lg bg-[#FFF8EC]/70 border border-[#E7E1D7]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Current income:</span>
                  <span className="font-bold text-[#172033] text-sm">
                    ₹{currentIncome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1.5">
                  <span className="text-[#667085]">Historical average (Sep):</span>
                  <span className="font-mono text-[#667085]">
                    ₹{baselineIncome.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-[#E7E1D7]/70">
                  <span className="font-medium text-[#172033]">Income difference:</span>
                  <span
                    className={`inline-flex items-center font-bold ${
                      incomeDiffPct < 0
                        ? 'text-[#FF711F]'
                        : incomeDiffPct > 0
                        ? 'text-[#2E8B67]'
                        : 'text-[#667085]'
                    }`}
                  >
                    {incomeDiffPct < 0 ? (
                      <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : incomeDiffPct > 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    ) : null}
                    {incomeDiffPct > 0 ? `+${incomeDiffPct}%` : `${incomeDiffPct}%`}
                  </span>
                </div>
              </div>

              {/* Premium Calculation Comparison */}
              <div className="p-3.5 rounded-lg border border-[#E7E1D7] bg-white">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#667085] block">Current monthly premium:</span>
                    <span className="text-2xl font-bold text-[#214B9D]">₹{currentPremium}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#667085] block">Expected premium:</span>
                    <span className="text-sm font-semibold text-[#667085] line-through">
                      ₹{expectedSeptemberPremium}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 text-xs text-[#667085]">
                  <span>Due Date: </span>
                  <span className="font-semibold text-[#172033]">30 Sep 2026 (Auto-debit)</span>
                </div>
              </div>

              {/* Status Rationale Box */}
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  statusTone === 'reduced'
                    ? 'bg-[#FFF2E8] border-[#ffcfb0] text-[#172033]'
                    : statusTone === 'increased'
                    ? 'bg-[#EEF4FF] border-[#c8ddff] text-[#172033]'
                    : 'bg-[#FFF8EC] border-[#E7E1D7] text-[#172033]'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-[#FF711F] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[11px] text-[#214B9D]">Status:</span>
                    <p className="mt-0.5 font-medium">{statusMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E7E1D7]">
            <Link
              to="/policy"
              className="w-full flex items-center justify-center py-2.5 px-3 rounded-lg bg-[#214B9D] hover:bg-[#183b7f] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>View Policy Coverage Details</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Quick Access to Alerts Notification Bar if pending */}
      <div className="bg-[#FFF2E8] border border-[#ffcfb0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-[#FF711F] animate-pulse"></div>
          <div>
            <h4 className="text-xs font-bold text-[#172033]">
              Smart Deficit Rebalancing Available
            </h4>
            <p className="text-xs text-[#667085]">
              With 4 months remaining in the cycle, smooth your contributions with small adjustments.
            </p>
          </div>
        </div>
        <Link
          to="/alerts"
          className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#FF711F] hover:bg-[#e86214] text-white text-xs font-semibold shadow-xs whitespace-nowrap self-start sm:self-auto"
        >
          Review Smart Adjustment
        </Link>
      </div>
    </div>
  );
};
