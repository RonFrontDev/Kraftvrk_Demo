
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

function App(): React.ReactNode {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/wod" element={<WodPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/contact" element={<ContactPage />} />
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