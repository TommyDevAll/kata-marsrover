export interface Identifiable {
  readonly identifier: any;
}

export class State<I, T> implements Identifiable {
  constructor(readonly identifier: I, readonly props: T) {}

  to(identifier: I): State<I, T> {
    return new State(identifier, this.props);
  }

  update(props: Partial<T>): State<I, T> {
    const first = this.props as any;
    const second = props as any;
    const merged = { ...first, ...second };
    return new State(this.identifier, merged as T);
  }
}

export type StateHandler<T> = (state: T) => T;
