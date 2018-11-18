import { Coordinates } from './Coordinates';
import { Direction } from './Direction';

export class State {
  // noinspection TsLint
  constructor(
    readonly coordinates: Coordinates,
    readonly target: Coordinates,
    readonly direction: Direction,
    readonly condition: Condition,
  ) {
  }
}

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
