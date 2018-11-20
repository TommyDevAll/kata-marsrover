import { Identifiable, StateHandler } from '../state/State';

export const sameIdentifier = <S extends Identifiable>(handlers: Array<StateHandler<S>>) => (state: S) => {
  let nextState: S = state;
  handlers.every(handler => {
    const identifier = nextState.identifier;
    nextState = handler(nextState);
    return identifier === nextState.identifier;
  });
  return nextState;
};
