import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { 
  FaSearch, FaSort, FaSortUp, FaSortDown, 
  FaUserFriends, FaChartPie, FaChartBar, FaDownload, 
  FaFilter, FaSpinner, FaExclamationTriangle
} from "react-icons/fa";
import "../../styles/SeamlessGate/MembersList.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT B,E";
const COLORS = [
  "#4361ee", "#3a0ca3", "#7209b7", "#f72585", "#4cc9f0", 
  "#4895ef", "#560bad", "#b5179e", "#f15bb5", "#00bbf9"
];

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [chartType, setChartType] = useState("pie");
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  
  const headerRef = useRef(null);
  const membersListRef = useRef(null);
  
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
        const formattedData = rows.map(row => ({
          name: row.c[0]?.v || "Unknown", // Column B (Name)
          rank: row.c[1]?.v || "Unknown"  // Column E (Rank)
        }));
        
        setMembers(formattedData);
        setTotalMembers(formattedData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Apply filtering, sorting, and pagination
  useEffect(() => {
    let result = [...members];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.rank.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rank filter
    if (selectedRanks.length > 0) {
      result = result.filter(member => selectedRanks.includes(member.rank));
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
    
    setFilteredMembers(result);
  }, [members, searchTerm, sortConfig, selectedRanks]);
  
  // Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && membersListRef.current) {
        const { top } = membersListRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate chart data
  const chartData = useMemo(() => {
    const rankCounts = filteredMembers.reduce((acc, member) => {
      acc[member.rank] = (acc[member.rank] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(rankCounts)
      .map(rank => ({
        name: rank,
        value: rankCounts[rank],
      }))
      .sort((a, b) => b.value - a.value); // Sort by count descending
  }, [filteredMembers]);
  
  // Get unique ranks for filter
  const uniqueRanks = useMemo(() => {
    return [...new Set(members.map(member => member.rank))].sort();
  }, [members]);
  
  // Get current page members
  const currentMembers = useMemo(() => {
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    return filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  }, [filteredMembers, currentPage, membersPerPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  
  // Request sort
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
    if (sortConfig.key !== key) return <FaSort className="sort-icon" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="sort-icon active" />;
    return <FaSortDown className="sort-icon active" />;
  };
  
  // Toggle rank filter
  const toggleRankFilter = (rank) => {
    setSelectedRanks(prev => 
      prev.includes(rank) 
        ? prev.filter(r => r !== rank) 
        : [...prev, rank]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Rank'],
      ...filteredMembers.map(member => [member.name, member.rank])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'members_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of table
      if (membersListRef.current) {
        membersListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${payload[0].name}`}</p>
          <p className="tooltip-value">{`Members: ${payload[0].value}`}</p>
          <p className="tooltip-percentage">
            {`(${((payload[0].value / filteredMembers.length) * 100).toFixed(1)}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="members-section" ref={membersListRef}>
      <div className={`members-header ${isSticky ? 'sticky' : ''}`} ref={headerRef}>
        <div className="members-title">
          <FaUserFriends className="members-icon" />
          <h2>Members Directory</h2>
        </div>
        
        <div className="members-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-box"
              placeholder="Search members or ranks..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
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
          
          <button 
            className="filter-button" 
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button className="export-button" onClick={exportToCSV}>
            <FaDownload /> Export
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="filters-container">
          <h3>Filter by Rank</h3>
          <div className="rank-filters">
            {uniqueRanks.map(rank => (
              <label key={rank} className="rank-filter-item">
                <input
                  type="checkbox"
                  checked={selectedRanks.includes(rank)}
                  onChange={() => toggleRankFilter(rank)}
                />
                <span className="rank-name">{rank}</span>
                <span className="rank-count">
                  ({members.filter(m => m.rank === rank).length})
                </span>
              </label>
            ))}
          </div>
          {selectedRanks.length > 0 && (
            <button 
              className="clear-filters" 
              onClick={() => setSelectedRanks([])}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      <div className="members-stats">
        <div className="stat-card">
          <h3>Total Members</h3>
          <p>{totalMembers}</p>
        </div>
        <div className="stat-card">
          <h3>Filtered Members</h3>
          <p>{filteredMembers.length}</p>
        </div>
        <div className="stat-card">
          <h3>Unique Ranks</h3>
          <p>{uniqueRanks.length}</p>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p>Loading members data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
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
          <div className="table-container">
            {filteredMembers.length > 0 ? (
              <>
                <table className="members-table">
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('name')}>
                        Name {getSortIcon('name')}
                      </th>
                      <th onClick={() => requestSort('rank')}>
                        Rank {getSortIcon('rank')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMembers.map((member, index) => (
                      <tr key={index} className="member-row">
                        <td>{member.name}</td>
                        <td>
                          <span className="rank-badge" style={{
                            backgroundColor: COLORS[uniqueRanks.indexOf(member.rank) % COLORS.length]
                          }}>
                            {member.rank}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="pagination-container">
                  <div className="pagination-info">
                    Showing {Math.min(filteredMembers.length, (currentPage - 1) * membersPerPage + 1)} - {Math.min(currentPage * membersPerPage, filteredMembers.length)} of {filteredMembers.length} members
                  </div>
                  
                  <div className="pagination-controls">
                    <button 
                      onClick={() => handlePageChange(1)} 
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      First
                    </button>
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-pages">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button 
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                    <button 
                      onClick={() => handlePageChange(totalPages)} 
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Last
                    </button>
                  </div>
                  
                  <div className="pagination-size">
                    <label>
                      Show 
                      <select 
                        value={membersPerPage} 
                        onChange={(e) => {
                          setMembersPerPage(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page
                        }}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      per page
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-results">
                <p>No members found matching your search criteria.</p>
                {searchTerm && (
                  <button 
                    className="clear-search-button" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </button>
                )}
                {selectedRanks.length > 0 && (
                  <button 
                    className="clear-filters-button" 
                    onClick={() => setSelectedRanks([])}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
          
          {filteredMembers.length > 0 && (
            <div className="chart-section">
              <div className="chart-header">
                <h2>Rank Distribution</h2>
                <div className="chart-toggle">
                  <button 
                    className={`chart-toggle-button ${chartType === 'pie' ? 'active' : ''}`}
                    onClick={() => setChartType('pie')}
                  >
                    <FaChartPie /> Pie Chart
                  </button>
                  <button 
                    className={`chart-toggle-button ${chartType === 'bar' ? 'active' : ''}`}
                    onClick={() => setChartType('bar')}
                  >
                    <FaChartBar /> Bar Chart
                  </button>
                </div>
              </div>
              
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  {chartType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        animationDuration={1000}
                        animationBegin={0}
                      >
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            stroke="#282c34"
                            strokeWidth={1}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ paddingLeft: "20px" }}
                      />
                    </PieChart>
                  ) : (
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        name="Members" 
                        animationDuration={1000}
                        animationBegin={0}
                      >
                        {chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="chart-summary">
                <h3>Summary</h3>
                <div className="summary-grid">
                  {chartData.slice(0, 4).map((item, index) => (
                    <div className="summary-item" key={index}>
                      <div className="summary-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div className="summary-text">
                        <span className="summary-label">{item.name}</span>
                        <span className="summary-value">{item.value} members</span>
                        <span className="summary-percentage">
                          {((item.value / filteredMembers.length) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="members-footer">
        <p>
          {filteredMembers.length > 0 
            ? `Showing ${filteredMembers.length} out of ${totalMembers} total members`
            : 'No members found matching your criteria'
          }
        </p>
        <p className="last-updated">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MembersList;