import { Coordinates } from './Coordinates';

export class Planet {
  constructor(readonly size: number, readonly obstacles: Coordinates[]) {}

  isObstacle(position: Coordinates): boolean {
    const atPosition = (obstacle: Coordinates) => obstacle.x === position.x && obstacle.y === position.y;
    return this.obstacles.some(atPosition);
  }
}
