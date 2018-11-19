import { RobotStateIdentifier } from '../model/RobotStateIdentifier';
import { Coordinates } from '../model/Coordinates';
import { Planet } from '../model/Planet';
import { RobotState } from '../state/RobotState';

const wrap = (value: number, size: number) => (value >= 0 ? value % size : size + value);
const wrapCoords = (coords: Coordinates, size: number) => new Coordinates(wrap(coords.x, size), wrap(coords.y, size));

export const checkObstacle = (planet: Planet, at: (state: RobotState) => Coordinates) => (state: RobotState) => {
  const condition = planet.isObstacle(wrapCoords(at(state), planet.size)) ? RobotStateIdentifier.BLOCKED : state.props.condition;
  return state.update({ condition });
};

export const handleOverflow = (planet: Planet) => (state: RobotState) => {
  return state.update({ coordinates: wrapCoords(state.props.coordinates, planet.size) });
};
