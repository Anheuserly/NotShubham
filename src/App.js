import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/App.css';

import './firebase'; 

// Import the main home page
import Home from './pages/Home';

// Import section home pages
import NotShubhamHome from './pages/NotShubham/Home';
import CoachanilsainiHome from './pages/Coachanilsaini/Home';
import AmcsgeHome from './pages/Amcsge/Home';
import DrNathHome from './pages/DrNath/Home';
import DrNathAbout from './pages/DrNath/About';
import SeamlessGateHome from './pages/SeamlessGate/Home';
import SeamlessGateAbout from './pages/SeamlessGate/About';
import SeamlessGateMembers from './pages/SeamlessGate/Members';
import SeamlessGateGallery from './pages/SeamlessGate/Gallery';
import HallOfMalovelanceHome from './pages/HallOfMalovelance/Home';
import NightmareEmpireHome from './pages/NightmareEmpire/Home';
import VeraAIHome from './pages/VeraAI/Home';

import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

// Import common components
import Loading from './components/common/Loading';
import MetaTags from './components/common/MetaTags';
import StructuredData from './components/common/StructuredData';
import Footer from './components/Footer';  // ✅ Import Footer

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

  return isLoading ? <Loading /> : children;
}

// Define route configurations for better organization
const routeConfig = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/portfolio", element: <Portfolio /> },
  { path: "/contact", element: <Contact /> },
  { path: "/notshubham", element: <NotShubhamHome /> },
  { path: "/coachanilsaini", element: <CoachanilsainiHome /> },
  { path: "/amcsge", element: <AmcsgeHome /> },
  { path: "/drnath", element: <DrNathHome /> },
  { path: "/drnath/about", element: <DrNathAbout /> },
  { path: "/seamlessgate", element: <SeamlessGateHome /> },
  { path: "/seamlessgate/about", element: <SeamlessGateAbout /> },
  { path: "/seamlessgate/members", element: <SeamlessGateMembers /> },
  { path: "/seamlessgate/gallery", element: <SeamlessGateGallery /> },
  { path: "/hallofmalovelance", element: <HallOfMalovelanceHome /> },
  { path: "/nightmareempire", element: <NightmareEmpireHome /> },
  { path: "/veraai", element: <VeraAIHome /> },
];

// AppContent component to use location
function AppContent() {
  return (
    <>
      <MetaTags />
      <StructuredData />
      <Routes>
        {routeConfig.map((route, index) => (
          <Route 
            key={index}
            path={route.path} 
            element={
              route.path === "/" ? 
                route.element : 
                <RouteTransition>{route.element}</RouteTransition>
            } 
          />
        ))}
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  {/* ✅ Footer added here */}
  <Footer />  
      
    </>
  );
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
      <AppContent />
    </Router>
  );
}

export default App;