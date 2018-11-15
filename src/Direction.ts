export interface Direction {
  left(): Direction;
  right(): Direction;
}

export const NORTH = {
  left: () => WEST,
  right: () => EAST,
} as Direction;

export const WEST = {
  left: () => SOUTH,
  right: () => NORTH,
} as Direction;

export const SOUTH = {
  left: () => EAST,
  right: () => WEST,
} as Direction;

export const EAST = {
  left: () => NORTH,
  right: () => SOUTH,
} as Direction;
