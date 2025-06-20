import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import PastYearPage from './pages/PastYearPage';
import FutureYearPage from './pages/FutureYearPage';

const AppContent: React.FC = () => {
  const { state } = useApp();

  // If user is not logged in, show login page
  if (!state.user) {
    return <LoginPage />;
  }

  // Show page based on current page state
  switch (state.currentPage) {
    case 'welcome':
      return <WelcomePage />;
    case 'past-year':
      return <PastYearPage />;
    case 'future-year':
      return <FutureYearPage />;
    default:
      return <WelcomePage />;
  }
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;