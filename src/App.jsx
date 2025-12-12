import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Booking from './pages/Booking';
import Formation from './pages/Formation';
import { EcstasyAI, BackgroundSound } from './components';
import './styles/global.css';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {

  useEffect(() => {
    // Animation logic disabled for stability
    // window.scrollTo(0,0);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <BackgroundSound />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/ecstasy" element={<EcstasyAI />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
