import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PolicyProvider } from './context/PolicyContext';
import { AppLayout } from './components/layout/AppLayout';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PolicyPage } from './pages/PolicyPage';
import { HistoryPage } from './pages/HistoryPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <PolicyProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Onboarding Route */}
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Main App Layout Shell */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </PolicyProvider>
  );
}

export default App;
