import { Identifiable, StateHandler } from '../state/State';

export const sameIdentifier = <T, S extends Identifiable>(handlers: Array<StateHandler<S>>) => (state: S) => {
  let temporaryState: S = state;
  handlers.every(handler => {
    const condition = temporaryState.identifier;
    temporaryState = handler(temporaryState);
    return condition === temporaryState.identifier;
  });
  return temporaryState;
};
