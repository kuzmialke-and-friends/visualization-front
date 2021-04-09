import { useCallback, useRef, useState } from "react";

export type ThunkAction<TState> = (
  dispatch: (action: ThunkAction<TState>) => Promise<void>,
  getState: () => Readonly<TState>,
) => Promise<TState | undefined | void> | TState | undefined | void;

export type ThunkReducer<TState> = [TState, (action: ThunkAction<TState>) => Promise<void>];
export const useThunkReducer = <TState>(initialState: TState): ThunkReducer<TState> => {
  const [state, setState] = useState(initialState);

  const stateRef = useRef(state);
  const dispatch = useCallback(async (action: ThunkAction<TState>) => {
    try {
      const nextState = await action(dispatch, () => stateRef.current);
      if (typeof nextState !== "undefined") {
        stateRef.current = nextState;
        setState(nextState);
      }
    } catch (error) {
      console.error(`Dispatching action ${action.name} failed`, { error });
      throw error;
    }
  }, []);

  return [state, dispatch];
};

export const createThunkReducer = <TState>(initialState: TState): ThunkReducer<TState> => {
  let state = initialState;
  const dispatch = async (action: ThunkAction<TState>) => {
    try {
      const nextState = await action(dispatch, () => state);
      if (typeof nextState !== "undefined") {
        state = nextState;
      }
    } catch (error) {
      console.error(`Dispatching action ${action.name} failed`, { error });
      throw error;
    }
  };

  return [state, dispatch];
};
