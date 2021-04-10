import React from "react";

interface SpinnerProps {
  prompt: string;
}

export const Spinner = ({ prompt }: SpinnerProps) => <div>{prompt}</div>;
