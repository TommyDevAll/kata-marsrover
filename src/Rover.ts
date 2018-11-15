import { Direction, EAST, NORTH, SOUTH, WEST } from './Direction';

const directionStringToObj: Map<string, Direction> = new Map([['N', NORTH], ['E', EAST], ['W', WEST], ['S', SOUTH]]);
const directionObjToString: Map<Direction, string> = new Map([[NORTH, 'N'], [EAST, 'E'], [WEST, 'W'], [SOUTH, 'S']]);

interface Coordinates {
  x: number;
  y: number;
}

interface State {
  coordinates: Coordinates;
  direction: Direction;
}

export class Rover {
  private state: State;
  constructor(x: number, y: number, direction: string) {
    this.state = {
      coordinates: { x, y },
      direction: directionStringToObj.get(direction) || NORTH,
    };
  }

  move(commands: string) {
    [...commands].forEach(command => {
      if (command === 'L') {
        this.state.direction = this.state.direction.left();
      } else {
        this.state.direction = this.state.direction.right();
      }
    });

    const directionString = directionObjToString.get(this.state.direction) || 'N';
    return `0:0:${directionString}`;
  }
}
