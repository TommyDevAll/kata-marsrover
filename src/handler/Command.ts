import { Command } from '../model/Command';
import { RobotState, RobotStateHandler, RobotStateId } from '../state/RobotState';

import { back, front, left, right } from './Movement';

export const idle: RobotStateHandler = (state: RobotState) => state.to(RobotStateId.IDLE);

export const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const handleCommand: RobotStateHandler = (state: RobotState) => {
  const handler = commandHandlers.get(state.props.command);
  return handler ? handler(state) : state;
};

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, left],
  [Command.RIGHT, right],
  [Command.FORWARD, front],
  [Command.BACKWARD, back],
]);
