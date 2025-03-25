import React, { useState, useEffect } from "react";
import "../../styles/SeamlessGate/Unforgettable.css"; // Import the CSS file

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1dkybDWbJtXYajqIfGTsAE7gKCFuitc7Rsv6_hJXNiN8/gviz/tq?tq=SELECT C&gid=1886701442";

const Unforgettable = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GOOGLE_SHEET_URL);
        const text = await response.text();

        // Extract JSON from Google Sheets API response
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        const formattedData = rows.map((row) => ({
          playerName: row.c[0]?.v || "Unknown", // Column C (Player Name)
        }));

        setPlayers(formattedData);
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="unforgettable-container">
      <h2 className="unforgettable-title">🔥 Unforgettable Members</h2>
      <ul className="unforgettable-list">
        {players.length === 0 ? (
          <li className="no-data">No unforgettable members found.</li>
        ) : (
          players.map((entry, index) => <li key={index}>{entry.playerName}</li>)
        )}
      </ul>
    </div>
  );
};

export default Unforgettable;
