import React from "react";

interface UnsupportedProps {
  type?: string;
}

export const Unsupported = ({ type }: UnsupportedProps) => {
  const prompt = type
    ? `Visualization ${type} is not supported.`
    : "There are no supported visualizations for this dataset.";

  return <div> {prompt}</div>;
};
