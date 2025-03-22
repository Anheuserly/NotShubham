import React from "react";
import "../styles/Clients.css"; // Importing the CSS file

const Clients = () => {
  const clientList = [
    "Adani Connex",
    "L&T Constructions",
    "HSCC (INDIA) LIMITED",
    "Delhi Metro Rail Corporation Pvt. Ltd.",
    "DLF Project Ltd.",
    "Voltas Ltd.",
    "Mahagun (INDIA) Pvt. Ltd.",
    "V3S Infratech",
    "Apparel Export Promotion Council (Ministry of Textile)",
    "Blue Bells Group of Schools, Gurgaon",
    "Indian Express Group",
    "Hydra Power Station, Obra, Sonebhadra U.P.",
    "SNM Hospital, Leh, Ladakh, Jammu & Kashmir",
    "Sir Ganga Ram Hospital",
    "NBCC",
    "Air Force Station Tughlakabad",
  ];

  return (
    <div className="clients-container">
      <h1>Our Clients</h1>
      <ul className="clients-list">
        {clientList.map((client, index) => (
          <li className="client-item" key={index}>
            {client}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
