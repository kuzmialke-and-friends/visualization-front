import React from "react";

import { Link, Switch, Route } from "react-router-dom";
import useConfig from "../../../components/useConfig";
import logo from "../../logo.svg";
import Visualization from "../Visualization";
import ErrorPage from "../ErrorPage";

export const MainPage = () => {
  const { app } = useConfig();
  return (
    <div className="App">
      <Link to="/ghost">Ghost</Link>
      <Link to="/jump">Jump</Link>
      <Link to="/maze">Maze</Link>
      <Switch>
        <Route exact path="/">
          <p>Pick a dataset.</p>
        </Route>
        <Route path="/ghost">
          <Visualization type="ghost" />
        </Route>
        <Route path="/jump">
          <Visualization type="jump" />
        </Route>
        <Route path="/maze">
          <Visualization type="maze" />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
};
