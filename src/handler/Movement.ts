import { Command } from '../model/Command';
import { Condition } from '../model/Condition';
import { Coordinates } from '../model/Coordinates';
import { RobotState } from '../state/RobotState';

import { chain } from './Chain';
import { nothing } from './Command';
import { RobotStateHandler } from './RobotStateHandler';

const front: RobotStateHandler = (state: RobotState) => {
  return state.update({ condition: Condition.MOVING_FRONT });
};

const back: RobotStateHandler = (state: RobotState) => {
  return state.update({ condition: Condition.MOVING_BACK });
};

const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() });
};

const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() });
};

const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const handleMovement: RobotStateHandler = (state: RobotState) =>
  (movementHandlers.get(state.props.command) || nothing)(state);

export const completeMovement = (toPosition: (state: RobotState) => Coordinates) => (state: RobotState) => {
  return state.update({ coordinates: toPosition(state), condition: Condition.IDLE });
};

const movementHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, chain([left, resetCommand])],
  [Command.RIGHT, chain([right, resetCommand])],
  [Command.FORWARD, chain([front, resetCommand])],
  [Command.BACKWARD, chain([back, resetCommand])],
]);
