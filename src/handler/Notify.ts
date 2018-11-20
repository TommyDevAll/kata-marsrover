import { Direction, EAST, NORTH, SOUTH, WEST } from '../model/Direction';
import { RobotState } from '../state/RobotState';

const directionToString: Map<Direction, string> = new Map<Direction, string>([
  [NORTH, 'N'],
  [EAST, 'E'],
  [WEST, 'W'],
  [SOUTH, 'S'],
]);

const printPosition = (state: RobotState) => {
  const directionString = directionToString.get(state.props.direction) || '-';
  const positionString = `${state.props.coordinates.x}:${state.props.coordinates.y}`;
  return `${positionString}:${directionString}`;
};

export const notifyPosition = (listener: (position: string) => void) => (state: RobotState) => {
  listener(printPosition(state));
  return state;
};
