import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RankPredictor from './pages/RankPredictor';
import PercentileToRank from './pages/PercentileToRank';
import Services from './pages/Services/Services';
import Resources from './pages/Resources/Resources';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Advisor from './pages/Advisor/Advisor';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Ebooks from './pages/Resources/SubPages/Ebooks';
import Videos from './pages/Resources/SubPages/Videos';
import CutoffData from './pages/Resources/SubPages/CutoffData';
import Checklists from './pages/Resources/SubPages/Checklists';
import CounsellingCalendar from './pages/Resources/SubPages/CounsellingCalendar';
import FAQ from './pages/Resources/SubPages/FAQ';
import Footer from './components/Footer';
import FloatingContactButton from './components/FloatingContactButton';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-transparent text-slate-800 relative">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rank-predictor" element={<RankPredictor />} />
            <Route path="/percentile-to-rank" element={<PercentileToRank />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resources/ebooks" element={<Ebooks />} />
            <Route path="/resources/videos" element={<Videos />} />
            <Route path="/resources/cutoff-data" element={<CutoffData />} />
            <Route path="/resources/checklists" element={<Checklists />} />
            <Route path="/resources/calendar" element={<CounsellingCalendar />} />
            <Route path="/resources/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContactButton />
      </div>
    </Router>
  );
}

export default App;
