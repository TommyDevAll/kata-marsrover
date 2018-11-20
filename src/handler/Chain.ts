import { Identifiable, StateHandler } from '../state/State';

export const chain = <S extends Identifiable>(handlers: Array<StateHandler<S>>) => (state: S) => {
  let temporaryState: S = state;
  handlers.forEach(handler => (temporaryState = handler(temporaryState)));
  return temporaryState;
};
