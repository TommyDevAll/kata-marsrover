import { HelloWorld } from '../index';

describe('HelloWorld should', () => {
  it('print a hello message', () => {
    expect(new HelloWorld('Otto').getMessage()).toBe('Hello, this is Otto');
  });
});
