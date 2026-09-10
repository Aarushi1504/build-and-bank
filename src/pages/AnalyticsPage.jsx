import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line,
  Area,
} from 'recharts';
import {
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { usePolicy } from '../context/PolicyContext';

// Custom Tooltip for Income Pattern
const IncomePatternTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-[#E7E1D7] rounded-lg shadow-card text-xs">
        <p className="font-bold text-[#172033] border-b border-[#E7E1D7] pb-1 mb-1.5">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between space-x-3">
            <span className="text-[#667085]">Monthly Income:</span>
            <span className="font-bold text-[#214B9D]">₹{data.income.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between space-x-3 text-[11px] text-[#667085]">
            <span>Deliveries Completed:</span>
            <span className="font-mono text-[#172033]">{data.deliveries} orders</span>
          </div>
          <div className="flex justify-between space-x-3 text-[11px] text-[#667085]">
            <span>Active Hours:</span>
            <span className="font-mono text-[#172033]">{data.hours} hrs</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Income vs Premium
const IncomeVsPremiumTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-[#E7E1D7] rounded-lg shadow-card text-xs">
        <p className="font-bold text-[#172033] border-b border-[#E7E1D7] pb-1 mb-1.5">
          {data.fullName || label}
        </p>
        <div className="space-y-1">
          <div className="flex justify-between space-x-3">
            <span className="text-[#667085]">Income:</span>
            <span className="font-bold text-[#214B9D]">
              ₹{(data.actualIncome || data.baselineIncome).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between space-x-3">
            <span className="text-[#667085]">Premium:</span>
            <span className="font-bold text-[#FF711F]">
              ₹{data.actualPremium || data.expectedPremium}
            </span>
          </div>
          <div className="pt-1 border-t border-[#E7E1D7] text-[10px] text-[#667085]">
            Ratio: ~
            {(
              ((data.actualPremium || data.expectedPremium) /
                (data.actualIncome || data.baselineIncome)) *
              100
            ).toFixed(2)}
            % of monthly earnings
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const AnalyticsPage = () => {
  const {
    currentIncome,
    baselineIncome,
    incomeDiffPct,
    annualMetrics,
    historicalEarningsData,
    dualLineChartData,
  } = usePolicy();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#214B9D] tracking-tight">
          Income & premium analytics
        </h1>
        <p className="text-sm text-[#667085] mt-0.5">
          Understanding the proportional relationship between your gig payouts and insurance contributions.
        </p>
      </div>

      {/* TOP SECTION: 4 KEY METRICS */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x md:divide-[#E7E1D7]">
          {/* Current Monthly Income */}
          <div className="md:pr-4">
            <span className="text-xs font-medium text-[#667085] block">
              Current monthly income
            </span>
            <div className="mt-1">
              <span className="text-2xl font-bold text-[#172033]">
                ₹{currentIncome.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">September earnings</span>
          </div>

          {/* Historical Average */}
          <div className="md:px-4">
            <span className="text-xs font-medium text-[#667085] block">
              Historical average
            </span>
            <div className="mt-1">
              <span className="text-2xl font-bold text-[#172033]">
                ₹{baselineIncome.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">Past 12-month September avg</span>
          </div>

          {/* Income Variation */}
          <div className="md:px-4">
            <span className="text-xs font-medium text-[#667085] block">
              Income variation
            </span>
            <div className="mt-1 flex items-center space-x-1">
              <span
                className={`text-2xl font-bold ${
                  incomeDiffPct < 0
                    ? 'text-[#FF711F]'
                    : incomeDiffPct > 0
                    ? 'text-[#2E8B67]'
                    : 'text-[#172033]'
                }`}
              >
                {incomeDiffPct > 0 ? `+${incomeDiffPct}%` : `${incomeDiffPct}%`}
              </span>
              {incomeDiffPct < 0 ? (
                <ArrowDownRight className="w-5 h-5 text-[#FF711F]" />
              ) : incomeDiffPct > 0 ? (
                <ArrowUpRight className="w-5 h-5 text-[#2E8B67]" />
              ) : null}
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">vs September baseline</span>
          </div>

          {/* Annual Income So Far */}
          <div className="md:pl-4">
            <span className="text-xs font-medium text-[#667085] block">
              Annual income so far
            </span>
            <div className="mt-1">
              <span className="text-2xl font-bold text-[#214B9D]">
                ₹{annualMetrics.currentYearIncomeSoFar.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] text-[#2E8B67] font-medium mt-1 block">
              6 months cumulative gross
            </span>
          </div>
        </div>
      </section>

      {/* TWO MAJOR VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GRAPH 1: Monthly Income Pattern */}
        <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E7E1D7]">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#214B9D]">Monthly income pattern</h3>
                <span className="text-[11px] font-semibold text-[#667085] bg-[#FFF8EC] px-2 py-0.5 rounded border border-[#E7E1D7]">
                  12 Months History
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Past 12 months of delivery earnings showing peak monsoon surges and post-festival lulls.
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historicalEarningsData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE4" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#667085', fontSize: 10 }}
                    axisLine={{ stroke: '#E7E1D7' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 48000]}
                    tick={{ fill: '#667085', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <Tooltip content={<IncomePatternTooltip />} />
                  <Bar
                    dataKey="income"
                    name="Monthly Payout"
                    fill="#629BEA"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E7E1D7] text-xs text-[#667085] flex items-center justify-between">
            <span>Average: ₹31,650 / month</span>
            <span className="font-semibold text-[#214B9D]">Peak: July (₹42,000)</span>
          </div>
        </section>

        {/* GRAPH 2: Income vs Premium */}
        <section className="bg-white border border-[#E7E1D7] rounded-xl p-5 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E7E1D7]">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#214B9D]">Income vs Premium</h3>
                <span className="text-[11px] font-semibold text-[#FF711F] bg-[#FFF2E8] px-2 py-0.5 rounded border border-[#ffcfb0]">
                  Proportional Scale
                </span>
              </div>
              <p className="text-xs text-[#667085] mt-0.5">
                Demonstrating that monthly contributions automatically rise in flush months and fall in lean months.
              </p>
            </div>

            <div className="h-64 sm:h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={dualLineChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE4" vertical={false} />
                  <XAxis
                    dataKey="monthKey"
                    tick={{ fill: '#667085', fontSize: 10 }}
                    axisLine={{ stroke: '#E7E1D7' }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="income"
                    orientation="left"
                    domain={[0, 48000]}
                    tick={{ fill: '#667085', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val / 1000}k`}
                  />
                  <YAxis
                    yAxisId="premium"
                    orientation="right"
                    domain={[0, 800]}
                    tick={{ fill: '#FF711F', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip content={<IncomeVsPremiumTooltip />} />
                  <Area
                    yAxisId="income"
                    type="monotone"
                    dataKey="baselineIncome"
                    name="Baseline Income"
                    fill="#F0F6FE"
                    stroke="#629BEA"
                    strokeWidth={1.5}
                  />
                  <Line
                    yAxisId="premium"
                    type="monotone"
                    dataKey="actualPremium"
                    name="Actual Premium"
                    stroke="#FF711F"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#FF711F' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#E7E1D7] flex items-center justify-between text-xs">
            <span className="text-[#667085]">
              Higher earnings <span className="text-[#214B9D] font-bold">→</span> higher contribution
            </span>
            <span className="text-[#667085]">
              Lower earnings <span className="text-[#FF711F] font-bold">→</span> lower contribution
            </span>
          </div>
        </section>
      </div>

      {/* EXPLANATORY PANEL: HOW YOUR PREMIUM IS CALCULATED */}
      <section className="bg-white border border-[#E7E1D7] rounded-xl p-6 shadow-subtle">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF711F]"></div>
            <h3 className="text-base font-bold text-[#214B9D]">
              How your premium is calculated
            </h3>
          </div>
          <p className="text-xs text-[#667085] mt-1">
            A transparent 4-step framework designed to protect your livelihood without burdening your monthly cashflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {/* Step 1 */}
            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] relative">
              <span className="text-xs font-bold text-[#FF711F] font-mono">STEP 01</span>
              <h4 className="text-sm font-bold text-[#172033] mt-1">
                Historical Baseline
              </h4>
              <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                Your past 12 months of gig earnings establish an expected seasonal baseline for each calendar month.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] relative">
              <span className="text-xs font-bold text-[#214B9D] font-mono">STEP 02</span>
              <h4 className="text-sm font-bold text-[#172033] mt-1">
                Current Comparison
              </h4>
              <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                At the end of each month, your actual payout is compared with the seasonal baseline for that period.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] relative">
              <span className="text-xs font-bold text-[#FF711F] font-mono">STEP 03</span>
              <h4 className="text-sm font-bold text-[#172033] mt-1">
                Proportional Shift
              </h4>
              <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                Your premium adjusts proportionally — lower when your income drops, slightly higher when you earn more.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-lg bg-[#FFF8EC] border border-[#E7E1D7] relative">
              <span className="text-xs font-bold text-[#2E8B67] font-mono">STEP 04</span>
              <h4 className="text-sm font-bold text-[#172033] mt-1">
                Annual Target Track
              </h4>
              <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                The platform monitors your ₹6,000 target. If any gap arises near cycle end, it suggests gentle rebalancing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
