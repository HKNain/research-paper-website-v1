import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your page components
import IndexPage from './pages/index.jsx';
import AimPage from './pages/aim.jsx';
import AuthorGuidelinesPage from './pages/author-guidelines.jsx';
import ContactPage from './pages/contact.jsx';
import CorrectionPage from './pages/correction-policy.jsx';
import EditorialPage from './pages/editorial.jsx';
import Ethics from './pages/ethics.jsx';
import Login from './pages/login.jsx';
import NotFound from './pages/notfound.jsx';
import PlagiarismPolicy from './pages/plagiarism-policy.jsx';
import Profile from './pages/profile.jsx';
import ResearchAreas from './pages/research-areas.jsx';
import ReviewerGuidelines from './pages/reviewerGuidelines.jsx'
import ReviewProcess from './pages/reviewProcess.jsx';
import Signup from './pages/signup.jsx';
import SubmitPaper from './pages/submit.jsx';

// Import Header component
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import ScrollToTop from './components/scrollToTop.jsx';

// Import CSS files
import './styles/style.css';
import './styles/responsive.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/aim.css';
import './styles/author-guidelines.css';
import './styles/contact.css';
import './styles/editorial.css';
import './styles/ethics.css';
import './styles/login.css';
import './styles/notFound.css';
import './styles/profile.css'
import './styles/reviewerGuidelines.css';
import './styles/reviewProcess.css';
import './styles/signup.css';
import './styles/submit.css';

// import './styles/profileAuthor.css';

function AppContent() {
  const location = useLocation();

    // Pages where footer should NOT show
    const noFooterRoutes = ['/login', '/submit', '/signup'];
    // Check if current path is in noFooterRoutes
    const showFooter = !noFooterRoutes.includes(location.pathname);
  return (
      <div className="App" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Header />
        <ScrollToTop />
        <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
        />
        <main>
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/home" element={<IndexPage />} />
            <Route path="/aim" element={<AimPage />} />
            <Route path="/author-guidelines" element={<AuthorGuidelinesPage />} />
            <Route path="/editorial" element={<EditorialPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/correction-policy" element={<CorrectionPage />} />
            <Route path="/research-areas" element={<ResearchAreas/>} />
            <Route path="/plagiarism-policy" element={<PlagiarismPolicy/>} />
            <Route path="/reviewProcess" element={<ReviewProcess/>} />
            <Route path="/reviewerGuidelines" element={<ReviewerGuidelines/>} />
            <Route path="/ethics" element={<Ethics/>} />
            <Route path="/signup" element={<Signup/>} />

            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit" element={<SubmitPaper />} />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>
        {showFooter && <Footer />}
        
      </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;