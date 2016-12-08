import Scene from './scene';

import Tools from '../easing/tools';
import ActionNames from '../commands/command-names';

import Hero from '../actors/actor-hero';

export default class SceneOne extends Scene {
  constructor(stack, context) {
    super(stack, context);

    this.hero = new Hero();
    this.hero.apply(this.context.width / 2, this.context.height / 2, 90);
    this.actors.push(this.hero);
  }

  update() {
    const hero = this.hero;
    const stack = this.stack;
    let item;

    do {
      item = stack.get();

      if (item !== undefined) {
        if (item.actor === hero.name) {
          if (item.action === ActionNames.MOVE) {
            console.log(hero.rotation);
            hero.apply(item.to.x, item.to.y);
          } else if (item.action === ActionNames.TURN) {
            hero.apply(hero.x, hero.y, Tools.angleBetweenPoints(hero.position, item.to));
          }
        }
      }
    } while (item !== undefined);
  }
}
