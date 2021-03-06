import { Command } from './model/Command';
import { Coordinates } from './model/Coordinates';
import { Direction } from './model/Direction';

import { State, StateHandler } from './state/State';

export enum RobotStateId {
  IDLE,
  MOVING_FRONT,
  MOVING_BACK,
  BLOCKED,
  MOVED,
}

export interface RobotStateProperties {
  readonly coordinates: Coordinates;
  readonly direction: Direction;
  readonly command: Command;
}

export type RobotState = State<RobotStateId, RobotStateProperties>;
export type RobotStateHandler = StateHandler<RobotState>;
