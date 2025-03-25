import React, { useState, useEffect } from "react";
import "../../styles/SeamlessGate/Auxiliary.css"; // Import the CSS file

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT E,H&gid=1087470156";

const Auxiliary = () => {
  const [auxiliaryList, setAuxiliaryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const text = await response.text();

        // Extract JSON from Google Sheets API response
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const formattedData = rows.map((row) => ({
          auxiliaryName: row.c[0]?.v || "Unknown", // Column E (Name of Auxiliary)
          primaryName: row.c[1]?.v || "No Primary Name Provided", // Column H (Primary Name)
        }));

        setAuxiliaryList(formattedData);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="auxiliary-container">
      <h2 className="auxiliary-title">🔹 Auxiliary Members</h2>
      <div className="auxiliary-table-container">
        <table className="auxiliary-table">
          <thead>
            <tr>
              <th>Name of Auxiliary</th>
              <th>Primary Name</th>
            </tr>
          </thead>
          <tbody>
            {auxiliaryList.length === 0 ? (
              <tr>
                <td colSpan="2" className="no-data">No auxiliary members found.</td>
              </tr>
            ) : (
              auxiliaryList.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.auxiliaryName}</td>
                  <td>{entry.primaryName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Auxiliary;
