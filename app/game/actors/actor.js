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
    this.rotation = undefined;
  }

  get angle() {
    return this.rotation;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  apply(...args) {
    console.log(...args);
  }
}
