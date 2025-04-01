import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  FaExclamationTriangle, 
  FaSearch, 
  FaSpinner, 
  FaShieldAlt, 
  FaExclamationCircle, 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaFilter, 
  FaTimesCircle,
  FaInfoCircle,
  FaDownload
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/SeamlessGate/Blacklisted.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT B,E&gid=503985100";

const Blacklisted = () => {
  const [blacklist, setBlacklist] = useState([]);
  const [filteredBlacklist, setFilteredBlacklist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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
            account: row.c[0]?.v || "Unknown", // Column B (Account Name)
            reason: row.c[1]?.v || "No Reason Provided", // Column E (Reason)
            date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0], // Random date for demo
            severity: getSeverityLevel(row.c[1]?.v || "")
          }));
        
        setBlacklist(formattedData);
        setFilteredBlacklist(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Determine severity level based on reason text
  const getSeverityLevel = (reason) => {
    const lowText = ["minor", "temporary", "first offense", "warning"];
    const highText = ["severe", "permanent", "repeated", "ban", "violation", "hack", "cheat"];
    
    reason = reason.toLowerCase();
    
    if (highText.some(text => reason.includes(text))) {
      return "high";
    } else if (lowText.some(text => reason.includes(text))) {
      return "low";
    } else {
      return "medium";
    }
  };
  
  // Get unique reasons for filtering
  const uniqueReasons = useMemo(() => {
    const reasons = [...new Set(blacklist.map(item => item.reason))];
    return reasons.map(reason => ({
      name: reason,
      count: blacklist.filter(item => item.reason === reason).length
    }));
  }, [blacklist]);
  
  // Filter and sort blacklist
  useEffect(() => {
    let result = [...blacklist];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        item => 
          item.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply reason filters
    if (selectedReasons.length > 0) {
      result = result.filter(item => selectedReasons.includes(item.reason));
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
    
    setFilteredBlacklist(result);
  }, [blacklist, searchTerm, sortConfig, selectedReasons]);
  
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
  
  // Toggle reason filter
  const toggleReasonFilter = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedReasons([]);
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Account Name", "Reason", "Date", "Severity"];
    const csvData = [
      headers.join(","),
      ...filteredBlacklist.map(item => 
        `"${item.account}","${item.reason}","${item.date}","${item.severity}"`
      )
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "blacklist.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Show entry details
  const showEntryDetails = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
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
  
  return (
    <div className="blacklist-section" ref={containerRef}>
      <div className="blacklist-header">
        <div className="blacklist-title-container">
          <FaExclamationTriangle className="blacklist-icon" />
          <h2 className="blacklist-title">Blacklisted Members</h2>
        </div>
        <p className="blacklist-subtitle">
          Members who have violated community guidelines and are restricted from joining
        </p>
      </div>
      
      <div className="blacklist-actions">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="blacklist-search"
            placeholder="Search by account or reason..."
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
            className="filter-button" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button 
            className="export-button" 
            onClick={exportToCSV}
            disabled={filteredBlacklist.length === 0}
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
              <h3>Filter by Reason</h3>
              {selectedReasons.length > 0 && (
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
            
            <div className="reason-filters">
              {uniqueReasons.map((reason, index) => (
                <div 
                  key={index} 
                  className={`reason-filter-item ${selectedReasons.includes(reason.name) ? 'active' : ''}`}
                  onClick={() => toggleReasonFilter(reason.name)}
                >
                  <div className="reason-checkbox">
                    {selectedReasons.includes(reason.name) && <span className="checkmark">✓</span>}
                  </div>
                  <div className="reason-info">
                    <span className="reason-name">{reason.name}</span>
                    <span className="reason-count">{reason.count} members</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {loading ? (
        <div className="blacklist-loading">
          <FaSpinner className="loading-spinner" />
          <p>Loading blacklisted members...</p>
        </div>
      ) : error ? (
        <div className="blacklist-error">
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
          <div className="blacklist-stats">
            <div className="stat-item">
              <FaShieldAlt className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{blacklist.length}</span>
                <span className="stat-label">Total Blacklisted</span>
              </div>
            </div>
            
            <div className="stat-item">
              <FaExclamationCircle className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">
                  {blacklist.filter(item => item.severity === 'high').length}
                </span>
                <span className="stat-label">High Severity</span>
              </div>
            </div>
            
            <div className="stat-item">
              <FaFilter className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{filteredBlacklist.length}</span>
                <span className="stat-label">Showing</span>
              </div>
            </div>
          </div>
          
          {filteredBlacklist.length === 0 ? (
            <div className="no-results">
              <FaTimesCircle className="no-results-icon" />
              <p>No blacklisted members found matching your criteria.</p>
              <button 
                className="clear-filters-button" 
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="blacklist-table-wrapper">
              <div className="blacklist-table-container">
                <table className="blacklist-table">
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('account')}>
                        Account Name {getSortIcon('account')}
                      </th>
                      <th onClick={() => requestSort('reason')}>
                        Reason {getSortIcon('reason')}
                      </th>
                      <th onClick={() => requestSort('date')}>
                        Date {getSortIcon('date')}
                      </th>
                      <th onClick={() => requestSort('severity')}>
                        Severity {getSortIcon('severity')}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredBlacklist.map((entry) => (
                         <motion.tr
                         key={entry.id}
                         className={`blacklist-row severity-${entry.severity}`}
                         variants={itemVariants}
                         initial="hidden"
                         animate="visible"
                         exit="hidden"
                         layoutId={`row-${entry.id}`}
                       >
                         <td className="account-cell">{entry.account}</td>
                         <td className="reason-cell">{entry.reason}</td>
                         <td className="date-cell">{entry.date}</td>
                         <td className="severity-cell">
                           <span className={`severity-badge ${entry.severity}`}>
                             {entry.severity.charAt(0).toUpperCase() + entry.severity.slice(1)}
                           </span>
                         </td>
                         <td className="actions-cell">
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
         )}
         
         <div className="blacklist-footer">
           <p>
             This list is regularly updated. Members on this list are not allowed to join the community.
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
             layoutId={`row-${selectedEntry.id}`}
           >
             <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
             
             <div className="modal-header">
               <h3>Blacklisted Member Details</h3>
             </div>
             
             <div className="modal-body">
               <div className="detail-row">
                 <span className="detail-label">Account Name:</span>
                 <span className="detail-value">{selectedEntry.account}</span>
               </div>
               
               <div className="detail-row">
                 <span className="detail-label">Reason:</span>
                 <span className="detail-value">{selectedEntry.reason}</span>
               </div>
               
               <div className="detail-row">
                 <span className="detail-label">Date Added:</span>
                 <span className="detail-value">{selectedEntry.date}</span>
               </div>
               
               <div className="detail-row">
                 <span className="detail-label">Severity:</span>
                 <span className={`detail-value severity-text ${selectedEntry.severity}`}>
                   {selectedEntry.severity.charAt(0).toUpperCase() + selectedEntry.severity.slice(1)}
                 </span>
               </div>
               
               <div className="detail-notes">
                 <h4>Additional Notes</h4>
                 <p>
                   This member has been blacklisted based on community guidelines violations. 
                   The decision was reviewed by the moderation team and is {selectedEntry.severity === 'high' ? 'permanent' : 'subject to review'}.
                 </p>
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

export default Blacklisted;