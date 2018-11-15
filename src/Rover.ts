import { Direction, EAST, NORTH, SOUTH, WEST } from './Direction';

const directionStringToObj: Map<string, Direction> = new Map([['N', NORTH], ['E', EAST], ['W', WEST], ['S', SOUTH]]);
const directionObjToString: Map<Direction, string> = new Map([[NORTH, 'N'], [EAST, 'E'], [WEST, 'W'], [SOUTH, 'S']]);

export class Rover {
  private x: number;
  private y: number;
  private direction: string;
  private directionObject: Direction;
  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.directionObject = directionStringToObj.get(direction) || NORTH;
  }

  move(commands: string) {
    [...commands].forEach(command => {
      if (command === 'L') {
        this.directionObject = this.directionObject.left();
        this.direction = directionObjToString.get(this.directionObject) || 'N';
      } else {
        if (this.direction === 'N') {
          this.direction = 'E';
          this.directionObject = EAST;
        } else if (this.direction === 'E') {
          this.direction = 'S';
          this.directionObject = SOUTH;
        } else if (this.direction === 'S') {
          this.direction = 'W';
          this.directionObject = WEST;
        } else {
          this.direction = 'N';
          this.directionObject = NORTH;
        }
      }
    });
    return `0:0:${this.direction}`;
  }
}
