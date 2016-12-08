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
    return undefined;
  }

  draw(interpolation) {
    if (interpolation === 1) {
      this.context.clear();

      let i;
      const actors = this.actors;
      const length = actors.length;
      let item;

      for (i = 0; i < length; i += 1) {
        item = actors[i];

        if (item.ready) {
          this.context.draw(item.image, item.x, item.y, item.rotation);
        }
      }
    }
  }
}
