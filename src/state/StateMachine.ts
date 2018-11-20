import { RobotState } from './RobotState';
import { State, StateHandler } from './State';

export class StateMachine<S extends State<any, any>> {
  constructor(private handlers: Map<S['identifier'], StateHandler<S>>) {}

  next(state: RobotState): RobotState {
    const handler = this.handlers.get(state.identifier);
    const nextState = handler ? handler(state) : state;
    return nextState.identifier === state.identifier ? nextState : this.next(nextState);
  }
}

export class StateMachineBuilder<S extends State<any, any>> {
  private handlers: Map<S['identifier'], StateHandler<S>> = new Map<S['identifier'], StateHandler<S>>();

  with(identifier: S['identifier'], handler: StateHandler<S>) {
    this.handlers.set(identifier, handler);
    return this;
  }

  build() {
    return new StateMachine<S>(this.handlers);
  }
}
