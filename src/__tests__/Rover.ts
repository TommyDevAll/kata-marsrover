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
    //
    // describeWith(runner, 'when FRONT command is passed', [
    //   when('F', '0:1:N'),
    // ]);
  });
});
