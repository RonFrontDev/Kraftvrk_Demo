
import React from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WodPage from './pages/WodPage';
import SchedulePage from './pages/SchedulePage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import MembershipPage from './pages/MembershipPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from './contexts/ThemeContext';
import CoachesPage from './pages/CoachesPage';
import ScrollToTop from './components/ScrollToTop';
import ExerciseLibraryPage from './pages/ExerciseLibraryPage';
import ClassesPage from './pages/ClassesPage';
import MembersPage from './pages/MembersPage';
import ReferralPage from './pages/ReferralPage';
import WhatIsCrossfitPage from './pages/WhatIsCrossfitPage';
import FaqPage from './pages/FaqPage';
// FIX: Corrected import for RentClubPage, which now has a default export.
import RentClubPage from './pages/RentClubPage';

// FIX: Removed explicit JSX.Element return type to fix JSX namespace error.
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wod" element={<WodPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/what-is-crossfit" element={<WhatIsCrossfitPage />} />
                <Route path="/coaches" element={<CoachesPage />} />
                <Route path="/library" element={<ExerciseLibraryPage />} />
                <Route path="/classes" element={<ClassesPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/referral" element={<ReferralPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/rent-club" element={<RentClubPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
