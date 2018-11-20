import { Coordinates } from '../model/Coordinates';
import { RobotState, RobotStateHandler, RobotStateId } from '../state/RobotState';

export const front: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateId.MOVING_FRONT);
};

export const back: RobotStateHandler = (state: RobotState) => {
  return state.to(RobotStateId.MOVING_BACK);
};

export const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() }).to(RobotStateId.MOVED);
};

export const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() }).to(RobotStateId.MOVED);
};

export const completeMovement = (toPosition: (state: RobotState) => Coordinates) => (state: RobotState) => {
  return state.update({ coordinates: toPosition(state) }).to(RobotStateId.MOVED);
};
