import React from "react";
import "../styles/HeroContact.css";

function HeroContact() {
  const discordInvite = "https://discord.gg/5hfWCfjxBd"; // Replace with your Discord link

  return (
    <section className="hero-contact">
      {/* Background layers */}
      <div className="hc-glow" aria-hidden="true"></div>
      <div className="hc-noise" aria-hidden="true"></div>

      {/* Main content */}
      <div className="hc-content">
        <h1 className="hc-title">Let’s Connect on Discord 💬</h1>
        <p className="hc-subtitle">
          Whether it’s sharing ideas, collaborating, or just saying hi — I’m always up for a chat.
        </p>

        {/* Discord Button */}
        <a
          href={discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="hc-discord-btn"
        >
          <span className="hc-discord-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M20.317 4.369A17.24 17.24 0 0 0 16.558 3c-.2.36-.43.85-.59 1.23a15.4 15.4 0 0 0-3.936 0c-.16-.38-.39-.87-.59-1.23a17.26 17.26 0 0 0-3.76 1.37C4.51 7.21 3.9 10 4.07 12.75a17.5 17.5 0 0 0 4.2 2.1c.33-.46.63-.95.89-1.47a10.8 10.8 0 0 1-1.4-.67c.12-.09.24-.19.36-.29 2.7 1.26 5.63 1.26 8.31 0 .12.1.24.2.36.29-.45.26-.92.48-1.41.67.26.52.56 1.01.89 1.47a17.6 17.6 0 0 0 4.2-2.1c.22-3.33-.54-6.09-2.85-8.38ZM9.68 12.53c-.82 0-1.49-.75-1.49-1.68 0-.92.66-1.68 1.49-1.68s1.5.75 1.49 1.68c0 .93-.66 1.68-1.49 1.68Zm4.64 0c-.82 0-1.49-.75-1.49-1.68 0-.92.67-1.68 1.49-1.68s1.49.75 1.49 1.68c0 .93-.66 1.68-1.49 1.68Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Join My Discord
        </a>
      </div>
    </section>
  );
}

export default HeroContact;
