



import React from 'react';
// FIX: Changed to namespace import to fix module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';
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
        <ReactRouterDOM.HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <ReactRouterDOM.Routes>
                <ReactRouterDOM.Route path="/" element={<HomePage />} />
                <ReactRouterDOM.Route path="/wod" element={<WodPage />} />
                <ReactRouterDOM.Route path="/schedule" element={<SchedulePage />} />
                <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
                <ReactRouterDOM.Route path="/what-is-crossfit" element={<WhatIsCrossfitPage />} />
                <ReactRouterDOM.Route path="/coaches" element={<CoachesPage />} />
                <ReactRouterDOM.Route path="/library" element={<ExerciseLibraryPage />} />
                <ReactRouterDOM.Route path="/classes" element={<ClassesPage />} />
                <ReactRouterDOM.Route path="/membership" element={<MembershipPage />} />
                <ReactRouterDOM.Route path="/shop" element={<ShopPage />} />
                <ReactRouterDOM.Route path="/contact" element={<ContactPage />} />
                <ReactRouterDOM.Route path="/members" element={<MembersPage />} />
                <ReactRouterDOM.Route path="/referral" element={<ReferralPage />} />
                <ReactRouterDOM.Route path="/faq" element={<FaqPage />} />
                <ReactRouterDOM.Route path="/rent-club" element={<RentClubPage />} />
              </ReactRouterDOM.Routes>
            </main>
            <Footer />
          </div>
        </ReactRouterDOM.HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;