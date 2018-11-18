import { chainHandlerFactory } from './handler/ChainHandler';
import { completeMovement, handleMovement } from './handler/Movement';
import { checkIfObstacleFactory, handleOverflowFactory } from './handler/Planet';
import { RobotStateHandler } from './handler/RobotStateHandler';
import { Command } from './model/Command';
import { Condition } from './model/Condition';
import { Direction, EAST, NORTH, SOUTH, WEST } from './model/Direction';
import { Planet } from './model/Planet';
import { RobotState } from './state/RobotState';
import { State } from './state/State';

const stringToDirection: Map<string, Direction> = new Map<string, Direction>([
  ['N', NORTH],
  ['E', EAST],
  ['W', WEST],
  ['S', SOUTH],
]);

const directionToString: Map<Direction, string> = new Map<Direction, string>([
  [NORTH, 'N'],
  [EAST, 'E'],
  [WEST, 'W'],
  [SOUTH, 'S'],
]);

const stringToCommand: Map<string, Command> = new Map<string, Command>([
  ['L', Command.LEFT],
  ['R', Command.RIGHT],
  ['F', Command.FORWARD],
  ['B', Command.BACKWARD],
]);

const printPosition = (state: RobotState) => {
  const directionString = directionToString.get(state.props.direction) || '-';
  const positionString = `${state.props.coordinates.x}:${state.props.coordinates.y}`;
  return `${positionString}:${directionString}`;
};

export class MarsRover {
  private state: RobotState;
  private readonly chainHandler: RobotStateHandler;

  constructor(x: number, y: number, direction: string, private planet: Planet) {
    const position = { x, y };
    this.state = new State({
      coordinates: position,
      target: position,
      direction: stringToDirection.get(direction) || NORTH,
      condition: Condition.IDLE,
      command: Command.NONE,
    });

    this.chainHandler = chainHandlerFactory([
      handleMovement,
      handleOverflowFactory(planet),
      checkIfObstacleFactory(planet),
      completeMovement,
    ]);
  }

  move(commands: string) {
    [...commands].forEach((command: string) => {
      const nextCommand = { command: stringToCommand.get(command) || Command.NONE };
      this.state = this.chainHandler(this.state.update(nextCommand));
    });

    return printPosition(this.state);
  }
}
