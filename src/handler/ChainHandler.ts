import { RobotState } from '../state/RobotState';

import { RobotStateHandler } from './RobotStateHandler';

export const chainHandlerFactory = (handlers: RobotStateHandler[]) => (state: RobotState) => {
  let temporaryState: RobotState = state.update({});
  handlers.forEach(handler => (temporaryState = handler(temporaryState)));
  return temporaryState;
};
