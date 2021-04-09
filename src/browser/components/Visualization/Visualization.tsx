import React from "react";

interface VisualizationProps {
  type: string;
}

export const Visualization = ({ type }: VisualizationProps) => <div>Visualization type: {type}</div>;
