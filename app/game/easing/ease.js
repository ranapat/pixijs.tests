export default class Ease {
  static get EXECUTE_IN_BOTH() { return 'both'; }
  static get EXECUTE_IN_UPDATE() { return 'update'; }
  static get EXECUTE_IN_DRAW() { return 'draw'; }

  constructor(target, callback) {
    if (new.target === Ease) {
      throw new TypeError('Cannot construct Ease directly');
    }

    this.target = target;
    this.callback = callback;

    this.executeIn = Ease.EXECUTE_IN_BOTH;
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
