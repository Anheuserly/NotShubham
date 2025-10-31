import "../styles/Footer.css";  
import { 
  FaGithub, FaLinkedin, FaTwitter, 
  FaYoutube, FaInstagram, FaFacebook, FaDiscord 
} from "react-icons/fa";

function Footer() {
  const options = [
    { id: 1, title: "NotShubham", path: "/notshubham", isExternal: false },
    { id: 2, title: "Arcelevenarchitect", path: "https://arcelevenarchitect.com", isExternal: true },
    { id: 3, title: "SGE", path: "https://sge.org.in", isExternal: true },
    { id: 4, title: "Coachanilsaini", path: "/coachanilsaini", isExternal: false },
    { id: 5, title: "Amcsge", path: "/amcsge", isExternal: false },
    { id: 6, title: "DrNath", path: "/drnath", isExternal: false },
    { id: 7, title: "Seamless Gate", path: "/seamlessgate", isExternal: false },
    { id: 8, title: "Hall Of Malovelance", path: "/hallofmalovelance", isExternal: false },
    { id: 9, title: "Nightmare Empire", path: "/nightmareempire", isExternal: false },
    { id: 10, title: "Vera AI", path: "/veraai", isExternal: false },
  ];

  const socials = {
    github: "https://github.com/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourprofile",
    facebook: "https://facebook.com/yourprofile",
    youtube: [
      "https://youtube.com/@first_channel",
      "https://youtube.com/@second_channel",
      "https://youtube.com/@third_channel",
    ],
    instagram: [
      "https://instagram.com/first_account",
      "https://instagram.com/second_account",
      "https://instagram.com/third_account",
    ],
    discord: [
      "https://discord.gg/first_invite",
      "https://discord.gg/second_invite",
      "https://discord.gg/third_invite",
    ],
  };

  const handleClick = (option) => {
    if (option.isExternal) {
      window.open(option.path, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = option.path;
    }
  };

  return (
    <footer className="footer">
      {/* Page links */}
      <div className="footer-links">
        {options.map((option) => (
          <button 
            key={option.id} 
            className="footer-btn" 
            onClick={() => handleClick(option)}
          >
            {option.title}
          </button>
        ))}
      </div>

      {/* Social icons */}
      <div className="footer-socials">
        <a href={socials.github} target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href={socials.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
        <a href={socials.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href={socials.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>

        {socials.youtube.map((yt, index) => (
          <a key={index} href={yt} target="_blank" rel="noreferrer"><FaYoutube /></a>
        ))}

        {socials.instagram.map((ig, index) => (
          <a key={index} href={ig} target="_blank" rel="noreferrer"><FaInstagram /></a>
        ))}

        {socials.discord.map((dc, index) => (
          <a key={index} href={dc} target="_blank" rel="noreferrer"><FaDiscord /></a>
        ))}
      </div>

      {/* Info */}
      <p className="footer-info">Made with ❤️ by Shubham | Connect Everywhere!</p>
      <p className="footer-copy">© {new Date().getFullYear()} MyProfile. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
