import { Condition } from '../model/Condition';
import { Coordinates } from '../model/Coordinates';
import { Planet } from '../model/Planet';
import { RobotState } from '../state/RobotState';

export const checkIfObstacle = (planet: Planet) => (state: RobotState) => {
  if (planet.isObstacle(state.props.target)) {
    return state.update({
      target: state.props.coordinates,
      condition: Condition.BLOCKED,
    });
  }
  return state;
};

export const handleOverflow = (planet: Planet) => (state: RobotState) => {
  const wrap = (value: number) => (value >= 0 ? value % planet.size : planet.size + value);
  const newPosition = new Coordinates(wrap(state.props.target.x), wrap(state.props.target.y));
  return state.update({ target: newPosition });
};
