import { State, StateHandler } from '../state/State';

export const all = <S extends State<any, any>>(handlers: Array<StateHandler<S>>) => (state: S) => {
  let temporaryState: State<S['identifier'], S['props']> = state;
  handlers.forEach(handler => (temporaryState = handler(temporaryState)));
  return temporaryState;
};
