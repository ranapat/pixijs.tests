import Scene from './scene';

import Tools from '../easing/tools';
import ActionNames from '../commands/command-names';

import Hero from '../actors/actor-hero';

import Keeper from '../easing/keeper';
import Linear from '../easing/linear';
import LinearSumable from '../easing/linear-sumable';

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

    const linearSumableTo = { x: 0, y: 0 };

    do {
      item = stack.get();

      if (item !== undefined) {
        if (item.actor === hero.name) {
          if (item.action === ActionNames.MOVE) {
            Keeper.add(new Linear(hero, item.to, hero.step, this.handleUpdateHeroMove));
          } else if (item.action === ActionNames.SHIFT) {
            linearSumableTo.x += item.to.x;
            linearSumableTo.y += item.to.y;
          } else if (item.action === ActionNames.TURN) {
            hero.apply(hero.x, hero.y, Tools.angleBetweenPoints(hero.position, item.to));
          }
        }
      }
    } while (item !== undefined);

    if (linearSumableTo.x !== 0 || linearSumableTo.y !== 0) {
      Keeper.add(new LinearSumable(
        hero,
        { x: hero.position.x + linearSumableTo.x, y: hero.position.y + linearSumableTo.y },
        hero.step,
        this.handleUpdateHeroMove
      ));
    }

    stack.rest();

    Keeper.walk();
  }
}
