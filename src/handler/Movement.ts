import { Coordinates } from '../model/Coordinates';
import { RobotState, RobotStateHandler, RobotStateIdentifier } from '../state/RobotState';

export const front: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateIdentifier.MOVING_FRONT);
};

export const back: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateIdentifier.MOVING_BACK);
};

export const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() });
};

export const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() });
};

export const completeMovement = (toPosition: (state: RobotState) => Coordinates) => (state: RobotState) => {
  return state.update({ coordinates: toPosition(state) }).to(RobotStateIdentifier.IDLE);
};
