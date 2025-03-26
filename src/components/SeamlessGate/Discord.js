import React, { useEffect, useState } from 'react';
import '../../styles/SeamlessGate/Discord.css';

function Discord() {
  const [serverData, setServerData] = useState(null);
  const SERVER_ID = "679041430685220865"; // Replace with your Discord Server ID

  useEffect(() => {
    async function fetchServerData() {
      try {
        const response = await fetch(`https://discord.com/api/v9/guilds/${SERVER_ID}/widget.json`);
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setServerData(data);
      } catch (error) {
        console.error("Error fetching Discord server data:", error);
      }
    }

    fetchServerData();
  }, [SERVER_ID]);

  return (
    <div className="discord-container">
      <div className="discord-content">
        {serverData ? (
          <>
            {/* 🔥 Server Icon */}
            {serverData.icon && (
              <img 
                src={`https://cdn.discordapp.com/icons/${SERVER_ID}/${serverData.icon}.png`} 
                alt="Server Icon" 
                className="discord-server-icon"
              />
            )}
            
            {/* 🎮 Server Name */}
            <h2>{serverData.name}</h2>
            
            {/* 👥 Online Members Count */}
            <p>Online Members: <strong>{serverData.presence_count}</strong></p>
          </>
        ) : (
          <p>Loading server data...</p>
        )}

        {/* 🎮 Discord Invite Button */}
        <a href="https://discord.gg/M9bQMg4EuJ" target="_blank" rel="noopener noreferrer" className="discord-button">
          <span className="discord-icon">🚀</span> Join Discord
        </a>
      </div>

      {/* 🔥 Discord Widget Embed */}
      <div className="discord-widget-container">
        <iframe
          src={`https://discord.com/widget?id=${SERVER_ID}&theme=dark`}
          width="350"
          height="500"
          allowTransparency="true"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          className="discord-widget"
          title="Discord Widget"
        ></iframe>
      </div>
    </div>
  );
}

export default Discord;
