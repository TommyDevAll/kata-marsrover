export class State<T> {
  constructor(readonly props: T) {}

  update(props: Partial<T>): State<T> {
    const first = this.props as any;
    const second = props as any;
    const merged = { ...first, ...second };
    return new State(merged as T);
  }
}

export type StateHandler<T> = (state: T) => T;

export enum Condition {
  IDLE,
  MOVING,
  BLOCKED,
}

export enum Commands {
  NONE,
  LEFT,
  RIGHT,
  FORWARD,
  BACKWARD,
}
