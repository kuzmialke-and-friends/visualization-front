import got, { OptionsOfJSONResponseBody } from "got";
import config from "./config";
import { createThunkReducer, ThunkAction, ThunkReducer } from "./thunk";

type Visualization = "A" | "B" | "C";

interface Subject {
  metadata: {
    personalityType: string;
  };
}

interface Log {
  x: number;
  y: number;
  idOfSound: string;
  timestamp: string;
  timestampOfSound: string;
}

interface GhostLog extends Log {
  deathCount: number;
  money: number;
  health: number;
}

interface GhostSubject extends Subject {
  log: GhostLog[];
}

interface JumpLog extends Log {
  deathCount: number;
}

interface JumpSubject extends Subject {
  log: JumpLog[];
}

interface MazeLog extends Log {
  wasOnCorrectPath: boolean;
}

interface MazeSubject extends Subject {
  log: MazeLog[];
}

interface Response {
  datasets: Record<string, Subject>;
  supportedVisualization: Visualization[];
}

export interface FetchState {
  fetched: Record<string, Response>;
}

const requestOptions: OptionsOfJSONResponseBody = {
  responseType: "json",
  timeout: undefined,
};

const request = got.extend({
  parseJson: (body) => {
    if (body && typeof body === "string") {
      try {
        return JSON.parse(body);
      } catch {
        return body;
      }
    }

    return body;
  },
  retry: 0,
});

const fetchStarted: () => ThunkAction<FetchState> = () => (_, getState) => ({ ...getState(), isFetching: true });

const fetchDataset = <Response>(datasetName: string): ThunkAction<FetchState> => async (dispatch, getState) => {
  await dispatch(fetchStarted());
  const response = await request<Response>(`${config.app.BACKEND_URL}/datasets/${datasetName}`, requestOptions);

  console.log("hey");

  if (response.statusCode !== 200) {
    console.error("");
  }

  return {
    ...getState(),
    isFetching: false,
    dataset: {
      [datasetName]: response.body,
    },
  };
};

export const fetchGhostDaset = fetchDataset<GhostSubject>("ghost");
export const fetchJumpDaset = fetchDataset<JumpSubject>("jump");
export const fetchMazeDaset = fetchDataset<MazeSubject>("maze");

const initialFetchState: FetchState = {
  fetched: {},
};

const [fetchState, dispatch] = createThunkReducer(initialFetchState);

dispatch(fetchGhostDaset);
dispatch(fetchJumpDaset);
dispatch(fetchMazeDaset);
export type FetchThunk = ThunkReducer<FetchState>;

export const getFetchState = () => fetchState;
