export default class Scene {
  constructor(stack, context) {
    if (new.target === Scene) {
      throw new TypeError('Cannot construct Scene directly');
    }

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
      this.context.clear();

      let item;
      let clip;
      const actors = this.actors;

      for (item of actors) {
        if (item.ready) {
          clip = item.clip;
          if (clip !== undefined) {
            this.context.clip(item.image, clip, item.x, item.y, item.angle);
          } else {
            this.context.draw(item.image, item.x, item.y, item.angle);
          }
        }
      }
    }
  }
}
