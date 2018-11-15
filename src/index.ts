export class Rover {
  private x: number;
  private y: number;
  private direction: string;
  constructor(x: number, y: number, direction: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move(commands: string) {
    [...commands].forEach(command => {
      if (command === 'L') {
        if (this.direction === 'N') {
          this.direction = 'W';
        } else if (this.direction === 'W') {
          this.direction = 'S';
        } else if (this.direction === 'S') {
          this.direction = 'E';
        } else {
          this.direction = 'N';
        }
      } else {
        if (this.direction === 'N') {
          this.direction = 'E';
        } else if (this.direction === 'E') {
          this.direction = 'S';
        } else if (this.direction === 'S') {
          this.direction = 'W';
        } else {
          this.direction = 'N';
        }
      }
    });
    return `0:0:${this.direction}`;
  }
}
