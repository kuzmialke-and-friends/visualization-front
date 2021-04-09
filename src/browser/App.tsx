import "./App.css";

import React from "react";

import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";

/**
 * Our Web Application
 */
const App = () => (
  <Switch>
    <Route exact path="/">
      <MainPage />
    </Route>
    <Route>
      <ErrorPage />
    </Route>
  </Switch>
);

export default App;
