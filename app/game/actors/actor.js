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
    this.isMoving = false;
  }

  get clip() {
    return undefined;
  }

  get angle() {
    return this.rotation;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  get moving() {
    return this.isMoving;
  }

  set moving(value) {
    this.isMoving = value;
  }

  apply(...args) {
    console.log(...args);
  }
}
