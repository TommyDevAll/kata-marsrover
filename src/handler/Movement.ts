import { Command } from '../model/Command';
import { Condition } from '../model/Condition';
import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';
import { nothing } from './Command';

const back: RobotStateHandler = (state: RobotState) => {
  return state.update({
    target: state.props.direction.back(state.props.coordinates),
    condition: Condition.MOVING,
  });
};

const front: RobotStateHandler = (state: RobotState) => {
  return state.update({
    target: state.props.direction.front(state.props.coordinates),
    condition: Condition.MOVING,
  });
};

const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() });
};

const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() });
};

const movementHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, left],
  [Command.RIGHT, right],
  [Command.FORWARD, front],
  [Command.BACKWARD, back],
]);

export const handleMovement: RobotStateHandler = (state: RobotState) =>
  (movementHandlers.get(state.props.command) || nothing)(state);

export const resetCommand: RobotStateHandler = (state: RobotState) => state.update({ command: Command.NONE });

export const completeMovement: RobotStateHandler = (state: RobotState) => {
  return state.update({ coordinates: state.props.target, condition: Condition.IDLE });
};
