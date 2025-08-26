
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FreeAuditPage from './pages/FreeAuditPage';
import EthosPage from './pages/EthosPage';
import SolutionsPage from './pages/SolutionsPage';
import ArticlesPage from './pages/ArticlesPage';
import ScrollToTop from './components/ScrollToTop';
import QuoteAndApplyPage from './pages/QuoteAndApplyPage';
import FounderProfilePage from './pages/FounderProfilePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import PartnersPage from './pages/PartnersPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ThankYouPage from './pages/ThankYouPage';
import FaqPage from './pages/FaqPage';
import NotFoundPage from './pages/NotFoundPage';
import HobokenProfessionals from "./pages/HobokenProfessionals";
import PrincetonFamilies from "./pages/PrincetonFamilies";
import MiddlesexCountyProfessionals from "./pages/MiddlesexCountyProfessionals";


function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="free-audit" element={<FreeAuditPage />} />
          <Route path="quote-and-apply" element={<QuoteAndApplyPage />} />
          <Route path="hoboken-professionals" element={<HobokenProfessionals />} />
          <Route path="princeton-families" element={<PrincetonFamilies />} />
          <Route path="middlesex-county-professionals" element={<MiddlesexCountyProfessionals />} />
          <Route path="ethos" element={<EthosPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:articleSlug" element={<ArticleDetailPage />} />
          <Route path="founder-profile" element={<FounderProfilePage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="faqs" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;