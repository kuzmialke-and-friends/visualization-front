import { useContext } from "react";

import { Config } from "../types";
import ConfigContext from "./ConfigContext";

/**
 * Hook to read application configuration settings
 */
export default function useConfig(): Config {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error("Configuration context not initialized!");
  }
  return config;
}
