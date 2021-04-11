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
  VisualizationType,
} from "../../../types";
import Spinner from "../Spinner";
import { Map } from "./components/Map";
import { Unsupported } from "./components/Unsupported";
import "./Visualization.css";

interface VisualizationProps {
  datasetType: DatasetType;
  dataset?: Dataset<Subject | GhostSubject> | Dataset<JumpSubject> | Dataset<MazeSubject>;
  visualizationConfig?: Record<string, () => JSX.Element>;
}

const dispatchMap = {
  ghost: fetchGhostDaset,
  jump: fetchJumpDaset,
  maze: fetchMazeDaset,
};

interface ButtonProps {
  type: string;
  showVisualization: () => void;
}

const Button = ({ type, showVisualization }: ButtonProps) => (
  <button onClick={showVisualization} key={type}>
    {type}
  </button>
);

const defaultVisualizationConfig = {
  map: Map,
};

export const Visualization = ({
  datasetType,
  dataset,
  visualizationConfig = defaultVisualizationConfig,
}: VisualizationProps) => {
  const [visualizationType, setVisualizationType] = useState<VisualizationType>();

  const VisualizationComponent = visualizationType ? visualizationConfig[visualizationType] : null;
  return (
    <div>
      <p>Visualization for dataset: {datasetType}</p>
      <div className="visualizationMenu">
        {dataset?.supportedVisualizations.map((type) => (
          <Button type={type} key={type} showVisualization={() => setVisualizationType(type)} />
        ))}
      </div>
      {VisualizationComponent ? <VisualizationComponent /> : <Unsupported />}
    </div>
  );
};

interface ThunkedVisualizationProps extends VisualizationProps {
  fetchState: FetchState;
  dispatch: (action: ThunkAction<FetchState>) => void;
  config?: Config;
}

export const VisualizationWithState = ({
  datasetType,
  fetchState: { fetched, isFetching },
  dispatch,
  config,
  ...rest
}: ThunkedVisualizationProps) => {
  const fetchDataset = async (type: DatasetType) => {
    await dispatch(dispatchMap[type](config?.app.BACKEND_URL));
  };

  useEffect(() => {
    const dataset = fetched[datasetType];

    if (!dataset) {
      fetchDataset(datasetType);
    }
  }, [datasetType]);

  return isFetching ? (
    <Spinner prompt="Fetching..." />
  ) : (
    <Visualization datasetType={datasetType} {...rest} dataset={fetched[datasetType]} />
  );
};

export const VisualizationWithContext = ({ datasetType, ...rest }: VisualizationProps) => (
  <ConfigContext.Consumer>
    {(config) => (
      <FetchThunkContext.Consumer>
        {([fetchState, dispatch]) => (
          <VisualizationWithState
            datasetType={datasetType}
            {...rest}
            config={config}
            fetchState={fetchState}
            dispatch={dispatch}
          />
        )}
      </FetchThunkContext.Consumer>
    )}
  </ConfigContext.Consumer>
);
