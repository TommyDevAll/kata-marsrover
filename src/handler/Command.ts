import { Command } from '../model/Command';
import { Condition } from '../model/Condition';
import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

export const discardCommandIfBlocked = (state: RobotState) =>
  state.props.condition === Condition.BLOCKED ? state.update({ command: Command.NONE }) : state;

export const nothing: RobotStateHandler = (state: RobotState) => state;
