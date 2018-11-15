import { Coordinates, Direction, EAST, NORTH, SOUTH, WEST } from './Direction';

const directionStringToObj: Map<string, Direction> = new Map([['N', NORTH], ['E', EAST], ['W', WEST], ['S', SOUTH]]);
const directionObjToString: Map<Direction, string> = new Map([[NORTH, 'N'], [EAST, 'E'], [WEST, 'W'], [SOUTH, 'S']]);

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
      } else if (command === 'R') {
        this.state.direction = this.state.direction.right();
      } else if (command === 'F') {
        this.state.coordinates = this.state.direction.front(this.state.coordinates);
      } else if (command === 'B') {
        this.state.coordinates = this.state.direction.back(this.state.coordinates);
      }
    });

    const directionString = directionObjToString.get(this.state.direction) || 'N';
    const positionString = `${this.state.coordinates.x}:${this.state.coordinates.y}`;
    return `${positionString}:${directionString}`;
  }
}
