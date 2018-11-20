import { RobotState, RobotStateHandler } from '../state/RobotState';

export const sameIdentifier = (handlers: RobotStateHandler[]) => (state: RobotState) => {
  let temporaryState: RobotState = state.update({});
  handlers.every(handler => {
    const condition = temporaryState.identifier;
    temporaryState = handler(temporaryState);
    return condition === temporaryState.identifier;
  });
  return temporaryState;
};
