import {
  Dataset,
  Subject,
  GhostSubject,
  JumpSubject,
  MazeSubject,
  DatasetType,
  FetchState,
  ThunkAction,
  Config,
} from "../../../types";

export interface VisualizationProps<T = Subject> {
  subjects: Record<string, T>;
  type: DatasetType;
}

export interface DatasetVisualizationProps {
  datasetType: DatasetType;
  dataset: Dataset<Subject | GhostSubject> | Dataset<JumpSubject> | Dataset<MazeSubject>;
  visualizationConfig?: Record<string, (props: VisualizationProps) => JSX.Element>;
}

export type UnfetchedDatasetVisualizationProps = Omit<DatasetVisualizationProps, "dataset">;

export interface DatasetVisualizationWithFetchProps extends UnfetchedDatasetVisualizationProps {
  fetchState: FetchState;
  dispatch: (action: ThunkAction<FetchState>) => void;
  config?: Config;
}
