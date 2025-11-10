import React from "react";
import "./PixelButton.css";

export default function PixelButton({ text, onClick }) {
  return (
    <button className="pixel-button" onClick={onClick}>
      {text}
    </button>
  );
}
