import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../../styles/SeamlessGate/MembersList.css";

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT B,E";

const COLORS = ["#FF5733", "#33FF57", "#3375FF", "#F4C542", "#8C33FF", "#FF3385", "#2E86C1", "#D35400"];

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const text = await response.text();

        // Extract JSON from Google Sheets API response
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const formattedData = rows.map(row => ({
          name: row.c[0]?.v || "Unknown", // Column B (Name)
          rank: row.c[1]?.v || "Unknown"  // Column E (Rank)
        }));

        setMembers(formattedData);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchData();
  }, []);

  const rankCounts = members.reduce((acc, member) => {
    acc[member.rank] = (acc[member.rank] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(rankCounts).map(rank => ({
    name: rank,
    value: rankCounts[rank],
  }));

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-container">
      <h2>🔥 Members List</h2>
      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>📊 Rank Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembersList;
