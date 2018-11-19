import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

export const chain = (handlers: RobotStateHandler[]) => (state: RobotState) => {
  let temporaryState: RobotState = state.update({});
  handlers.forEach(handler => (temporaryState = handler(temporaryState)));
  return temporaryState;
};
