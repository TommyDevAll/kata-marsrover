import { Command } from '../model/Command';
import { Condition } from '../model/Condition';
import { Coordinates } from '../model/Coordinates';
import { Direction } from '../model/Direction';
import { State } from './State';

export interface RobotStateProperties {
  readonly coordinates: Coordinates;
  readonly target: Coordinates;
  readonly direction: Direction;
  readonly condition: Condition;
  readonly command: Command;
}

export type RobotState = State<RobotStateProperties>;
