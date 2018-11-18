import { Coordinates } from '../model/Coordinates';
import { Planet } from '../model/Planet';

export class TestPlanet extends Planet {
  constructor(public size: number, public obstacles: Coordinates[] = []) {
    super(size, obstacles);
  }

  setSize(size: number) {
    this.size = size;
  }

  setObstacles(obstacles: Coordinates[]) {
    this.obstacles = obstacles;
  }
}
