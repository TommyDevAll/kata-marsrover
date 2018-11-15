import { Coordinates, Direction, EAST, NORTH, SOUTH, WEST } from './Direction';

// noinspection TsLint
const stringToDirection = new Map([
  ['N', NORTH],
  ['E', EAST],
  ['W', WEST],
  ['S', SOUTH]
]);

// noinspection TsLint
const directionToString = new Map([
  [NORTH, 'N'],
  [EAST, 'E'],
  [WEST, 'W'],
  [SOUTH, 'S']
]);

class State {
  constructor(readonly coordinates: Coordinates, readonly direction: Direction) {}
}

const back = (state: State) => {
  return new State(state.direction.back(state.coordinates), state.direction);
};

const front = (state: State) => {
  return new State(state.direction.front(state.coordinates), state.direction);
};

const right = (state: State) => {
  return new State(state.coordinates, state.direction.right());
};

const left = (state: State) => {
  return new State(state.coordinates, state.direction.left());
};

const commandHandlers: Map<string, (state: State) => State> = new Map([
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
  constructor(x: number, y: number, direction: string) {
    this.state = {
      coordinates: { x, y },
      direction: stringToDirection.get(direction) || NORTH,
    };
  }

  move(commands: string) {
    [...commands].forEach(command => {
      const nothing = (state: State) => state;
      this.state = (commandHandlers.get(command) || nothing)(this.state);
    });

    return printPosition(this.state);
  }
}
