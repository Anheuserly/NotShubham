import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  FaUserFriends, 
  FaSearch, 
  FaSpinner, 
  FaExclamationCircle, 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaFilter, 
  FaTimesCircle,
  FaInfoCircle,
  FaDownload,
  FaLink,
  FaUserAlt,
  FaUserPlus
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/SeamlessGate/Auxiliary.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT E,H&gid=1087470156";

const Auxiliary = () => {
  const [auxiliaryList, setAuxiliaryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrimaries, setSelectedPrimaries] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  
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
            auxiliaryName: row.c[0]?.v || "Unknown", // Column E (Name of Auxiliary)
            primaryName: row.c[1]?.v || "No Primary Name Provided", // Column H (Primary Name)
            dateAdded: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0], // Random date for demo
            status: getRandomStatus()
          }));
        
        setAuxiliaryList(formattedData);
        setFilteredList(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate random status for demo purposes
  const getRandomStatus = () => {
    const statuses = ["active", "pending", "inactive"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  // Get unique primary names for filtering
  const uniquePrimaries = useMemo(() => {
    const primaries = [...new Set(auxiliaryList.map(item => item.primaryName))];
    return primaries.map(primary => ({
      name: primary,
      count: auxiliaryList.filter(item => item.primaryName === primary).length
    }));
  }, [auxiliaryList]);
  
  // Filter and sort auxiliary list
  useEffect(() => {
    let result = [...auxiliaryList];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        item => 
          item.auxiliaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.primaryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply primary name filters
    if (selectedPrimaries.length > 0) {
      result = result.filter(item => selectedPrimaries.includes(item.primaryName));
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredList(result);
  }, [auxiliaryList, searchTerm, sortConfig, selectedPrimaries]);
  
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
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      key = null;
      direction = null;
    }
    setSortConfig({ key, direction });
  };
  
  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'ascending' ? 
      <FaSortUp className="sort-icon active" /> : 
      <FaSortDown className="sort-icon active" />;
  };
  
  // Toggle primary name filter
  const togglePrimaryFilter = (primary) => {
    if (selectedPrimaries.includes(primary)) {
      setSelectedPrimaries(selectedPrimaries.filter(p => p !== primary));
    } else {
      setSelectedPrimaries([...selectedPrimaries, primary]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedPrimaries([]);
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Auxiliary Name", "Primary Name", "Date Added", "Status"];
    const csvData = [
      headers.join(","),
      ...filteredList.map(item => 
        `"${item.auxiliaryName}","${item.primaryName}","${item.dateAdded}","${item.status}"`
      )
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "auxiliary_members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Show entry details
  const showEntryDetails = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };
  
  // Toggle view mode between table and card
  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };
  
  // Container variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
  
  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case "active": return "status-active";
      case "pending": return "status-pending";
      case "inactive": return "status-inactive";
      default: return "";
    }
  };
  
  return (
    <div className="auxiliary-section" ref={containerRef}>
      <div className="auxiliary-header">
        <div className="auxiliary-title-container">
          <FaUserFriends className="auxiliary-icon" />
          <h2 className="auxiliary-title">Auxiliary Members</h2>
        </div>
        <p className="auxiliary-subtitle">
          Members who are linked to primary accounts with special access privileges
        </p>
      </div>
      
      <div className="auxiliary-actions">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="auxiliary-search"
            placeholder="Search by auxiliary or primary name..."
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
        
        <div className="action-buttons">
          <button 
            className="view-toggle-button" 
            onClick={toggleViewMode}
            title={viewMode === "table" ? "Switch to card view" : "Switch to table view"}
          >
            {viewMode === "table" ? "Card View" : "Table View"}
          </button>
          
          <button 
            className="filter-button" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button 
            className="export-button" 
            onClick={exportToCSV}
            disabled={filteredList.length === 0}
          >
            <FaDownload /> Export
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="filters-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-header">
              <h3>Filter by Primary Account</h3>
              {selectedPrimaries.length > 0 && (
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
            
            <div className="primary-filters">
              {uniquePrimaries.map((primary, index) => (
                <div 
                  key={index} 
                  className={`primary-filter-item ${selectedPrimaries.includes(primary.name) ? 'active' : ''}`}
                  onClick={() => togglePrimaryFilter(primary.name)}
                >
                  <div className="primary-checkbox">
                    {selectedPrimaries.includes(primary.name) && <span className="checkmark">✓</span>}
                  </div>
                  <div className="primary-info">
                    <span className="primary-name">{primary.name}</span>
                    <span className="primary-count">{primary.count} auxiliaries</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {loading ? (
        <div className="auxiliary-loading">
          <FaSpinner className="loading-spinner" />
          <p>Loading auxiliary members...</p>
        </div>
      ) : error ? (
        <div className="auxiliary-error">
          <FaExclamationCircle className="error-icon" />
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
          <div className="auxiliary-stats">
            <div className="stat-item">
              <FaUserFriends className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{auxiliaryList.length}</span>
                <span className="stat-label">Total Auxiliaries</span>
              </div>
            </div>
            
            <div className="stat-item">
              <FaUserAlt className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">
                  {new Set(auxiliaryList.map(item => item.primaryName)).size}
                </span>
                <span className="stat-label">Primary Accounts</span>
              </div>
            </div>
            
            <div className="stat-item">
              <FaFilter className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{filteredList.length}</span>
                <span className="stat-label">Showing</span>
              </div>
            </div>
          </div>
          
          {filteredList.length === 0 ? (
            <div className="no-results">
              <FaTimesCircle className="no-results-icon" />
              <p>No auxiliary members found matching your criteria.</p>
              <button 
                className="clear-filters-button" 
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "table" ? (
            <div className="auxiliary-table-wrapper">
              <div className="auxiliary-table-container">
                <table className="auxiliary-table">
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('auxiliaryName')}>
                        Auxiliary Name {getSortIcon('auxiliaryName')}
                      </th>
                      <th onClick={() => requestSort('primaryName')}>
                        Primary Name {getSortIcon('primaryName')}
                      </th>
                      <th onClick={() => requestSort('dateAdded')}>
                        Date Added {getSortIcon('dateAdded')}
                      </th>
                      <th onClick={() => requestSort('status')}>
                        Status {getSortIcon('status')}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredList.map((entry) => (
                        <motion.tr
                          key={entry.id}
                          className={`auxiliary-row status-${entry.status}`}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layoutId={`row-${entry.id}`}
                        >
                          <td className="auxiliary-cell" data-label="Auxiliary Name">{entry.auxiliaryName}</td>
                          <td className="primary-cell" data-label="Primary Name">{entry.primaryName}</td>
                          <td className="date-cell" data-label="Date Added">{entry.dateAdded}</td>
                          <td className="status-cell" data-label="Status">
                            <span className={`status-badge ${getStatusClass(entry.status)}`}>
                              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                            </span>
                          </td>
                          <td className="actions-cell" data-label="Actions">
                            <button 
                              className="details-button"
                              onClick={() => showEntryDetails(entry)}
                              aria-label="View details"
                            >
                              <FaInfoCircle />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <motion.div 
              className="auxiliary-cards"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredList.map((entry) => (
                <motion.div 
                  key={entry.id}
                  className={`auxiliary-card status-${entry.status}`}
                  variants={itemVariants}
                  layoutId={`card-${entry.id}`}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                >
                  <div className="card-header">
                    <h3 className="card-title">{entry.auxiliaryName}</h3>
                    <span className={`status-badge ${getStatusClass(entry.status)}`}>
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <div className="card-info">
                      <div className="info-item">
                        <FaUserAlt className="info-icon" />
                        <div className="info-content">
                          <span className="info-label">Primary Account</span>
                          <span className="info-value">{entry.primaryName}</span>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <FaLink className="info-icon" />
                        <div className="info-content">
                          <span className="info-label">Added On</span>
                          <span className="info-value">{entry.dateAdded}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button 
                      className="details-button-card"
                      onClick={() => showEntryDetails(entry)}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="auxiliary-footer">
            <p>
              Auxiliary members have limited access to community features through their primary accounts.
            </p>
            <p className="last-updated">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </>
      )}
      
      {/* Details Modal */}
      <AnimatePresence>
        {showModal && selectedEntry && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              layoutId={`${viewMode === "table" ? "row" : "card"}-${selectedEntry.id}`}
            >
              <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
              
              <div className="modal-header">
                <h3>Auxiliary Member Details</h3>
              </div>
              
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Auxiliary Name:</span>
                  <span className="detail-value">{selectedEntry.auxiliaryName}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Primary Name:</span>
                  <span className="detail-value">{selectedEntry.primaryName}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Date Added:</span>
                  <span className="detail-value">{selectedEntry.dateAdded}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status-text ${getStatusClass(selectedEntry.status)}`}>
                    {selectedEntry.status.charAt(0).toUpperCase() + selectedEntry.status.slice(1)}
                  </span>
                </div>
                
                <div className="detail-notes">
                  <h4>Access Information</h4>
                  <p>
                    This auxiliary member is linked to {selectedEntry.primaryName}'s account and inherits 
                    limited permissions. The auxiliary can participate in community events but cannot 
                    modify account settings or access administrative features.
                  </p>
                </div>
                
                <div className="detail-actions">
                  <div className="action-item">
                    <FaUserPlus className="action-icon" />
                    <div className="action-content">
                      <span className="action-label">Added By</span>
                      <span className="action-value">System Administrator</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="modal-button secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auxiliary;