import { Dataset, FetchState, GhostSubject, JumpSubject, MazeSubject, Subject, ThunkAction } from "../types";

const fetchStarted: () => ThunkAction<FetchState> = () => (_, getState) => ({ ...getState(), isFetching: true });

const fetchDataset = <T extends Subject>(datasetName: string, endpoint?: string): ThunkAction<FetchState> => async (
  dispatch,
  getState,
) => {
  const state = getState();

  if (!endpoint) {
    return state;
  }
  await dispatch(fetchStarted());
  const response = await fetch(`${endpoint}/datasets/${datasetName}?limit=103`);

  try {
    return {
      ...state,
      isFetching: false,
      fetched: {
        ...state.fetched,
        [datasetName]: ((await response.json()) as unknown) as Dataset<T>,
      },
    };
  } catch (error) {
    console.error("failed to parse", error);
    return { ...state };
  }
};

export const fetchGhostDaset = (endpoint?: string) => fetchDataset<GhostSubject>("ghost", endpoint);
export const fetchJumpDaset = (endpoint?: string) => fetchDataset<JumpSubject>("jump", endpoint);
export const fetchMazeDaset = (endpoint?: string) => fetchDataset<MazeSubject>("maze", endpoint);
