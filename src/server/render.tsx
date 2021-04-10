/**
 * Server Side Rendering
 */
import { APIGatewayEvent } from "aws-lambda";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../browser/App";
import ConfigContext from "../components/ConfigContext";
import config from "./config";
import html from "./html";
import { FetchState, Stats } from "../types";

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

const initialFetchState: FetchState = {
  fetched: {},
};

/**
 * Server-side rendering
 */
export default async function render(event: APIGatewayEvent): Promise<string> {
  let stats: Stats = { main: "index.js", css: "index.css" };
  if (!isLocal) {
    try {
      stats = require("../../dist/stats.json") as Stats;
    } catch (err) {
      throw new Error("`stats.json` not found");
    }
  }

  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <StaticRouter basename={config.app.URL} location={event.path}>
        <App fetchState={initialFetchState} />
      </StaticRouter>
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config, fetchState: initialFetchState });
}
