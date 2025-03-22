import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Portfolio.css";

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For now, we'll simulate loading the images and PDFs
    
    // Simulating image loading
    const importAllImages = (r) => {
      return r.keys().map(r);
    };
    
    try {
      // This would need to be replaced with your actual image loading logic
      const imageContext = require.context('../path/image/portfolio', false, /\.(png|jpe?g|svg|webp)$/);
      const loadedImages = importAllImages(imageContext).map(path => ({
        path,
        name: path.replace(/^.*[\\\/]/, '').split('.')[0]
      }));
      setImages(loadedImages);
    } catch (error) {
      console.error("Error loading images:", error);
      // Fallback images for demonstration
      setImages([
        { path: "/portfolio/project1.jpg", name: "Project 1" },
        { path: "/portfolio/project2.jpg", name: "Project 2" },
        { path: "/portfolio/project3.jpg", name: "Project 3" },
        { path: "/portfolio/project4.jpg", name: "Project 4" },
        { path: "/portfolio/project5.jpg", name: "Project 5" },
        { path: "/portfolio/project6.jpg", name: "Project 6" },
      ]);
    }
    
    // Simulating PDF loading
    try {
      // This would need to be replaced with your actual PDF loading logic
      const pdfContext = require.context('../path/pdf', false, /\.pdf$/);
      const loadedPdfs = pdfContext.keys().map(key => ({
        path: pdfContext(key),
        name: key.replace(/^.*[\\\/]/, '').split('.')[0]
      }));
      setPdfs(loadedPdfs);
    } catch (error) {
      console.error("Error loading PDFs:", error);
      // Fallback PDFs for demonstration
      setPdfs([
        { path: "/pdf/portfolio.pdf", name: "Complete Portfolio" },
        { path: "/pdf/residential.pdf", name: "Residential Projects" },
        { path: "/pdf/commercial.pdf", name: "Commercial Projects" },
      ]);
    }
  }, []);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="portfolio-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="portfolio-header"
      >
        <h1>Our Portfolio</h1>
        <p>Explore our architectural projects and designs</p>
      </motion.div>

      <section className="portfolio-section">
        <h2>Project Gallery</h2>
        <div className="portfolio-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="portfolio-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openImageModal(image)}
            >
              <div className="portfolio-image-container">
                <img src={image.path} alt={image.name} />
                <div className="portfolio-overlay">
                  <h3>{image.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="portfolio-documents">
        <h2>Portfolio Documents</h2>
        <div className="pdf-grid">
          {pdfs.map((pdf, index) => (
            <motion.div
              key={index}
              className="pdf-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="pdf-icon">
                <i className="fas fa-file-pdf"></i>
              </div>
              <div className="pdf-details">
                <h3>{pdf.name}</h3>
                <div className="pdf-actions">
                  <a href={pdf.path} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View
                  </a>
                  <a href={pdf.path} download className="download-btn">
                    Download
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={closeImageModal}>&times;</span>
            <img src={selectedImage.path} alt={selectedImage.name} />
            <h3>{selectedImage.name}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;