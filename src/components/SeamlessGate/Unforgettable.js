import React, { useState, useEffect, useRef } from "react";
import { FaUsers, FaTrophy, FaSpinner, FaExclamationTriangle, FaSearch, FaFireAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/SeamlessGate/Unforgettable.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT C&gid=1886701442";

const Unforgettable = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef(null);
  
  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(GOOGLE_SHEET_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data from Google Sheets");
        }
        
        const text = await response.text();
        
        // Extract JSON from Google Sheets API response
        const jsonData = JSON.parse(text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1));
        
        if (!jsonData.table || !jsonData.table.rows) {
          throw new Error("Invalid data format from Google Sheets");
        }
        
        const rows = jsonData.table.rows;
        const formattedData = rows
          .filter(row => row.c && row.c[0] && row.c[0].v) // Filter out empty entries
          .map((row, index) => ({
            id: index,
            playerName: row.c[0]?.v || "Unknown", // Column C (Player Name)
            highlighted: false,
            avatar: generateAvatar(row.c[0]?.v || "Unknown")
          }));
        
        setPlayers(formattedData);
        setFilteredPlayers(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter players based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player => 
        player.playerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  }, [searchTerm, players]);
  
  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Generate avatar based on player name
  const generateAvatar = (name) => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFBE0B", 
      "#FB5607", "#FF006E", "#8338EC", "#3A86FF"
    ];
    
    // Use the name to deterministically select a color
    const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    
    return {
      initials,
      color: colors[colorIndex]
    };
  };
  
  // Handle player click
  const handlePlayerClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Container variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item variants for framer-motion
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  return (
    <div className="unforgettable-section" ref={containerRef}>
      <div className="unforgettable-background">
        <div className="unforgettable-bg-shape shape1"></div>
        <div className="unforgettable-bg-shape shape2"></div>
        <div className="unforgettable-bg-shape shape3"></div>
      </div>
      
      <div className="unforgettable-header">
        <div className="unforgettable-title-container">
          <FaTrophy className="unforgettable-icon" />
          <h2 className="unforgettable-title">Unforgettable Members</h2>
        </div>
        <p className="unforgettable-subtitle">
          Honoring our legendary members who have made exceptional contributions
        </p>
      </div>
      
      <div className="unforgettable-search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="unforgettable-search"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="unforgettable-loading">
          <FaSpinner className="loading-spinner" />
          <p>Loading unforgettable members...</p>
        </div>
      ) : error ? (
        <div className="unforgettable-error">
          <FaExclamationTriangle className="error-icon" />
          <p>Error: {error}</p>
          <button 
            className="retry-button" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="unforgettable-stats">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{players.length}</span>
                <span className="stat-label">Total Members</span>
              </div>
            </div>
            <div className="stat-item">
              <FaFireAlt className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{filteredPlayers.length}</span>
                <span className="stat-label">Showing</span>
              </div>
            </div>
          </div>
          
          {filteredPlayers.length === 0 ? (
            <div className="no-results">
              <p>No members found matching "{searchTerm}"</p>
              <button 
                className="clear-search-button" 
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                className="unforgettable-grid"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
                {filteredPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    className={`unforgettable-card ${activeIndex === index ? 'active' : ''}`}
                    variants={itemVariants}
                    onClick={() => handlePlayerClick(index)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="unforgettable-avatar" 
                      style={{ backgroundColor: player.avatar.color }}
                    >
                      {player.avatar.initials}
                    </div>
                    <div className="unforgettable-info">
                      <h3 className="unforgettable-name">{player.playerName}</h3>
                      <div className="unforgettable-badge">Legendary</div>
                    </div>
                    <div className="unforgettable-shine"></div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          
          <div className="unforgettable-footer">
            <p>
              Our unforgettable members have shown exceptional dedication and contribution to our community.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Unforgettable;