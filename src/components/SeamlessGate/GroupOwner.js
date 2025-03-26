import React from "react";
import "../../styles/SeamlessGate/GroupOwner.css"; // Import the CSS file

const owners = [
  {
    name: "Rodsmun",
    rank: "Archon",
    description:
      "A true leader with unmatched strategy and skill. Rodsmun’s presence commands respect, and their leadership drives Seamless Gate to new heights.",
    image: "https://via.placeholder.com/120", // Replace with actual image if available
  },
  {
    name: "Avryll",
    rank: "Archon",
    description:
      "The backbone of Seamless Gate, Avryll’s wisdom and decision-making are legendary. Their ability to unite members and lead with fairness makes them an icon.",
    image: "https://via.placeholder.com/120", // Replace with actual image if available
  },
];

function GroupOwner() {
  return (
    <section id="owner" className="owner-container">
      <h2 className="owner-title">👑 Group Owners</h2>
      <p className="owner-subtitle">
        The **pillars of Seamless Gate**, leading with honor and strength.
      </p>
      <div className="owner-list">
        {owners.map((owner, index) => (
          <div key={index} className="owner-card">
            <img src={owner.image} alt={owner.name} className="owner-image" />
            <h3 className="owner-name">{owner.name}</h3>
            <span className="owner-rank">✨ {owner.rank} ✨</span>
            <p className="owner-description">{owner.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GroupOwner;
