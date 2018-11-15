import { Rover } from '../Rover';

import { TestRun, describeWith } from './utils/describeWith';

describe('Rover', () => {
  let rover: Rover;

  const runner = (testRun: TestRun<string, string>) => expect(rover.move(testRun.input)).toBe(testRun.expect);
  const when = (input: string, expect: string) => new TestRun(input, input, expect);

  describe('when facing NORTH', () => {
    beforeEach(() => {
      rover = new Rover(0, 0, 'N');
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
      when('B', '0:-1:N'),
      when('BB', '0:-2:N'),
      when('BBB', '0:-3:N'),
    ]);

    describeWith(runner, 'when turning to EAST and then movement commands are passed', [
      when('RF', '1:0:E'),
      when('RFF', '2:0:E'),
      when('RFFF', '3:0:E'),
      when('RBBB', '-3:0:E'),
    ]);

    describeWith(runner, 'when turning to WEST and then movements commands are passed', [
      when('LF', '-1:0:W'),
      when('LFF', '-2:0:W'),
      when('LFFF', '-3:0:W'),
      when('LBBB', '3:0:W'),
    ]);

    describeWith(runner, 'when turning to SOUTH and then movements commands are passed', [
      when('LLF', '0:-1:S'),
      when('LLFF', '0:-2:S'),
      when('LLFFF', '0:-3:S'),
      when('LLBBB', '0:3:S'),
    ]);
  });
});
