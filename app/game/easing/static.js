import Ease from './ease';

export default class Static extends Ease {
  get ready() {
    return this.target.finished;
  }

  poke() {
    this.callback(this.target, false);
  }

  finish() {
    this.callback(this.target, true);
  }
}
