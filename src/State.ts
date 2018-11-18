import { Coordinates } from './Coordinates';
import { Direction } from './Direction';

interface StateProps {
  readonly coordinates: Coordinates;
  readonly target: Coordinates;
  readonly direction: Direction;
  readonly condition: Condition;
}

export class State {
  constructor(readonly props: StateProps) {}

  update(props: Partial<StateProps>): State {
    return new State({ ...this.props, ...props });
  }
}

export type StateHandler = (state: State) => State;

export enum Condition {
  IDLE,
  MOVING,
  BLOCKED,
}

export enum Commands {
  NONE,
  LEFT,
  RIGHT,
  FORWARD,
  BACKWARD,
}
