import Ease from './ease';

export default class Simple extends Ease {
  constructor(target, from, to, step, callback) {
    super(target, callback);

    this.current = from;
    this.from = from;
    this.to = to;
    this.step = step;
  }

  get next() {
    this.current += this.step;
    return this.current;
  }

  get ready() {
    return this.current === this.to;
  }

}
