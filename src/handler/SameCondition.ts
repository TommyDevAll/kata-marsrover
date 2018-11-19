import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

export const sameCondition = (handlers: RobotStateHandler[]) => (state: RobotState) => {
  let temporaryState: RobotState = state.update({});
  handlers.every(handler => {
    const condition = temporaryState.props.condition;
    temporaryState = handler(temporaryState);
    return condition === temporaryState.props.condition;
  });
  return temporaryState;
};
