import { Command } from '../model/Command';
import { Condition } from '../model/Condition';
import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

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

const nothing: RobotStateHandler = (state: RobotState) => state;

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, left],
  [Command.RIGHT, right],
  [Command.FORWARD, front],
  [Command.BACKWARD, back],
]);

export const handleMovement: RobotStateHandler = (state: RobotState) =>
  (commandHandlers.get(state.props.command) || nothing)(state);

export const completeMovement: RobotStateHandler = (state: RobotState) => {
  if (state.props.condition === Condition.MOVING) {
    return state.update({ coordinates: state.props.target });
  }
  return state;
};
