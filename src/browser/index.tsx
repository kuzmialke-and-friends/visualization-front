import "./index.css";

/**
 * Frontend code running in browser
 */
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import { FetchState } from "../server/fetch";
import App from "./App";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;

const fetchState = (window as any).__FETCH_STATE__ as FetchState;
delete (window as any).__FETCH_STATE__;
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

hydrate(
  <ConfigContext.Provider value={config}>
    <BrowserRouter basename={basename}>
      <App fetchState={fetchState} />
    </BrowserRouter>
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);
