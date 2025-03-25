import React, { useState, useEffect } from "react";
import "../../styles/SeamlessGate/Blacklisted.css"; // Import the CSS file

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT B,E&gid=503985100";

const Blacklisted = () => {
  const [blacklist, setBlacklist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const text = await response.text();

        // Extract JSON from Google Sheets API response
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const formattedData = rows.map((row) => ({
          account: row.c[0]?.v || "Unknown", // Column B (Account Name)
          reason: row.c[1]?.v || "No Reason Provided", // Column E (Reason)
        }));

        setBlacklist(formattedData);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blacklist-container">
      <h2 className="blacklist-title">🚨 Blacklisted Members</h2>
      <div className="blacklist-table-container">
        <table className="blacklist-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {blacklist.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-data">No blacklisted members found.</td>
              </tr>
            ) : (
              blacklist.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.account}</td>
                  <td>{entry.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blacklisted;
