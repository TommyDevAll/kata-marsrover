import { Rover } from '../index';

interface TestRun {
  commands: string;
  expect: string;
}

let rover: Rover;

const run = (test: TestRun) => it(test.commands, () => expect(rover.move(test.commands)).toBe(test.expect));

const describeTests = (description: string, testRuns: TestRun[]) =>
  describe(description, () => testRuns.forEach(test => run(test)));

describe('Rover', () => {
  describe('when facing NORTH', () => {
    beforeEach(() => {
      rover = new Rover(0, 0, 'N');
    });

    describeTests('when LEFT command is passed', [
      { commands: 'L', expect: '0:0:W' },
      { commands: 'LL', expect: '0:0:S' },
      { commands: 'LLL', expect: '0:0:E' },
      { commands: 'LLLL', expect: '0:0:N' },
    ]);

    describeTests('when RIGHT command is passed', [
      { commands: 'R', expect: '0:0:E' },
      { commands: 'RR', expect: '0:0:S' },
      { commands: 'RRR', expect: '0:0:W' },
      { commands: 'RRRR', expect: '0:0:N' },
    ]);

    describeTests('when mixed LEFT and RIGHT commands are passed', [
      { commands: 'LR', expect: '0:0:N' },
      { commands: 'LRLR', expect: '0:0:N' },
      { commands: 'LRLRL', expect: '0:0:W' },
      { commands: 'LRLRR', expect: '0:0:E' },
    ]);
  });
});
