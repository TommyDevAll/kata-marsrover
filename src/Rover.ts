import { Coordinates } from './Coordinates';
import { Direction, EAST, NORTH, SOUTH, WEST } from './Direction';
import { Planet } from './Planet';
import { Commands, Condition, State } from './State';

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

const commandToString: Map<Commands, string> = new Map<Commands, string>([
  [Commands.LEFT, 'L'],
  [Commands.RIGHT, 'R'],
  [Commands.FORWARD, 'F'],
  [Commands.BACKWARD, 'B'],
]);

const stringToCommand: Map<string, Commands> = new Map<string, Commands>([
  ['L', Commands.LEFT],
  ['R', Commands.RIGHT],
  ['F', Commands.FORWARD],
  ['B', Commands.BACKWARD],
]);

const back: StateHandler = (state: State) => {
  return new State(state.coordinates, state.direction.back(state.coordinates), state.direction, Condition.MOVING);
};

const front: StateHandler = (state: State) => {
  return new State(state.coordinates, state.direction.front(state.coordinates), state.direction, Condition.MOVING);
};

const right: StateHandler = (state: State) => {
  return new State(state.coordinates, state.coordinates, state.direction.right(), state.condition);
};

const left: StateHandler = (state: State) => {
  return new State(state.coordinates, state.coordinates, state.direction.left(), state.condition);
};

const nothing = (state: State) => state;

const completeMovement: StateHandler = (state: State) => {
  if (state.condition === Condition.MOVING) {
    return new State(state.target, state.target, state.direction, state.condition);
  }
  return state;
};

type StateHandler = (state: State) => State;

const commandHandlers: Map<Commands, StateHandler> = new Map<Commands, StateHandler>([
  [Commands.LEFT, left],
  [Commands.RIGHT, right],
  [Commands.FORWARD, front],
  [Commands.BACKWARD, back],
]);

const printPosition = (state: State) => {
  const directionString = directionToString.get(state.direction) || 'N';
  const positionString = `${state.coordinates.x}:${state.coordinates.y}`;
  return `${positionString}:${directionString}`;
};

export class Rover {
  private state: State;

  constructor(x: number, y: number, direction: string, private planet: Planet) {
    const position = { x, y };
    this.state = new State(position, position, stringToDirection.get(direction) || NORTH, Condition.IDLE);
  }

  move(commands: string) {
    [...commands].forEach((command: string) => {
      this.state = (commandHandlers.get(stringToCommand.get(command) || Commands.NONE) || nothing)(this.state);
      this.state = this.handleOverflow(this.state);
      this.state = this.checkIfObstacle(this.state);
      this.state = completeMovement(this.state);
    });

    return printPosition(this.state);
  }

  private handleOverflow(state: State) {
    const wrap = (value: number) => (value >= 0 ? value % this.planet.size : this.planet.size + value);
    const newPosition = new Coordinates(wrap(state.target.x), wrap(state.target.y));
    return new State(state.coordinates, newPosition, state.direction, state.condition);
  }

  private checkIfObstacle(state: State) {
    if (this.planet.isObstacle(state.target)) {
      return new State(state.coordinates, state.coordinates, state.direction, Condition.BLOCKED);
    }
    return state;
  }
}
