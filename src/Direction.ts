export class Coordinates {
  constructor(readonly x: number, readonly y: number) {}
}

export interface Direction {
  left(): Direction;
  right(): Direction;
  front(from: Coordinates): Coordinates;
  back(from: Coordinates): Coordinates;
}

export const NORTH = {
  left: () => WEST,
  right: () => EAST,
  front: (from: Coordinates) => ({ x: from.x, y: from.y + 1 }),
  back: (from: Coordinates) => ({ x: from.x, y: from.y - 1 }),
} as Direction;

export const WEST = {
  left: () => SOUTH,
  right: () => NORTH,
  front: (from: Coordinates) => ({ x: from.x - 1, y: from.y }),
  back: (from: Coordinates) => ({ x: from.x + 1, y: from.y }),
} as Direction;

export const SOUTH = {
  left: () => EAST,
  right: () => WEST,
  front: (from: Coordinates) => ({ x: from.x, y: from.y - 1 }),
  back: (from: Coordinates) => ({ x: from.x, y: from.y + 1 }),
} as Direction;

export const EAST = {
  left: () => NORTH,
  right: () => SOUTH,
  front: (from: Coordinates) => ({ x: from.x + 1, y: from.y }),
  back: (from: Coordinates) => ({ x: from.x - 1, y: from.y }),
} as Direction;
