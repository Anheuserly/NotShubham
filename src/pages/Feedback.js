// src/pages/Feedback.js
import React, { useState } from 'react';
import Header from '../components/Header';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import '../styles/Feedback.css';

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedbackSubmit = (newFeedback) => {
    // Add the new feedback to the list
    setFeedbackList((prevList) => [...prevList, newFeedback]);
  };

  return (
    <div className="feedback-page">
      <Header />
      <h1>Feedback</h1>
      
      <FeedbackForm onSubmit={handleFeedbackSubmit} />
      
      <FeedbackList feedbackList={feedbackList} />
    </div>
  );
}

export default Feedback;
