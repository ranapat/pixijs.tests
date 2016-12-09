export default class Ease {
  constructor(target, callback) {
    if (new.target === Ease) {
      throw new TypeError('Cannot construct Ease directly');
    }

    this.target = target;
    this.callback = callback;
  }

  get next() {
    return undefined;
  }

  get ready() {
    return true;
  }

  preferAlone(ease) {
    return this.constructor.name === ease.constructor.name
        && this.target === ease.target
    ;
  }

  poke() {
    this.callback(this.next);
  }
}
