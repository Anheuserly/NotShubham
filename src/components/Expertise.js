import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Expertise.css";

// Import icons (you can replace these with your own SVG icons or use a library like react-icons)
import { ReactComponent as ArchitectureIcon } from "../path/icons/architecture.svg";
import { ReactComponent as InteriorIcon } from "../path/icons/interior.svg";
import { ReactComponent as UrbanIcon } from "../path/icons/urban.svg";
import { ReactComponent as LandscapeIcon } from "../path/icons/landscape.svg";
import { ReactComponent as StructuralIcon } from "../path/icons/structural.svg";
import { ReactComponent as MepIcon } from "../path/icons/mep.svg";
import { ReactComponent as CivilIcon } from "../path/icons/civil.svg";
import { ReactComponent as ComputationalIcon } from "../path/icons/computational.svg";
import { ReactComponent as SustainabilityIcon } from "../path/icons/sustainability.svg";
import { ReactComponent as SolutionIcon } from "../path/icons/solution.svg";

const Expertise = () => {
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
    
    // If you want to reset the selected expertise when navigating away
    return () => {
      setIsInView(false);
    };
  }, []);

  const expertiseAreas = [
    {
      id: "architectural",
      title: "Architectural Design",
      icon: ArchitectureIcon,
      description: "We create innovative architectural solutions that balance aesthetics, functionality, and sustainability. Our designs respond to client needs, site context, and environmental considerations.",
      keyPoints: [
        "Conceptual design development",
        "Schematic design and design development",
        "Construction documentation",
        "3D visualization and rendering",
        "Building code compliance"
      ],
      color: "#2D4263"
    },
    {
      id: "interior",
      title: "Interior Design",
      icon: InteriorIcon,
      description: "Our interior design services transform spaces into functional, beautiful environments that reflect our clients' identities and enhance user experience.",
      keyPoints: [
        "Space planning and layout optimization",
        "Material and finish selection",
        "Custom furniture design",
        "Lighting design",
        "Acoustic planning"
      ],
      color: "#C84B31"
    },
    {
      id: "urban",
      title: "Urban Design and Planning",
      icon: UrbanIcon,
      description: "We develop comprehensive urban design strategies that create vibrant, sustainable communities and revitalize existing urban fabrics.",
      keyPoints: [
        "Master planning",
        "Urban revitalization",
        "Transit-oriented development",
        "Public space design",
        "Zoning and land use planning"
      ],
      color: "#7A86B6"
    },
    {
      id: "landscape",
      title: "Landscape Design",
      icon: LandscapeIcon,
      description: "Our landscape designs integrate natural elements with built environments to create harmonious outdoor spaces that enhance ecological value.",
      keyPoints: [
        "Site analysis and planning",
        "Sustainable landscape design",
        "Native planting strategies",
        "Water management systems",
        "Outdoor amenity spaces"
      ],
      color: "#3A6B35"
    },
    {
      id: "structural",
      title: "Structural Engineering",
      icon: StructuralIcon,
      description: "We provide innovative structural solutions that ensure safety, efficiency, and constructability while supporting architectural vision.",
      keyPoints: [
        "Structural analysis and design",
        "Seismic design",
        "Structural retrofitting",
        "Performance-based design",
        "Construction administration"
      ],
      color: "#1B262C"
    },
    {
      id: "mep",
      title: "MEP Engineering",
      icon: MepIcon,
      description: "Our MEP engineering services deliver efficient, sustainable building systems that optimize comfort, performance, and energy use.",
      keyPoints: [
        "HVAC system design",
        "Electrical systems and lighting",
        "Plumbing and fire protection",
        "Energy modeling",
        "Smart building technologies"
      ],
      color: "#5C4B99"
    },
    {
      id: "civil",
      title: "Civil Engineering",
      icon: CivilIcon,
      description: "We provide comprehensive civil engineering solutions that address site development challenges and infrastructure needs.",
      keyPoints: [
        "Site grading and drainage",
        "Stormwater management",
        "Utility coordination",
        "Transportation planning",
        "Permitting assistance"
      ],
      color: "#2B3A55"
    },
    {
      id: "computational",
      title: "Computational Design & BIM",
      icon: ComputationalIcon,
      description: "We leverage advanced computational tools and Building Information Modeling to optimize design processes and outcomes.",
      keyPoints: [
        "Parametric design",
        "Performance simulation",
        "BIM implementation and management",
        "Digital fabrication",
        "Integrated project delivery"
      ],
      color: "#3F72AF"
    },
    {
      id: "sustainability",
      title: "Sustainability / Resilience",
      icon: SustainabilityIcon,
      description: "Our sustainability approach integrates environmental responsibility, resource efficiency, and resilience into every project.",
      keyPoints: [
        "LEED and WELL certification",
        "Net-zero energy design",
        "Climate resilience strategies",
        "Passive design optimization",
        "Life cycle assessment"
      ],
      color: "#4E9F3D"
    },
    {
      id: "solution",
      title: "Solution",
      icon: SolutionIcon,
      description: "We provide integrated solutions that address complex design challenges through collaboration and innovative thinking.",
      keyPoints: [
        "Interdisciplinary coordination",
        "Problem-solving workshops",
        "Value engineering",
        "Design optimization",
        "Implementation strategies"
      ],
      color: "#D89216"
    }
  ];

  const handleExpertiseClick = (expertise) => {
    setSelectedExpertise(selectedExpertise === expertise.id ? null : expertise.id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="expertise-container">
      <motion.div 
        className="expertise-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Our Expertise</h1>
        <p>
          We bring together diverse disciplines to deliver comprehensive design solutions.
          Click on each expertise to learn more about our capabilities.
        </p>
      </motion.div>

      <motion.div 
        className="expertise-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {expertiseAreas.map((expertise) => (
          <motion.div
            key={expertise.id}
            className={`expertise-card ${selectedExpertise === expertise.id ? 'expanded' : ''}`}
            variants={itemVariants}
            onClick={() => handleExpertiseClick(expertise)}
            style={{
              '--card-color': expertise.color,
              '--card-color-light': `${expertise.color}22`
            }}
          >
            <div className="expertise-card-header">
              <div className="expertise-icon">
                <expertise.icon />
              </div>
              <h2>{expertise.title}</h2>
            </div>
            
            <AnimatePresence>
              {selectedExpertise === expertise.id && (
                <motion.div 
                  className="expertise-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{expertise.description}</p>
                  <ul className="expertise-key-points">
                    {expertise.keyPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button 
                    className="learn-more-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="expertise-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2>Ready to bring your vision to life?</h2>
        <p>Our multidisciplinary team is ready to tackle your most challenging projects.</p>
        <motion.button 
          className="contact-btn"
          whileHover={{ scale: 1.05, backgroundColor: "#000" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Contact Us
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Expertise;