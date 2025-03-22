import React, { useState, useEffect, useRef } from 'react';
import '../styles/HeroSection.css';

// Import images directly
import architecture1 from '../path/image/hero/architecture-1.jpg';
import architecture2 from '../path/image/hero/architecture-2.jpeg';
import architecture3 from '../path/image/hero/architecture-3.png';
import architecture4 from '../path/image/hero/architecture-4.png';
import architecture5 from '../path/image/hero/architecture-5.png';

const HeroSection = () => {
  // Array of hero images with descriptions
  const heroSlides = [
    {
      image: architecture1,
      title: 'AIIMS',
      description: 'Clean lines and open spaces define our approach to contemporary living.',
      position: 'center'
    },
    {
      image: architecture2,
      title: 'Builder Floor, MIRA BAGH',
      description: 'Harmonizing innovative architecture with environmental consciousness.',
      position: 'top'
    },
    {
      image: architecture3,
      title: 'MOODBOARD',
      description: 'Reimagining city spaces through thoughtful architectural intervention.',
      position: 'center'
    },
    {
      image: architecture4,
      title: 'MR TUSHAR FARIDABAD',
      description: 'Creating spaces that transcend trends and stand the test of time.',
      position: 'bottom'
    },
    {
      image: architecture5,
      title: 'MR VIKRAM',
      description: 'Where practical design meets aesthetic excellence.',
      position: 'center'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);
  const transitionDuration = 6000; // 6 seconds per slide
  const transitionTime = 1500; // 1.5 seconds for the transition effect

  // Function to advance to the next slide
  const advanceSlide = () => {
    if (isTransitioning || isPaused) return;
    
    setIsTransitioning(true);
    
    // Set the next slide
    setNextSlide((currentSlide + 1) % heroSlides.length);
    
    // After transition time, update current slide and reset transition state
    setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, transitionTime);
  };

  // Set up automatic slide transition
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      advanceSlide();
    }, transitionDuration);
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentSlide, isTransitioning, isPaused]);

  // Pause slideshow when user hovers over it
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Manual navigation
  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setNextSlide(index);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, transitionTime);
  };

  return (
    <section 
      className="hero-section" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Current slide with zoom effect */}
      <div 
        className="hero-slide current" 
        style={{ 
          backgroundImage: `url(${heroSlides[currentSlide].image})`,
          backgroundPosition: heroSlides[currentSlide].position
        }}
      >
        <div className="slide-content">
          <h1 className="slide-title">{heroSlides[currentSlide].title}</h1>
          <p className="slide-description">{heroSlides[currentSlide].description}</p>
        </div>
      </div>
      
      {/* Next slide (for transition) */}
      {isTransitioning && (
        <div 
          className="hero-slide next" 
          style={{ 
            backgroundImage: `url(${heroSlides[nextSlide].image})`,
            backgroundPosition: heroSlides[nextSlide].position
          }}
        >
          <div className="slide-content">
            <h1 className="slide-title">{heroSlides[nextSlide].title}</h1>
            <p className="slide-description">{heroSlides[nextSlide].description}</p>
          </div>
        </div>
      )}
      
      {/* Slide indicators */}
      <div className="slide-indicators">
        {heroSlides.map((_, index) => (
          <button 
            key={index} 
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll down indicator */}
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default HeroSection;