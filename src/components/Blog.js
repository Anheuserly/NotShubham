// src/components/Blog.js
import React from 'react';
import '../styles/Blog.css'; // Importing the CSS file for styling

function Blog() {
  return (
    <section className="blog">
      <div className="container">
        <h2 className="section-title">Latest Blog Posts</h2>
        
        <div className="blog-posts">
          <div className="blog-post">
            <div className="blog-post-image"></div>
            <h3 className="blog-post-title">Article Title</h3>
            <p className="blog-post-excerpt">
              Excerpt from the article to entice the reader to click and read more...
            </p>
            <a href="/blog" className="read-more">Read More</a>
          </div>
          {/* Repeat for other blog posts */}
        </div>
      </div>
    </section>
  );
}

export default Blog;
