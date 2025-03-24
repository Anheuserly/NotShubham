import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/App.css';

// Import the main home page
import Home from './pages/Home';

// Import section home pages
import NotShubhamHome from './pages/NotShubham/Home';
import CoachanilsainiHome from './pages/Coachanilsaini/Home';
import AmcsgeHome from './pages/Amcsge/Home';
import DrNathHome from './pages/DrNath/Home';
import SeamlessGateHome from './pages/SeamlessGate/Home';
import HallOfMalovelanceHome from './pages/HallOfMalovelance/Home';
import NightmareEmpireHome from './pages/NightmareEmpire/Home';
import VeraAIHome from './pages/VeraAI/Home';

// Import Loading component
import Loading from './components/common/Loading';

// RouteTransition component to handle loading between route changes
function RouteTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Loading time when navigating between routes
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return children;
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Initial app loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* NotShubham routes */}
        <Route path="/notshubham" element={
          <RouteTransition>
            <NotShubhamHome />
          </RouteTransition>
        } />
        
        {/* Coachanilsaini routes */}
        <Route path="/coachanilsaini" element={
          <RouteTransition>
            <CoachanilsainiHome />
          </RouteTransition>
        } />
        
        {/* Amcsge routes */}
        <Route path="/amcsge" element={
          <RouteTransition>
            <AmcsgeHome />
          </RouteTransition>
        } />
        
        {/* DrNath routes */}
        <Route path="/drnath" element={
          <RouteTransition>
            <DrNathHome />
          </RouteTransition>
        } />
        
        {/* SeamlessGate routes */}
        <Route path="/seamlessgate" element={
          <RouteTransition>
            <SeamlessGateHome />
          </RouteTransition>
        } />
        
        {/* HallOfMalovelance routes */}
        <Route path="/hallofmalovelance" element={
          <RouteTransition>
            <HallOfMalovelanceHome />
          </RouteTransition>
        } />
        
        {/* NightmareEmpire routes */}
        <Route path="/nightmareempire" element={
          <RouteTransition>
            <NightmareEmpireHome />
          </RouteTransition>
        } />

        {/* NightmareEmpire routes */}
        <Route path="/veraai" element={
          <RouteTransition>
            <VeraAIHome />
          </RouteTransition>
        } />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;