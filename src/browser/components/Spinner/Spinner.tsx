import React from "react";
import { motion } from "framer-motion";
import "./Spinner.css";

interface SpinnerProps {
  prompt: string;
}

const containerStyle = {
  position: "relative",
  width: "3rem",
  height: "3rem",
  boxSizing: "border-box",
};
const spinnerStyle = {
  display: "block",
  width: "3rem",
  heigth: "3rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #3498",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0,
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export const Spinner = ({ prompt }: SpinnerProps) => (
  <div className="Container-style">
    <motion.span className="Spinner-style" animate={{ rotate: 360 }} transition={spinTransition} />
    {prompt}
  </div>
);
