import React, { useEffect, useRef } from 'react';
import { FaDiscord, FaUsers, FaRocket, FaGamepad, FaMicrophone, FaHeadset, FaServer } from 'react-icons/fa';
import { RiChatVoiceFill } from 'react-icons/ri';
import '../../styles/SeamlessGate/Discord.css';

function Discord() {
  const discordRef = useRef(null);
  const SERVER_ID = "679041430685220865";
  const INVITE_LINK = "https://discord.gg/M9bQMg4EuJ";
  
  // Server information (static fallback)
  const serverInfo = {
    name: "Seamless Gate Community",
    memberCount: "1,000+",
    icon: null, // Set to null if you don't have a direct URL
    channels: 10
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          discordRef.current.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (discordRef.current) {
      observer.observe(discordRef.current);
    }

    return () => {
      if (discordRef.current) {
        observer.unobserve(discordRef.current);
      }
    };
  }, []);

  return (
    <section className="discord-section" ref={discordRef}>
      <div className="discord-background">
        <div className="discord-bg-shape shape1"></div>
        <div className="discord-bg-shape shape2"></div>
        <div className="discord-bg-shape shape3"></div>
      </div>
      
      <div className="discord-container">
        <div className="discord-header">
          <FaDiscord className="discord-logo-icon" />
          <h2 className="discord-title">Join Our Community</h2>
          <p className="discord-subtitle">
            Connect with fellow members, participate in voice chats, and stay updated with the latest news
          </p>
        </div>
        
        <div className="discord-content-wrapper">
          <div className="discord-content">
            <div className="discord-server-info">
              <div className="discord-server-header">
                {serverInfo.icon ? (
                  <img
                    src={serverInfo.icon}
                    alt="Server Icon"
                    className="discord-server-icon"
                  />
                ) : (
                  <div className="discord-server-icon-placeholder">
                    <FaServer />
                  </div>
                )}
                
                <div className="discord-server-details">
                  <h3 className="discord-server-name">{serverInfo.name}</h3>
                  <div className="discord-server-status">
                    <span className="status-indicator"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              
              <div className="discord-stats">
                <div className="discord-stat">
                  <FaUsers className="discord-stat-icon" />
                  <div className="discord-stat-content">
                    <span className="discord-stat-label">Members</span>
                    <div className="discord-stat-value member-count-animated">
                      {serverInfo.memberCount}
                    </div>
                  </div>
                </div>
                
                <div className="discord-stat">
                  <RiChatVoiceFill className="discord-stat-icon" />
                  <div className="discord-stat-content">
                    <span className="discord-stat-label">Voice Channels</span>
                    <div className="discord-stat-value">
                      {serverInfo.channels}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="discord-features">
                <div className="discord-feature">
                  <FaGamepad className="discord-feature-icon" />
                  <span>Game Coordination</span>
                </div>
                <div className="discord-feature">
                  <FaMicrophone className="discord-feature-icon" />
                  <span>Voice Chat</span>
                </div>
                <div className="discord-feature">
                  <FaHeadset className="discord-feature-icon" />
                  <span>Community Support</span>
                </div>
              </div>
              
              <a 
                href={INVITE_LINK}
                target="_blank" 
                rel="noopener noreferrer" 
                className="discord-join-button"
              >
                <FaRocket className="discord-button-icon" />
                <span>Join Discord Server</span>
              </a>
            </div>
          </div>
          
          <div className="discord-widget-container">
            <div className="discord-widget-header">
              <h3>Live Preview</h3>
              <span className="discord-widget-badge">REAL-TIME</span>
            </div>
            
            <div className="discord-widget-wrapper">
              <iframe
                src={`https://discord.com/widget?id=${SERVER_ID}&theme=dark`}
                width="100%"
                height="100%"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="discord-widget"
                title="Discord Widget"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="discord-footer">
          <p>
            Having trouble connecting? <a href={INVITE_LINK} target="_blank" rel="noopener noreferrer">Click here for a direct invite link</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Discord;