import { Coordinates, Direction, EAST, NORTH, SOUTH, WEST } from './Direction';
import { Planet } from './Planet';

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

class State {
  constructor(readonly coordinates: Coordinates, readonly target: Coordinates, readonly direction: Direction) {}
}

const back: StateHandler = (state: State) => {
  return new State(state.coordinates, state.direction.back(state.coordinates), state.direction);
};

const front: StateHandler = (state: State) => {
  return new State(state.coordinates, state.direction.front(state.coordinates), state.direction);
};

const right: StateHandler = (state: State) => {
  return new State(state.coordinates, state.coordinates, state.direction.right());
};

const left: StateHandler = (state: State) => {
  return new State(state.coordinates, state.coordinates, state.direction.left());
};

const completeMovement: StateHandler = (state: State) => {
  return new State(state.target, state.target, state.direction);
};

type StateHandler = (state: State) => State;

const commandHandlers: Map<string, StateHandler> = new Map<string, StateHandler>([
  ['L', left],
  ['R', right],
  ['F', front],
  ['B', back],
]);

const printPosition = (state: State) => {
  const directionString = directionToString.get(state.direction) || 'N';
  const positionString = `${state.coordinates.x}:${state.coordinates.y}`;
  return `${positionString}:${directionString}`;
};

export class Rover {
  private state: State;

  constructor(x: number, y: number, direction: string, private planet: Planet) {
    this.state = new State({ x, y }, { x, y }, stringToDirection.get(direction) || NORTH);
  }

  move(commands: string) {
    [...commands].forEach(command => {
      const nothing = (state: State) => state;
      this.state = (commandHandlers.get(command) || nothing)(this.state);
      this.state = this.handleOverflow(this.state);
      this.state = completeMovement(this.state);
    });

    return printPosition(this.state);
  }

  private handleOverflow(state: State) {
    const wrap = (value: number) => (value >= 0 ? value % this.planet.size : this.planet.size + value);
    const newPosition = new Coordinates(wrap(state.target.x), wrap(state.target.y));
    return new State(state.coordinates, newPosition, state.direction);
  }
}
