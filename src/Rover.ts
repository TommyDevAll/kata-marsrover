import { Direction, EAST, NORTH, SOUTH, WEST } from './Direction';

const directionStringToObj: Map<string, Direction> = new Map([['N', NORTH], ['E', EAST], ['W', WEST], ['S', SOUTH]]);
const directionObjToString: Map<Direction, string> = new Map([[NORTH, 'N'], [EAST, 'E'], [WEST, 'W'], [SOUTH, 'S']]);

export class Rover {
  private x: number;
  private y: number;
  private directionObject: Direction;
  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.directionObject = directionStringToObj.get(direction) || NORTH;
  }

  move(commands: string) {
    [...commands].forEach(command => {
      if (command === 'L') {
        this.directionObject = this.directionObject.left();
      } else {
        this.directionObject = this.directionObject.right();
      }
    });

    const directionString = directionObjToString.get(this.directionObject) || 'N';
    return `0:0:${directionString}`;
  }
}
