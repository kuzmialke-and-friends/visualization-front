import "./App.css";

import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import { useThunkReducer } from "../server/thunk";
import FetchThunkContext from "../components/FetchThunkContext";
import { FetchState } from "../types";

interface AppProps {
  fetchState: FetchState;
}

const App = ({ fetchState }: AppProps) => {
  // useEffect(() => {
  //   __WEB__ = true;
  // });
  const fetchThunk = useThunkReducer(fetchState);

  return (
    <FetchThunkContext.Provider value={fetchThunk}>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </FetchThunkContext.Provider>
  );
};
export default App;
