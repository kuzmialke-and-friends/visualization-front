import React, { useEffect, useState } from "react";
import ConfigContext from "../../../components/ConfigContext";
import FetchThunkContext from "../../../components/FetchThunkContext";
import { fetchGhostDaset, fetchJumpDaset, fetchMazeDaset } from "../../../server/fetch";
import {
  Dataset,
  GhostSubject,
  JumpSubject,
  MazeSubject,
  Subject,
  DatasetType,
  FetchState,
  Config,
  ThunkReducer,
  ThunkAction,
} from "../../../types";
import Spinner from "../Spinner";

interface VisualizationProps {
  type: DatasetType;
  dataset?: Dataset<Subject | GhostSubject> | Dataset<JumpSubject> | Dataset<MazeSubject>;
}

const dispatchMap = {
  ghost: fetchGhostDaset,
  jump: fetchJumpDaset,
  maze: fetchMazeDaset,
};

export const Visualization = ({ type, dataset }: VisualizationProps) => {
  console.log("dataset", dataset);
  return (
    <div>
      <p>Visualization type: {type}</p>
    </div>
  );
};

interface ThunkedVisualizationProps extends VisualizationProps {
  fetchState: FetchState;
  dispatch: (action: ThunkAction<FetchState>) => void;
  config?: Config;
}

export const VisualizationWithState = ({
  type,
  fetchState: { fetched, isFetching },
  dispatch,
  config,
  ...rest
}: ThunkedVisualizationProps) => {
  const fetchDataset = async (type: DatasetType) => {
    await dispatch(dispatchMap[type](config?.app.BACKEND_URL));
  };

  useEffect(() => {
    const dataset = fetched[type];

    if (!dataset) {
      fetchDataset(type);
    }
  }, [type]);

  return isFetching ? (
    <Spinner prompt="Fetching..." />
  ) : (
    <Visualization type={type} {...rest} dataset={fetched[type]} />
  );
};

export const VisualizationWithContext = ({ type, ...rest }: VisualizationProps) => (
  <ConfigContext.Consumer>
    {(config) => (
      <FetchThunkContext.Consumer>
        {([fetchState, dispatch]) => (
          <VisualizationWithState type={type} {...rest} config={config} fetchState={fetchState} dispatch={dispatch} />
        )}
      </FetchThunkContext.Consumer>
    )}
  </ConfigContext.Consumer>
);
