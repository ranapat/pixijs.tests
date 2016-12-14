import Linear from './linear';

export default class LinearDynamic extends Linear {
  preferAlone(ease) {
    let result;

    if (
      this.constructor.name === ease.constructor.name
      && this.target === ease.target
    ) {
      result = true;
    } else if (
      ease.constructor.name === 'Linear'
      && this.target === ease.target
    ) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  poke() {
    this.callback(this.target, this.next, false);
  }

  finish() {
    this.callback(this.target, this.to, true);
  }
}
