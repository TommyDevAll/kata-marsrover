import { State, StateHandler } from './State';

export const all = <S extends State<any, any>>(handlers: Array<StateHandler<State<S['identifier'], S['props']>>>) => (
  state: State<S['identifier'], S['props']>,
) => {
  let nextState: State<S['identifier'], S['props']> = state;
  handlers.every(handler => {
    const identifier = nextState.identifier;
    nextState = handler(nextState);
    return identifier === nextState.identifier;
  });
  return nextState;
};
