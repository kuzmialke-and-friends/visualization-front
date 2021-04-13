import React from "react";
import "./Button.css";

interface ButtonProps {
  type: string;
  showVisualization: () => void;
}

export const Button = ({ type, showVisualization }: ButtonProps) => (
  <button onClick={showVisualization} key={type}>
    {type}
  </button>
);
