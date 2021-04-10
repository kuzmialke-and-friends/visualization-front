export type ThunkAction<TState> = (
  dispatch: (action: ThunkAction<TState>) => Promise<void>,
  getState: () => Readonly<TState>,
) => Promise<TState | undefined | void> | TState | undefined | void;

export type ThunkReducer<TState> = [TState, (action: ThunkAction<TState>) => Promise<void>];
