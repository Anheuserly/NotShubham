// src/components/FeedbackList.js
import React from 'react';
import '../styles/FeedbackList.css'; // Import the CSS for styling

const FeedbackList = ({ feedbackList }) => {
  return (
    <div className="feedback-list-container">
      <h2>Previous Feedback</h2>
      {feedbackList.length > 0 ? (
        <ul className="feedback-list">
          {feedbackList.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <p><strong>{feedback.name}</strong> ({feedback.email})</p>
              <p>{feedback.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedback yet.</p>
      )}
    </div>
  );
};

export default FeedbackList;
