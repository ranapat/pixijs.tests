import Scene from './scene';

import ActionNames from '../commands/command-names';

import Hero from '../actors/actor-hero';

export default class SceneOne extends Scene {
  constructor(stack, context) {
    super(stack, context);

    this.hero = new Hero();
    this.hero.set({ x: this.context.width / 2, y: this.context.height / 2 });
    this.actors.push(this.hero);
  }

  update() {
    const stack = this.stack;
    let item;

    do {
      item = stack.get();

      if (item !== undefined) {
        if (item.actor === this.hero.name) {
          if (item.action === ActionNames.MOVE) {
            this.hero.set(item.to);
          }
        }
      }
    } while (item !== undefined);
  }
}
