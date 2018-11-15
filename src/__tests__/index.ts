import { Rover } from '../index';

describe('Rover', () => {
  let rover: Rover;

  describe('when facing NORTH', () => {
    beforeEach(() => {
      rover = new Rover(0, 0, 'N');
    });

    describe('when LEFT command is passed', () => {
      it('once', () => {
        expect(rover.move('L')).toBe('0:0:W');
      });

      it('twice', () => {
        expect(rover.move('LL')).toBe('0:0:S');
      });

      it('tree times', () => {
        expect(rover.move('LLL')).toBe('0:0:E');
      });

      it('four times', () => {
        expect(rover.move('LLLL')).toBe('0:0:N');
      });
    });

    describe('when RIGHT command is passed', () => {
      it('once', () => {
        expect(rover.move('R')).toBe('0:0:E');
      });

      it('twice', () => {
        expect(rover.move('RR')).toBe('0:0:S');
      });

      it('tree times', () => {
        expect(rover.move('RRR')).toBe('0:0:W');
      });

      it('four times', () => {
        expect(rover.move('RRRR')).toBe('0:0:N');
      });
    });
  });
});
