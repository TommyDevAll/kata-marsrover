import { Command } from '../model/Command';
import { RobotStateIdentifier } from '../model/RobotStateIdentifier';
import { Coordinates } from '../model/Coordinates';
import { Direction } from '../model/Direction';

import { State } from './State';

export interface RobotStateProperties {
  readonly coordinates: Coordinates;
  readonly direction: Direction;
  readonly condition: RobotStateIdentifier;
  readonly command: Command;
}

export type RobotState = State<RobotStateIdentifier, RobotStateProperties>;
