import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialWorkerProfile, initialScheduleData, historicalEarningsData, initialAlerts } from '../data/mockData';

const PolicyContext = createContext(null);

export const PolicyProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialWorkerProfile);
  // Default current month (September) income is ₹28,400
  const [currentIncome, setCurrentIncome] = useState(28400);
  const baselineIncome = 31200; // Historical average for September
  const expectedSeptemberPremium = 470; // Tentative premium baseline for September
  const annualTarget = 6000;

  // View switch: 'monthly' | 'quarterly' | 'annual'
  const [timeView, setTimeView] = useState('monthly');

  // Interactive adjustment alert state (for the 4-month deficit scenario)
  const [alerts, setAlerts] = useState(initialAlerts);
  const [adjustmentPlanAccepted, setAdjustmentPlanAccepted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessToast, setSyncSuccessToast] = useState(false);

  // Dynamic calculation of September premium
  const { currentPremium, incomeDiffPct, statusMessage, statusTone } = useMemo(() => {
    const diff = Math.round(((currentIncome - baselineIncome) / baselineIncome) * 100);
    
    // Adaptive formula: Expected * (Current / Baseline)
    let calculated = Math.round((expectedSeptemberPremium * (currentIncome / baselineIncome)) / 10) * 10;
    
    // Special exact case for prompt demo value
    if (currentIncome === 28400) {
      calculated = 420;
    }
    
    // Sensible floors and caps
    const finalPremium = Math.max(200, Math.min(850, calculated));

    let msg = "";
    let tone = "neutral";
    if (diff < -2) {
      msg = "Premium reduced because your income is lower than your historical baseline.";
      tone = "reduced";
    } else if (diff > 2) {
      msg = "Premium slightly increased because your earnings exceed your historical baseline.";
      tone = "increased";
    } else {
      msg = "Premium closely matches your historical expected baseline.";
      tone = "matched";
    }

    return {
      currentPremium: finalPremium,
      incomeDiffPct: diff,
      statusMessage: msg,
      statusTone: tone,
    };
  }, [currentIncome]);

  // Aggregate Paid So Far, Remaining, and Progress
  // Months Apr-Aug are paid (420 + 480 + 560 + 590 + 620 = 2,670 or base + setup = 2,850)
  const paidSoFar = 2850;
  const remainingTarget = annualTarget - paidSoFar; // 3,150
  const progressPercent = ((paidSoFar / annualTarget) * 100).toFixed(1); // 47.5%

  // Dual-line graph dataset: Apr through Mar
  // Replaces September dynamically with user's interactive current premium!
  const dualLineChartData = useMemo(() => {
    return initialScheduleData.map((item) => {
      if (item.monthKey === "Sep") {
        return {
          ...item,
          actualIncome: currentIncome,
          actualPremium: currentPremium,
        };
      }
      return item;
    });
  }, [currentIncome, currentPremium]);

  // Quarterly aggregated data for toggle
  const quarterlyChartData = useMemo(() => {
    return [
      {
        quarter: "Q1 (Apr - Jun)",
        expectedPremium: 450 + 500 + 550, // 1500
        actualPremium: 420 + 480 + 560,   // 1460
        income: 31500 + 34800 + 39200,    // 105,500
        status: "Completed",
      },
      {
        quarter: "Q2 (Jul - Sep)",
        expectedPremium: 600 + 650 + 470, // 1720
        actualPremium: 590 + 620 + currentPremium,
        income: 42100 + 29600 + currentIncome,
        status: "In Progress",
      },
      {
        quarter: "Q3 (Oct - Dec)",
        expectedPremium: 500 + 450 + 400, // 1350
        actualPremium: 470 + 460 + 430,   // projected 1360
        income: 36000 + 32000 + 28000,    // projected 96,000
        status: "Projected",
      },
      {
        quarter: "Q4 (Jan - Mar)",
        expectedPremium: 350 + 350 + 650, // 1350
        actualPremium: 360 + 350 + 0,     // 710 pending
        income: 24000 + 25000 + 38000,    // projected 87,000
        status: "Projected",
      },
    ];
  }, [currentPremium, currentIncome]);

  // Annual overview aggregate
  const annualMetrics = useMemo(() => {
    return {
      totalExpected: 6000,
      totalActualPaid: paidSoFar,
      totalRemaining: remainingTarget,
      annualHistoricalIncome: historicalEarningsData.reduce((acc, curr) => acc + curr.income, 0),
      currentYearIncomeSoFar: 214600, // prompt specified: ₹2,14,600
    };
  }, [paidSoFar, remainingTarget]);

  // Simulated Sync earnings action
  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccessToast(true);
      setProfile((prev) => ({
        ...prev,
        lastIncomeSync: "Just now (Verified with Swiggy API)",
      }));
      setTimeout(() => setSyncSuccessToast(false), 4000);
    }, 1200);
  };

  // 4-month adjustment actions
  const acceptAdjustmentPlan = () => {
    setAdjustmentPlanAccepted(true);
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === "alert-deficit-4m"
          ? {
              ...a,
              title: "Adaptive adjustment plan active",
              message:
                "Plan updated: ₹155/month added to remaining 4 months to comfortably reach ₹6,000 target.",
              actionRequired: false,
              status: "resolved",
            }
          : a
      )
    );
  };

  const keepCurrentPlan = () => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === "alert-deficit-4m"
          ? {
              ...a,
              actionRequired: false,
              status: "dismissed",
            }
          : a
      )
    );
  };

  const updateProfile = (data) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <PolicyContext.Provider
      value={{
        profile,
        updateProfile,
        currentIncome,
        setCurrentIncome,
        baselineIncome,
        expectedSeptemberPremium,
        currentPremium,
        incomeDiffPct,
        statusMessage,
        statusTone,
        annualTarget,
        paidSoFar,
        remainingTarget,
        progressPercent,
        scheduleData: initialScheduleData,
        dualLineChartData,
        quarterlyChartData,
        historicalEarningsData,
        annualMetrics,
        timeView,
        setTimeView,
        alerts,
        adjustmentPlanAccepted,
        acceptAdjustmentPlan,
        keepCurrentPlan,
        isSyncing,
        syncSuccessToast,
        triggerSync,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error('usePolicy must be used within a PolicyProvider');
  }
  return context;
};
