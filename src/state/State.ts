export interface Identifiable<I> {
  readonly identifier: I;
}

export class State<I, P> implements Identifiable<I> {
  constructor(readonly identifier: I, readonly props: P) {}

  to(identifier: I): State<I, P> {
    return new State(identifier, this.props);
  }

  update(props: Partial<P>): State<I, P> {
    const first = this.props as any;
    const second = props as any;
    const merged = { ...first, ...second };
    return new State(this.identifier, merged as P);
  }
}

export type StateHandler<S extends State<any, any>> = (
  state: State<S['identifier'], S['props']>,
) => State<S['identifier'], S['props']>;
