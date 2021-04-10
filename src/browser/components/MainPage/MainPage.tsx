import React from "react";

import { Link, Switch, Route } from "react-router-dom";
import Visualization from "../Visualization";
import ErrorPage from "../ErrorPage";
import "./MainPage.css";

export const MainPage = () => (
  <div className="mainPage">
    <div className="links">
      <Link to="/ghost">Ghost</Link>
      <Link to="/jump">Jump</Link>
      <Link to="/maze">Maze</Link>
    </div>
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
