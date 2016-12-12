import Ease from './ease';
import Tools from './tools';

export default class Linear extends Ease {
  constructor(target, to, step, callback) {
    super(target, callback);

    this.to = to;
    this.step = step;
  }

  get next() {
    return Tools.shiftWithStep(this.target.position, this.to, this.step);
  }

  get ready() {
    return this.to.x === this.target.x && this.to.y === this.target.y;
  }

  preferAlone(ease) {
    let result;

    if (
      this.constructor.name === ease.constructor.name
      && this.target === ease.target
    ) {
      result = true;
    } else if (
      ease.constructor.name === 'LinearSumable'
      && this.target === ease.target
    ) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }
}
