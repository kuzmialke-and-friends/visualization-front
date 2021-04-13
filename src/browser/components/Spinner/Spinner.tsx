import React from "react";
import { motion } from "framer-motion";
import "./Spinner.css";

interface SpinnerProps {
  prompt: string;
}

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

export const Spinner = ({ prompt }: SpinnerProps) => (
  <div className="center-spinner">
    <div className="container">
      <motion.span className="spinner" animate={{ rotate: 360 }} transition={spinTransition} />
    </div>
    <p>{prompt}</p>
  </div>
);
