
import { useNavigate } from 'react-router-dom';
import './NotShubham.css';

function NotShubham() {
  const navigate = useNavigate();

  return (
    <div className="notshubham-page">
      {/* Header Section */}
      <header className="notshubham-header">
        <div className="logo">NotShubham</div>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </header>

      {/* Hero Section */}
      <section className="notshubham-hero">
        <h1>Welcome to NotShubham</h1>
        <p>This is the custom hero section for NotShubham</p>
        <button>Learn More</button>
      </section>

      {/* Main Content */}
      <main className="notshubham-content">
        <h2>NotShubham Content</h2>
        <p>This is the main content area for NotShubham.</p>
        {/* Add more content as needed */}
      </main>

      {/* Footer Section */}
      <footer className="notshubham-footer">
        <p>&copy; 2023 NotShubham. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default NotShubham;