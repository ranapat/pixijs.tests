import Scene from './scene';

import Tools from '../easing/tools';
import ActionNames from '../commands/command-names';

import Hero from '../actors/actor-hero';

import Keeper from '../easing/keeper';
import Linear from '../easing/linear';

export default class SceneOne extends Scene {
  constructor(stack, context) {
    super(stack, context);

    this.hero = new Hero();
    this.hero.apply(this.context.width / 2, this.context.height / 2, 90);
    this.actors.push(this.hero);

    this.handleUpdateHeroMove = this.handleUpdateHeroMove.bind(this);
  }

  handleUpdateHeroMove(position) {
    this.hero.apply(position.x, position.y);
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
            Keeper.add(new Linear(hero, item.to, hero.step, this.handleUpdateHeroMove));
          } else if (item.action === ActionNames.TURN) {
            hero.apply(hero.x, hero.y, Tools.angleBetweenPoints(hero.position, item.to));
          }
        }
      }
    } while (item !== undefined);

    Keeper.walk();
  }
}
