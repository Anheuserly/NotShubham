import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaTags = () => {
  const location = useLocation();
  
  // Define metadata for each route
  const metaData = {
    '/': {
      title: 'NotShubham | Creative Digital Space',
      description: 'NotShubham is a hub for creativity, technology, and innovation. Explore a world of digital experiences, design, and cutting-edge solutions.',
      keywords: 'NotShubham, creative design, web development, digital space, innovation, technology',
      ogImage: '/og-image.jpg',
      twitterImage: '/twitter-image.jpg'
    },
    '/notshubham': {
      title: 'NotShubham | Personal Portfolio',
      description: 'Explore NotShubham\'s creative works, projects, and digital innovations. A showcase of design, development, and creative thinking.',
      keywords: 'NotShubham, portfolio, creative works, digital projects, web design',
      ogImage: '/notshubham-og.jpg',
      twitterImage: '/notshubham-twitter.jpg'
    },
    '/coachanilsaini': {
      title: 'Coach Anil Saini | Professional Training',
      description: 'Coach Anil Saini provides expert training and guidance for aspiring athletes and professionals. Learn from the best to achieve your goals.',
      keywords: 'Anil Saini, professional coach, training, athletics, sports coaching, fitness',
      ogImage: '/coachanilsaini-og.jpg',
      twitterImage: '/coachanilsaini-twitter.jpg'
    },
    '/amcsge': {
      title: 'AMCSGE | Advanced Solutions',
      description: 'AMCSGE delivers cutting-edge solutions for modern challenges. Explore our innovative approaches to technology and business problems.',
      keywords: 'AMCSGE, advanced solutions, technology innovation, business solutions, digital transformation',
      ogImage: '/amcsge-og.jpg',
      twitterImage: '/amcsge-twitter.jpg'
    },
    '/drnath': {
      title: 'Dr. Nath | Professional Healthcare',
      description: 'Dr. Nath provides expert healthcare services with a focus on patient well-being and advanced medical practices.',
      keywords: 'Dr Nath, healthcare, medical services, professional doctor, patient care',
      ogImage: '/drnath-og.jpg',
      twitterImage: '/drnath-twitter.jpg'
    },
    '/seamlessgate': {
      title: 'Seamless Gate | Innovative Portal',
      description: 'Seamless Gate connects worlds through innovative digital solutions. Explore our platform for seamless transitions and experiences.',
      keywords: 'Seamless Gate, digital portal, innovation, connectivity, seamless experience',
      ogImage: '/seamlessgate-og.jpg',
      twitterImage: '/seamlessgate-twitter.jpg'
    },
    '/hallofmalovelance': {
      title: 'Hall of Malovelance | Dark Creativity',
      description: 'Enter the Hall of Malovelance, where dark creativity and unique perspectives converge to create unforgettable experiences.',
      keywords: 'Hall of Malovelance, dark art, creative darkness, unique experiences, alternative design',
      ogImage: '/hallofmalovelance-og.jpg',
      twitterImage: '/hallofmalovelance-twitter.jpg'
    },
    '/nightmareempire': {
      title: 'Nightmare Empire | Immersive Experiences',
      description: 'Nightmare Empire creates immersive experiences that challenge perception and reality. Dive into a world of extraordinary imagination.',
      keywords: 'Nightmare Empire, immersive experiences, reality alteration, creative worlds, digital experiences',
      ogImage: '/nightmareempire-og.jpg',
      twitterImage: '/nightmareempire-twitter.jpg'
    },
    '/veraai': {
      title: 'Vera AI | Intelligent Solutions',
      description: 'Vera AI delivers intelligent solutions powered by advanced artificial intelligence. Experience the future of AI-driven technology.',
      keywords: 'Vera AI, artificial intelligence, intelligent solutions, AI technology, machine learning',
      ogImage: '/veraai-og.jpg',
      twitterImage: '/veraai-twitter.jpg'
    }
  };

  // Handle sub-routes
  const getMetaForPath = (path) => {
    // Check for exact match first
    if (metaData[path]) return metaData[path];
    
    // Check for parent routes
    const parentPath = '/' + path.split('/')[1];
    return metaData[parentPath] || metaData['/'];
  };

  useEffect(() => {
    const currentMeta = getMetaForPath(location.pathname);
    
    // Update document title
    document.title = currentMeta.title;
    
    // Update meta tags
    const metaTags = {
      'description': currentMeta.description,
      'keywords': currentMeta.keywords,
      'og:title': currentMeta.title,
      'og:description': currentMeta.description,
      'og:image': currentMeta.ogImage,
      'twitter:title': currentMeta.title,
      'twitter:description': currentMeta.description,
      'twitter:image': currentMeta.twitterImage
    };
    
    // Update each meta tag
    Object.entries(metaTags).forEach(([name, content]) => {
      // Find existing meta tag
      let metaTag;
      if (name.startsWith('og:')) {
        metaTag = document.querySelector(`meta[property="${name}"]`);
      } else {
        metaTag = document.querySelector(`meta[name="${name}"]`);
      }
      
      // Update or create meta tag
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        if (name.startsWith('og:')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    });
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://notshubham.com${location.pathname}`);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', `https://notshubham.com${location.pathname}`);
      document.head.appendChild(canonicalLink);
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default MetaTags;