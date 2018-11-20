import { Coordinates } from '../model/Coordinates';
import { Planet } from '../model/Planet';
import { RobotState, RobotStateId } from '../RobotState';

const wrap = (value: number, size: number) => (value >= 0 ? value % size : size + value);
const wrapCoords = (coords: Coordinates, size: number) => new Coordinates(wrap(coords.x, size), wrap(coords.y, size));

export const checkObstacle = (planet: Planet, at: (state: RobotState) => Coordinates) => (state: RobotState) => {
  const identifier = planet.isObstacle(wrapCoords(at(state), planet.size))
    ? RobotStateId.BLOCKED
    : state.identifier;
  return state.to(identifier);
};

export const handleOverflow = (planet: Planet) => (state: RobotState) => {
  return state.update({ coordinates: wrapCoords(state.props.coordinates, planet.size) });
};
