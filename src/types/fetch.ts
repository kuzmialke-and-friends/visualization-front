import { Dataset, GhostSubject, JumpSubject, MazeSubject, Subject } from "./biraffe";
import { ThunkReducer } from "./thunk";

export interface FetchState {
  fetched: Record<string, Dataset<Subject | GhostSubject | JumpSubject | MazeSubject>>;
  isFetching?: boolean;
}

export type FetchThunk = ThunkReducer<FetchState>;
