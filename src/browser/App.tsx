import "./App.css";

import React from "react";

import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import { useThunkReducer } from "../server/thunk";
import FetchThunkContext from "../components/FetchThunkContext";
import { FetchState } from "../types";

interface AppProps {
  fetchState: FetchState;
}

const App = ({ fetchState }: AppProps) => {
  const fetchThunk = useThunkReducer(fetchState);

  return (
    <div className="app">
      <FetchThunkContext.Provider value={fetchThunk}>
        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </FetchThunkContext.Provider>
    </div>
  );
};
export default App;
