import { RobotState } from '../RobotState';
import { State, StateHandler } from './State';

export class StateMachine<S extends State<any, any>> {
  constructor(
    private handlers: Map<S['identifier'], StateHandler<S>>,
    private onLeave: Map<S['identifier'], StateHandler<S>>,
  ) {}

  next(state: RobotState): RobotState {
    const handler = this.handlers.get(state.identifier);
    const nextState = handler ? handler(state) : state;
    return nextState.identifier === state.identifier
      ? nextState
      : this.next(this.nextStateAfterLeave(state, nextState));
  }

  private nextStateAfterLeave(state: RobotState, nextState: RobotState) {
    const onLeaveHandler = this.onLeave.get(state.identifier);
    return onLeaveHandler ? onLeaveHandler(nextState) : nextState;
  }
}

export class StateMachineBuilder<S extends State<any, any>> {
  private onEntry: Map<S['identifier'], StateHandler<S>> = new Map<S['identifier'], StateHandler<S>>();
  private onLeave: Map<S['identifier'], StateHandler<S>> = new Map<S['identifier'], StateHandler<S>>();

  with(identifier: S['identifier'], onEntry: StateHandler<S>, onLeave?: StateHandler<S>) {
    this.onEntry.set(identifier, onEntry);
    if (onLeave) {
      this.onLeave.set(identifier, onLeave);
    }
    return this;
  }

  build() {
    return new StateMachine<S>(this.onEntry, this.onLeave);
  }
}
