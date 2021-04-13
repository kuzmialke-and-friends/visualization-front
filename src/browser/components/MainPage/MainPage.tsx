import React from "react";

import { Link, Switch, Route } from "react-router-dom";
import Visualization from "../Visualization";
import ErrorPage from "../ErrorPage";
import { Sidebar } from "../Sidebar/Sidebar";
import "./MainPage.css";

export const MainPage = () => (
  <div className="main-page">
    <div className="main-nav-menu">
      <Link to="/ghost">Ghost</Link>
      <Link to="/jump">Jump</Link>
      <Link to="/maze">Maze</Link>
    </div>
    <div className="row-columns">
      <Switch>
        <Route exact path="/">
          <p>Pick a dataset.</p>
        </Route>
        <Route path="/ghost">
          <Visualization datasetType="ghost" />
        </Route>
        <Route path="/jump">
          <Visualization datasetType="jump" />
        </Route>
        <Route path="/maze">
          <Visualization datasetType="maze" />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Sidebar />
    </div>
  </div>
);
