// src/components/Dashboard/AnalyticsDashboard.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { databases } from "../../lib/appwrite";
import { Query } from "appwrite";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const COLLECTIONS = {
  SERVICE_REQUESTS: process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID,
  CLIENTS: process.env.NEXT_PUBLIC_APPWRITE_CLIENTS_COLLECTION_ID,
  CONTACTS: process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID,
  FEED: process.env.NEXT_PUBLIC_APPWRITE_FEED_COLLECTION_ID,
  VENDORSHOWCASE: process.env.NEXT_PUBLIC_APPWRITE_VENDORSHOWCASE_COLLECTION_ID,
};

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    monthlyRequests: [],
    serviceTypeDistribution: [],
    statusDistribution: [],
    clientGrowth: [],
    revenueData: [],
    geographicDistribution: [],
    performanceMetrics: {},
    peakHours: [],
    vendorPerformance: []
  });
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState("requests");
  const dashboardRef = useRef();

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const processTimeSeriesData = (documents, dateField = '$createdAt') => {
    const now = new Date();
    let startDate;
    
    switch(timeRange) {
      case "week":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "quarter":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    }
    
    const filteredDocs = documents.filter(doc => {
      const docDate = new Date(doc[dateField]);
      return docDate >= startDate;
    });
    
    // Group by day/week/month based on time range
    const groupedData = {};
    filteredDocs.forEach(doc => {
      const docDate = new Date(doc[dateField]);
      let key;
      
      if (timeRange === "week") {
        key = docDate.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (timeRange === "month" || timeRange === "quarter") {
        key = docDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        key = docDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
      
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key] += 1;
    });
    
    return Object.entries(groupedData).map(([date, count]) => ({ date, count }));
  };

  const fetchAnalyticsData = async () => {
    try {
      // Fetch all data in parallel
      const [
        serviceRes, 
        clientsRes, 
        contactsRes, 
        feedRes, 
        vendorsRes
      ] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.SERVICE_REQUESTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.CLIENTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.CONTACTS),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.FEED),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.VENDORSHOWCASE)
      ]);

      // Process data for advanced analytics
      const serviceTypeCount = {};
      const statusCount = {};
      const geographicData = {};
      const hourDistribution = Array(24).fill(0);
      const vendorPerformance = {};
      
      // Process service requests
      serviceRes.documents.forEach(doc => {
        // Service type distribution
        serviceTypeCount[doc.serviceType] = (serviceTypeCount[doc.serviceType] || 0) + 1;
        
        // Status distribution
        statusCount[doc.status] = (statusCount[doc.status] || 0) + 1;
        
        // Geographic distribution
        if (doc.city) {
          geographicData[doc.city] = (geographicData[doc.city] || 0) + 1;
        }
        
        // Hour distribution
        const hour = new Date(doc.$createdAt).getHours();
        hourDistribution[hour] += 1;
        
        // Vendor performance (if applicable)
        if (doc.assignedProvider) {
          vendorPerformance[doc.assignedProvider] = vendorPerformance[doc.assignedProvider] || { completed: 0, total: 0 };
          vendorPerformance[doc.assignedProvider].total += 1;
          if (doc.status === 'completed') {
            vendorPerformance[doc.assignedProvider].completed += 1;
          }
        }
      });

      // Process clients for growth data
      const clientGrowthData = processTimeSeriesData(clientsRes.documents);
      
      // Calculate performance metrics
      const totalRequests = serviceRes.total;
      const completedRequests = statusCount.completed || 0;
      const completionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;
      
      // Calculate average resolution time (simulated data)
      const avgResolutionTime = totalRequests > 0 
        ? Math.floor(Math.random() * 48) + 12 // Simulated hours
        : 0;

      setAnalyticsData({
        monthlyRequests: processTimeSeriesData(serviceRes.documents),
        serviceTypeDistribution: Object.entries(serviceTypeCount).map(([type, count]) => ({ type, count })),
        statusDistribution: Object.entries(statusCount).map(([status, count]) => ({ status, count })),
        clientGrowth: clientGrowthData,
        revenueData: processTimeSeriesData(serviceRes.documents).map(item => ({
          date: item.date,
          amount: item.count * (Math.random() * 100 + 50) // Simulated revenue
        })),
        geographicDistribution: Object.entries(geographicData)
          .map(([location, count]) => ({ location, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10), // Top 10 locations
        performanceMetrics: {
          completionRate,
          avgResolutionTime,
          customerSatisfaction: Math.floor(Math.random() * 20) + 80, // Simulated satisfaction score
          responseTime: Math.floor(Math.random() * 5) + 1 // Simulated hours
        },
        peakHours: hourDistribution.map((count, hour) => ({ hour: `${hour}:00`, count })),
        vendorPerformance: Object.entries(vendorPerformance)
          .map(([vendor, data]) => ({
            vendor,
            completionRate: data.total > 0 ? (data.completed / data.total) * 100 : 0,
            total: data.total
          }))
          .sort((a, b) => b.completionRate - a.completionRate)
      });

    } catch (err) {
      console.error("Error fetching analytics data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle print functionality
  const handlePrint = () => {
    const printContent = dashboardRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="text-align: center; margin-bottom: 30px;">Analytics Dashboard Report</h1>
        ${printContent}
      </div>
    `;
    
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

 // Handle export functionality - CSV format
const handleExport = () => {
  // Prepare data for CSV export
  let csvContent = "";
  
  // Add performance metrics
  csvContent += "Performance Metrics\n";
  csvContent += `Completion Rate,${analyticsData.performanceMetrics.completionRate.toFixed(1)}%\n`;
  csvContent += `Average Resolution Time,${analyticsData.performanceMetrics.avgResolutionTime}h\n`;
  csvContent += `Customer Satisfaction,${analyticsData.performanceMetrics.customerSatisfaction}%\n`;
  csvContent += `Average Response Time,${analyticsData.performanceMetrics.responseTime}h\n\n`;
  
  // Add service requests data
  csvContent += "Service Requests Trend\n";
  csvContent += "Date,Request Count\n";
  analyticsData.monthlyRequests.forEach(item => {
    csvContent += `${item.date},${item.count}\n`;
  });
  csvContent += "\n";
  
  // Add revenue data
  csvContent += "Revenue Data\n";
  csvContent += "Date,Revenue\n";
  analyticsData.revenueData.forEach(item => {
    csvContent += `${item.date},${item.amount.toFixed(2)}\n`;
  });
  csvContent += "\n";
  
  // Add service type distribution
  csvContent += "Service Type Distribution\n";
  csvContent += "Service Type,Count\n";
  analyticsData.serviceTypeDistribution.forEach(item => {
    csvContent += `${item.type},${item.count}\n`;
  });
  csvContent += "\n";
  
  // Add status distribution
  csvContent += "Status Distribution\n";
  csvContent += "Status,Count\n";
  analyticsData.statusDistribution.forEach(item => {
    csvContent += `${item.status},${item.count}\n`;
  });
  csvContent += "\n";
  
  // Add vendor performance
  csvContent += "Vendor Performance\n";
  csvContent += "Vendor,Total Requests,Completion Rate\n";
  analyticsData.vendorPerformance.forEach(item => {
    csvContent += `${item.vendor},${item.total},${item.completionRate.toFixed(1)}%\n`;
  });
  
  // Create download link with proper encoding
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `analytics_dashboard_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  // Chart configurations
  const requestsChartData = {
    labels: analyticsData.monthlyRequests.map(item => item.date),
    datasets: [
      {
        label: 'Service Requests',
        data: analyticsData.monthlyRequests.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartData = {
    labels: analyticsData.revenueData.map(item => item.date),
    datasets: [
      {
        label: 'Revenue ($)',
        data: analyticsData.revenueData.map(item => item.amount.toFixed(2)),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const serviceTypeChartData = {
    labels: analyticsData.serviceTypeDistribution.map(item => item.type),
    datasets: [
      {
        label: 'Requests by Type',
        data: analyticsData.serviceTypeDistribution.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: analyticsData.statusDistribution.map(item => item.status),
    datasets: [
      {
        label: 'Requests by Status',
        data: analyticsData.statusDistribution.map(item => item.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // pending - blue
          'rgba(16, 185, 129, 0.8)', // completed - green
          'rgba(245, 158, 11, 0.8)', // in progress - yellow
          'rgba(239, 68, 68, 0.8)', // cancelled - red
        ],
        borderWidth: 1,
      },
    ],
  };

  const peakHoursChartData = {
    labels: analyticsData.peakHours.map(item => item.hour),
    datasets: [
      {
        label: 'Requests by Hour',
        data: analyticsData.peakHours.map(item => item.count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={dashboardRef}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Advanced Analytics Dashboard</h1>
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            onClick={fetchAnalyticsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Completion Rate</h3>
          <p className="text-2xl font-bold text-blue-600">{analyticsData.performanceMetrics.completionRate.toFixed(1)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${analyticsData.performanceMetrics.completionRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Avg. Resolution</h3>
          <p className="text-2xl font-bold text-green-600">{analyticsData.performanceMetrics.avgResolutionTime}h</p>
          <p className="text-xs text-gray-500 mt-1">Time to complete requests</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Satisfaction</h3>
          <p className="text-2xl font-bold text-yellow-600">{analyticsData.performanceMetrics.customerSatisfaction}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${analyticsData.performanceMetrics.customerSatisfaction}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600">Avg. Response</h3>
          <p className="text-2xl font-bold text-purple-600">{analyticsData.performanceMetrics.responseTime}h</p>
          <p className="text-xs text-gray-500 mt-1">Initial response time</p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Service Requests Trend</h3>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 text-xs rounded ${activeMetric === 'requests' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setActiveMetric('requests')}
              >
                Requests
              </button>
              <button 
                className={`px-3 py-1 text-xs rounded ${activeMetric === 'revenue' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setActiveMetric('revenue')}
              >
                Revenue
              </button>
            </div>
          </div>
          <div className="h-80">
            {activeMetric === 'requests' ? (
              <Line data={requestsChartData} options={chartOptions} />
            ) : (
              <Line data={revenueChartData} options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    beginAtZero: true,
                    grid: {
                      drawBorder: false,
                    },
                    ticks: {
                      callback: function(value) {
                        return '$' + value;
                      }
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                }
              }} />
            )}
          </div>
        </div>

        {/* Service Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Service Type Distribution</h3>
          <div className="h-80">
            <Doughnut data={serviceTypeChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Request Status</h3>
          <div className="h-64">
            <PolarArea data={statusChartData} options={doughnutOptions} />
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Peak Request Hours</h3>
          <div className="h-64">
            <Bar data={peakHoursChartData} options={chartOptions} />
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Locations</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analyticsData.geographicDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.location}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Vendor Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Requests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.vendorPerformance.map((vendor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.completionRate.toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${vendor.completionRate}%`,
                          backgroundColor: vendor.completionRate >= 80 ? '#10B981' : 
                                         vendor.completionRate >= 60 ? '#F59E0B' : '#EF4444'
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end gap-4">
        <button 
          onClick={handlePrint}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
        >
          Print Report
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          Export Data
        </button>
      </div>
    </div>
  );
}