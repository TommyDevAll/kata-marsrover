import { Command } from '../model/Command';
import { Coordinates } from '../model/Coordinates';
import { RobotState, RobotStateHandler, RobotStateIdentifier } from '../state/RobotState';

import { chain } from './Chain';
import { nothing } from './Command';

const front: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateIdentifier.MOVING_FRONT);
};

const back: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateIdentifier.MOVING_BACK);
};

const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() });
};

const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() });
};

const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const handleCommand: RobotStateHandler = (state: RobotState) =>
  (commandHandlers.get(state.props.command) || nothing)(state);

export const completeMovement = (toPosition: (state: RobotState) => Coordinates) => (state: RobotState) => {
  return state.update({ coordinates: toPosition(state) }).to(RobotStateIdentifier.IDLE);
};

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, chain([left, resetCommand])],
  [Command.RIGHT, chain([right, resetCommand])],
  [Command.FORWARD, chain([front, resetCommand])],
  [Command.BACKWARD, chain([back, resetCommand])],
]);
