import { Planet } from '../Planet';

export class TestPlanet implements Planet {
  constructor(public size: number) {}

  setSize(size: number) {
    this.size = size;
  }
}
