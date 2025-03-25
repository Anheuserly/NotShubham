import React from 'react';
import '../../styles/SeamlessGate/Discord.css';

function Discord() {
  return (
    <div className="discord-container">
      <h2>Join Our Discord Community</h2>
      <p>Connect with members, stay updated, and participate in events.</p>
      
      {/* Discord Invite Link */}
      <a href="https://discord.gg/M9bQMg4EuJ" target="_blank" rel="noopener noreferrer" className="discord-button">
        Join Discord
      </a>

      {/* Optional: Discord Widget Embed */}
      <iframe
        src="https://discord.com/widget?id=YOUR_SERVER_ID&theme=dark"
        width="350"
        height="500"
        allowTransparency="true"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="discord-widget"
      ></iframe>
    </div>
  );
}

export default Discord;
