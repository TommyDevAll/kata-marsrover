import { Coordinates } from './model/Coordinates';
import { Direction, EAST, NORTH, SOUTH, WEST } from './model/Direction';
import { Planet } from './model/Planet';
import { State, StateHandler } from './State';
import { Command } from './model/Command';
import { Condition } from './model/Condition';

interface RobotStateProperties {
  readonly coordinates: Coordinates;
  readonly target: Coordinates;
  readonly direction: Direction;
  readonly condition: Condition;
}

type RobotState = State<RobotStateProperties>;
type RobotStateHandler = StateHandler<RobotState>;

const stringToDirection: Map<string, Direction> = new Map<string, Direction>([
  ['N', NORTH],
  ['E', EAST],
  ['W', WEST],
  ['S', SOUTH],
]);

const directionToString: Map<Direction, string> = new Map<Direction, string>([
  [NORTH, 'N'],
  [EAST, 'E'],
  [WEST, 'W'],
  [SOUTH, 'S'],
]);

const commandToString: Map<Command, string> = new Map<Command, string>([
  [Command.LEFT, 'L'],
  [Command.RIGHT, 'R'],
  [Command.FORWARD, 'F'],
  [Command.BACKWARD, 'B'],
]);

const stringToCommand: Map<string, Command> = new Map<string, Command>([
  ['L', Command.LEFT],
  ['R', Command.RIGHT],
  ['F', Command.FORWARD],
  ['B', Command.BACKWARD],
]);

const back: RobotStateHandler = (state: RobotState) => {
  return state.update({
    target: state.props.direction.back(state.props.coordinates),
    condition: Condition.MOVING,
  });
};

const front: RobotStateHandler = (state: RobotState) => {
  return state.update({
    target: state.props.direction.front(state.props.coordinates),
    condition: Condition.MOVING,
  });
};

const right: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.right() });
};

const left: RobotStateHandler = (state: RobotState) => {
  return state.update({ direction: state.props.direction.left() });
};

const nothing = (state: RobotState) => state;

const completeMovement: RobotStateHandler = (state: RobotState) => {
  if (state.props.condition === Condition.MOVING) {
    return state.update({ coordinates: state.props.target });
  }
  return state;
};

const commandHandlers: Map<Command, RobotStateHandler> = new Map<Command, RobotStateHandler>([
  [Command.LEFT, left],
  [Command.RIGHT, right],
  [Command.FORWARD, front],
  [Command.BACKWARD, back],
]);

const printPosition = (state: RobotState) => {
  const directionString = directionToString.get(state.props.direction) || 'N';
  const positionString = `${state.props.coordinates.x}:${state.props.coordinates.y}`;
  return `${positionString}:${directionString}`;
};

export class MarsRover {
  private state: RobotState;

  constructor(x: number, y: number, direction: string, private planet: Planet) {
    const position = { x, y };
    this.state = new State({
      coordinates: position,
      target: position,
      direction: stringToDirection.get(direction) || NORTH,
      condition: Condition.IDLE,
    });
  }

  move(commands: string) {
    [...commands].forEach((command: string) => {
      this.state = (commandHandlers.get(stringToCommand.get(command) || Command.NONE) || nothing)(this.state);
      this.state = this.handleOverflow(this.state);
      this.state = this.checkIfObstacle(this.state);
      this.state = completeMovement(this.state);
    });

    return printPosition(this.state);
  }

  private handleOverflow(state: RobotState) {
    const wrap = (value: number) => (value >= 0 ? value % this.planet.size : this.planet.size + value);
    const newPosition = new Coordinates(wrap(state.props.target.x), wrap(state.props.target.y));
    return state.update({ target: newPosition });
  }

  private checkIfObstacle(state: RobotState) {
    if (this.planet.isObstacle(state.props.target)) {
      return state.update({
        target: state.props.coordinates,
        condition: Condition.BLOCKED,
      });
    }
    return state;
  }
}
