import { nothing } from './handler/Command';
import { completeMovement, handleMovement } from './handler/Movement';
import { checkObstacle, handleOverflow } from './handler/Planet';
import { RobotStateHandler } from './handler/RobotStateHandler';
import { sameCondition } from './handler/SameCondition';
import { Command } from './model/Command';
import { RobotStateIdentifier } from './model/RobotStateIdentifier';
import { Direction, EAST, NORTH, SOUTH, WEST } from './model/Direction';
import { Planet } from './model/Planet';
import { RobotState } from './state/RobotState';
import { State } from './state/State';
import { chain } from './handler/Chain';

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
  private readonly conditionHandlers: Map<RobotStateIdentifier, RobotStateHandler>;

  constructor(x: number, y: number, direction: string, private planet: Planet) {
    const position = { x, y };
    this.state = new State(RobotStateIdentifier.IDLE, {
      coordinates: position,
      target: position,
      direction: stringToDirection.get(direction) || NORTH,
      condition: RobotStateIdentifier.IDLE,
      command: Command.NONE,
    });

    const toFront = (state: RobotState) => state.props.direction.front(state.props.coordinates);
    const toBack = (state: RobotState) => state.props.direction.back(state.props.coordinates);
    this.conditionHandlers = new Map<RobotStateIdentifier, RobotStateHandler>([
      [RobotStateIdentifier.IDLE, chain([handleOverflow(planet), handleMovement])],
      [RobotStateIdentifier.BLOCKED, nothing],
      [RobotStateIdentifier.MOVING_FRONT, sameCondition([checkObstacle(planet, toFront), completeMovement(toFront)])],
      [RobotStateIdentifier.MOVING_BACK, sameCondition([checkObstacle(planet, toBack), completeMovement(toBack)])],
    ]);
  }

  move(commands: string) {
    [...commands].forEach((command: string) => {
      const nextCommand = stringToCommand.get(command) || Command.NONE;
      const nextCommandState = this.state.update({ command: nextCommand });
      this.state = this.next(nextCommandState);
    });

    return printPosition(this.state);
  }

  private next(state: RobotState): RobotState {
    const nextState = (this.conditionHandlers.get(state.props.condition) || nothing)(state);
    return nextState.props.condition === state.props.condition ? nextState : this.next(nextState);
  }
}
