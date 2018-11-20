import { Command } from '../model/Command';
import { RobotState, RobotStateHandler } from '../state/RobotState';

import { chain } from './Chain';
import { back, front, left, right } from './Movement';

export const nothing: RobotStateHandler = (state: RobotState) => state;

export const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const handleCommand: RobotStateHandler = (state: RobotState) =>
  (commandHandlers.get(state.props.command) || nothing)(state);

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, chain([left, resetCommand])],
  [Command.RIGHT, chain([right, resetCommand])],
  [Command.FORWARD, chain([front, resetCommand])],
  [Command.BACKWARD, chain([back, resetCommand])],
]);
