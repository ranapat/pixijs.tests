export default class Actor {
  constructor(name) {
    this.name = name;
    this.image = undefined;
    this.x = undefined;
    this.y = undefined;
    this.rotation = undefined;
    this.isMoving = false;
  }

  get clip() {
    return undefined;
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

  get sprite() {
    return undefined;
  }

  apply(...args) {
    console.log(...args);
  }
}
