import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./FlipCard.css";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleScreen = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card-container">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* Front: Login */}
        <Login toggleScreen={toggleScreen} />
        {/* Back: Register */}
        <Register toggleScreen={toggleScreen} />
      </div>
    </div>
  );
};

export default FlipCard;
