import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StructuredData = () => {
  const location = useLocation();
  
  // Define structured data for each route
  const structuredData = {
    '/': {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NotShubham",
      "url": "https://notshubham.com",
      "description": "Creative Digital Space for Design and Innovation",
      "sameAs": [
        "https://www.facebook.com/notshubham",
        "https://www.instagram.com/notshubham/",
        "https://twitter.com/notshubham",
        "https://www.linkedin.com/in/notshubham"
      ]
    },
    '/notshubham': {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "name": "NotShubham Portfolio",
      "url": "https://notshubham.com/notshubham",
      "description": "Personal portfolio and creative works by NotShubham",
      "mainEntity": {
        "@type": "Person",
        "name": "NotShubham",
        "description": "Digital creator and innovator",
        "url": "https://notshubham.com/notshubham"
      }
    },
    '/coachanilsaini': {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Coach Anil Saini",
      "url": "https://notshubham.com/coachanilsaini",
      "description": "Professional training and coaching services",
      "serviceType": "Sports Training"
    },
    '/amcsge': {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AMCSGE",
      "url": "https://notshubham.com/amcsge",
      "description": "Advanced solutions for modern challenges",
      "serviceType": "Technology Solutions"
    },
    '/drnath': {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Dr. Nath Healthcare",
      "url": "https://notshubham.com/drnath",
      "description": "Professional healthcare services",
      "medicalSpecialty": "General Practice"
    },
    '/seamlessgate': {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Seamless Gate",
      "url": "https://notshubham.com/seamlessgate",
      "description": "Innovative digital portal connecting worlds",
      "applicationCategory": "Digital Platform"
    },
    '/hallofmalovelance': {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Hall of Malovelance",
      "url": "https://notshubham.com/hallofmalovelance",
      "description": "Dark creativity and unique artistic perspectives",
      "creativeWorkStatus": "Active"
    },
    '/nightmareempire': {
      "@context": "https://schema.org",
      "@type": "EntertainmentBusiness",
      "name": "Nightmare Empire",
      "url": "https://notshubham.com/nightmareempire",
      "description": "Immersive experiences that challenge perception",
      "serviceType": "Immersive Entertainment"
    },
    '/veraai': {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Vera AI",
      "url": "https://notshubham.com/veraai",
      "description": "Intelligent solutions powered by advanced artificial intelligence",
      "applicationCategory": "Artificial Intelligence",
      "operatingSystem": "All"
    }
  };

  // Handle sub-routes
  const getStructuredDataForPath = (path) => {
    // Check for exact match first
    if (structuredData[path]) return structuredData[path];
    
    // Check for parent routes
    const parentPath = '/' + path.split('/')[1];
    return structuredData[parentPath] || structuredData['/'];
  };

  useEffect(() => {
    // Get the appropriate structured data for the current path
    const currentData = getStructuredDataForPath(location.pathname);
    
    // Find existing JSON-LD script tag
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    
    // If it exists, update it; otherwise, create a new one
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(currentData);
    } else {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.textContent = JSON.stringify(currentData);
      document.head.appendChild(scriptTag);
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default StructuredData;