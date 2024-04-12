import React, { useState, useEffect, useRef } from "react";
import "./Card.css";

const Card = ({ image }) => {
  return (
    <div className="Card">
      <img src={image} alt="Card Img" />
    </div>
  );
};

export default Card;
