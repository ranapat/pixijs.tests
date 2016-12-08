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

  poke() {
    this.callback(this.next);
  }
}
