export class TestRun<I, E> {
  constructor(readonly description: string, readonly input: I, readonly expect: E) {}
}

export const describeWith = <I, E>(
  runner: (test: TestRun<I, E>) => void,
  description: string,
  cases: Array<TestRun<I, E>>,
) => describe(description, () => cases.forEach(test => it(test.description, () => runner(test))));
