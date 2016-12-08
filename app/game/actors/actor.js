export default class Actor {
  constructor(name) {
    if (new.target === Actor) {
      throw new TypeError('Cannot construct Actor directly');
    }

    this.name = name;
    this.image = undefined;
    this.ready = false;
    this.x = undefined;
    this.y = undefined;
  }

  set(position) {
    this.x = position.x;
    this.y = position.y;
  }
}
