import React from "react";
import "../../styles/SeamlessGate/Rules.css"; // Import the CSS file

const rulesData = [
  {
    id: 1,
    title: "Follow all UIF server rules",
    description:
      "It is the duty of all Seamless Gate members to ensure they abide by the rules set out by UIF management. Breaching UIF rules is equivalent to breaching SG rules.",
  },
  {
    id: 2,
    title: "Avoid using hacks",
    description:
      "Seamless Gate is a group that promotes fair gameplay. Hacks, cheats, and/or modifications that give players advantages over others are strictly forbidden.",
  },
  {
    id: 3,
    title: "Cooperate in wars",
    description:
      "Seamless Gate, as mentioned previously, is a deathmatch group. Therefore, full cooperation within wars is an obligation of all group members.",
  },
  {
    id: 4,
    title: "Do not ask for promotions",
    description:
      "Ranks will be assigned to the deserving members as per the observations of the Management of the group.",
  },
  {
    id: 5,
    title: "English first",
    description:
      "In order to maximize interaction between group members, it is a priority for all members to speak in English.",
  },
  {
    id: 6,
    title: "Respect fellow teammates",
    description:
      "Despite levels, SG members are all part of one group. Toleration of each other is a priority.",
  },
  {
    id: 7,
    title: "One account only",
    description: "Multiple accounts in the group are strictly disallowed.",
  },
  {
    id: 8,
    title: "Do not insult opponents",
    description: "Show some decency to opponents in group wars.",
  },
];

function Rules() {
  return (
    <section id="rules" className="rules-container">
      <h2 className="rules-title">📜 Seamless Gate Rules</h2>
      <div className="rules-list">
        {rulesData.map((rule) => (
          <div key={rule.id} className="rule-item">
            <span className="rule-number">{rule.id}.</span>
            <div className="rule-content">
              <h3 className="rule-heading">{rule.title}</h3>
              <p className="rule-description">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Rules;
