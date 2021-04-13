import React, { useEffect, useState } from "react";
import ConfigContext from "../../../components/ConfigContext";
import FetchThunkContext from "../../../components/FetchThunkContext";
import { fetchGhostDaset, fetchJumpDaset, fetchMazeDaset } from "../../../server/fetch";
import { DatasetType, VisualizationType } from "../../../types";
import Spinner from "../Spinner";
import { Button } from "./components/Button";
import { Chart } from "./components/Chart";
import { Unsupported } from "./components/Unsupported";
import {
  DatasetVisualizationProps,
  DatasetVisualizationWithFetchProps,
  UnfetchedDatasetVisualizationProps,
} from "./types";
import "./Visualization.css";

const dispatchMap = {
  ghost: fetchGhostDaset,
  jump: fetchJumpDaset,
  maze: fetchMazeDaset,
};

const defaultVisualizationConfig = {
  chart: Chart,
};

export const DatasetVisualization = ({
  datasetType,
  dataset: { supportedVisualizations, subjects },
  visualizationConfig = defaultVisualizationConfig,
}: DatasetVisualizationProps) => {
  const [visualizationType, setVisualizationType] = useState<VisualizationType | undefined>(supportedVisualizations[0]);

  const VisualizationComponent = visualizationType ? visualizationConfig[visualizationType] : null;
  return (
    <>
      <p>Visualization for dataset: {datasetType}</p>
      <div className="visualization-menu">
        {supportedVisualizations.map((type) => (
          <Button type={type} key={type} showVisualization={() => setVisualizationType(type)} />
        ))}
      </div>

      <div className="visualization-box">
        {VisualizationComponent ? (
          <VisualizationComponent subjects={subjects} type={datasetType} />
        ) : (
          <Unsupported type={visualizationType} />
        )}
      </div>
    </>
  );
};

export const DatasetVisualizationWithFetch = ({
  datasetType,
  fetchState: { fetched, isFetching },
  dispatch,
  config,
  ...rest
}: DatasetVisualizationWithFetchProps) => {
  const fetchDataset = async (type: DatasetType) => {
    await dispatch(dispatchMap[type](config?.app.BACKEND_URL));
  };

  useEffect(() => {
    const dataset = fetched[datasetType];

    if (!dataset) {
      fetchDataset(datasetType);
    }
  }, [datasetType]);

  return (
    <div className="visualization-component">
      {isFetching || !fetched[datasetType] ? (
        <Spinner prompt="Fetching..." />
      ) : (
        <DatasetVisualization datasetType={datasetType} {...rest} dataset={fetched[datasetType]} />
      )}
    </div>
  );
};

export const VisualizationWithContext = ({ datasetType, ...rest }: UnfetchedDatasetVisualizationProps) => (
  <ConfigContext.Consumer>
    {(config) => (
      <FetchThunkContext.Consumer>
        {([fetchState, dispatch]) => (
          <DatasetVisualizationWithFetch
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
