export default class Scene {
  constructor(stack, context) {
    this.stack = stack;
    this.context = context;

    this.actors = [];
  }

  update() {
    const stack = this.stack;

    stack.rest();
  }

  draw(interpolation) {
    if (interpolation === 1) {
      this.context.render();
    }
  }
}
