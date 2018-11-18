import { Coordinates } from '../Coordinates';
import { MarsRover } from '../MarsRover';

import { TestPlanet } from './Planet';
import { TestRun, describeWith } from './utils/describeWith';

interface TestInput {
  commands: string;
  obstacles: Coordinates[];
}

describe('MarsRover', () => {
  let rover: MarsRover;
  let planet: TestPlanet;

  const runner = (testRun: TestRun<TestInput, string>) => {
    planet.setObstacles(testRun.input.obstacles);
    expect(rover.move(testRun.input.commands)).toBe(testRun.expect);
  };

  const when = (commands: string, expect: string, obstacles: Coordinates[] = []) => {
    return new TestRun(commands, { commands, obstacles }, expect);
  };

  describe('when facing NORTH in a 10x10 planet', () => {
    beforeEach(() => {
      planet = new TestPlanet(10);
      rover = new MarsRover(0, 0, 'N', planet);
    });

    describeWith(runner, 'when LEFT command is passed', [
      when('L', '0:0:W'),
      when('LL', '0:0:S'),
      when('LLL', '0:0:E'),
      when('LLLL', '0:0:N'),
    ]);

    describeWith(runner, 'when RIGHT command is passed', [
      when('R', '0:0:E'),
      when('RR', '0:0:S'),
      when('RRR', '0:0:W'),
      when('RRRR', '0:0:N'),
    ]);

    describeWith(runner, 'when mixed LEFT and RIGHT commands are passed', [
      when('LR', '0:0:N'),
      when('LRLR', '0:0:N'),
      when('LRLRL', '0:0:W'),
      when('LRLRR', '0:0:E'),
    ]);

    describeWith(runner, 'when FRONT command is passed', [
      when('F', '0:1:N'),
      when('FF', '0:2:N'),
      when('FFF', '0:3:N'),
    ]);

    describeWith(runner, 'when BACKWARD command is passed', [
      when('B', '0:9:N'),
      when('BB', '0:8:N'),
      when('BBB', '0:7:N'),
    ]);

    describeWith(runner, 'when turning to EAST and then movement commands are passed', [
      when('RF', '1:0:E'),
      when('RFF', '2:0:E'),
      when('RFFF', '3:0:E'),
      when('RFFFB', '2:0:E'),
      when('RFFFBB', '1:0:E'),
      when('RFFFBBB', '0:0:E'),
    ]);

    describeWith(runner, 'when turning to WEST and then movements commands are passed', [
      when('LBBBF', '2:0:W'),
      when('LBBBFF', '1:0:W'),
      when('LBBBFFF', '0:0:W'),
      when('LBBB', '3:0:W'),
    ]);

    describeWith(runner, 'when turning to SOUTH and then movements commands are passed', [
      when('LLBBB', '0:3:S'),
      when('LLBBBF', '0:2:S'),
      when('LLBBBFF', '0:1:S'),
      when('LLBBBFFF', '0:0:S'),
    ]);

    describe('when rover is inside a 3x3 planet', () => {
      beforeEach(() => {
        planet.setSize(3);
      });

      describeWith(runner, 'should wrap from top to bottom', [
        when('FFF', '0:0:N'),
        when('FFFF', '0:1:N'),
        when('FFFFF', '0:2:N'),
      ]);

      describeWith(runner, 'should wrap from bottom to top', [
        when('LLFFF', '0:0:S'),
        when('LLFFFF', '0:2:S'),
        when('LLFFFFF', '0:1:S'),
      ]);

      describeWith(runner, 'should wrap from left to right', [
        when('LFFF', '0:0:W'),
        when('LFFFF', '2:0:W'),
        when('LFFFFF', '1:0:W'),
      ]);

      describeWith(runner, 'should wrap from right to left', [
        when('RFFF', '0:0:E'),
        when('RFFFF', '1:0:E'),
        when('RFFFFF', '2:0:E'),
      ]);
    });

    describe('when the 3x3 planet has obstacles', () => {
      describeWith(runner, 'should move if no obstacles on his path', [
        when('FF', '0:2:N', []),
        when('FF', '0:2:N', [{ x: 1, y: 0 }]),
        when('FFRFFRFF', '2:0:S', [{ x: 1, y: 0 }]),
        when('FFRFFRFFRFFR', '0:0:N', [{ x: 1, y: 1 }]),
      ]);

      describeWith(runner, 'should stop if he touches an obstacle', [
        when('FF', '0:0:N', [{ x: 0, y: 1 }]),
        when('FF', '0:1:N', [{ x: 0, y: 2 }]),
      ]);
    });
  });
});
