import { Command } from '../model/Command';
import { RobotState, RobotStateHandler } from '../state/RobotState';

import { all } from './All';
import { back, front, left, right } from './Movement';

export const nothing: RobotStateHandler = (state: RobotState) => state;

export const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const handleCommand: RobotStateHandler = (state: RobotState) =>
  (commandHandlers.get(state.props.command) || nothing)(state);

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, all([left, resetCommand])],
  [Command.RIGHT, all([right, resetCommand])],
  [Command.FORWARD, all([front, resetCommand])],
  [Command.BACKWARD, all([back, resetCommand])],
]);
