/**
 * Provide configuration settings
 */
import React from "react";

import { Config } from "../types";

const ConfigContext = React.createContext<Config | undefined>(undefined);

export default ConfigContext;
