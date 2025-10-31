import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const options = [
    { id: 1, title: "NotShubham", path: "/notshubham", isExternal: false },
    { id: 2, title: "Arcelevenarchitect", path: "https://arcelevenarchitect.com", isExternal: true },
    { id: 3, title: "sge", path: "https://sge.org.in", isExternal: true },
    { id: 4, title: "Coachanilsaini", path: "/coachanilsaini", isExternal: false },
    { id: 5, title: "Amcsge", path: "/amcsge", isExternal: false },
    { id: 6, title: "DrNath", path: "/drnath", isExternal: false },
    { id: 7, title: "Seamless Gate", path: "/seamlessgate", isExternal: false },
    { id: 8, title: "Hall Of malovelance", path: "/hallofmalovelance", isExternal: false },
    { id: 9, title: "Nightmare Empire", path: "/nightmareempire", isExternal: false }
  ];

  const handleCardClick = (option) => {
    if (option.isExternal) {
      // Open external URL in a new tab
      window.open(option.path, '_blank', 'noopener,noreferrer');
    } else {
      // Navigate to internal route
      navigate(option.path);
    }
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>Choose an Option</h1>
        <div className="cards-container">
          {options.map(option => (
            <div 
              key={option.id} 
              className="card"
              onClick={() => handleCardClick(option)}
            >
              {option.title}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default Home;