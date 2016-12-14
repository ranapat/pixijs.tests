import Linear from './linear';

export default class LinearDynamic extends Linear {
  poke() {
    this.callback(this.target, this.next, false);
  }

  finish() {
    this.callback(this.target, this.to, true);
  }
}
