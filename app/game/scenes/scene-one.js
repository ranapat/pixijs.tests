import Scene from './scene';

import Tools from '../easing/tools';
import ActionNames from '../commands/command-names';
import CommandModifiers from '../commands/command-modifiers';

import Hero from '../actors/actor-hero';

import Ease from '../easing/ease';
import Keeper from '../easing/keeper';
import Linear from '../easing/linear';
import LinearSumable from '../easing/linear-sumable';
import Simple from '../easing/simple';

import Config from '../../config/config';
import ConfigDestination from '../../config/config-destination';

const TARGET_CIRCLE = 'circle';
const CIRCLE_RADIUS = ConfigDestination.circleRadius;
const CIRCLE_RADIUS_STEP = ConfigDestination.circleRadiusStep;

const STAGE_WIDTH = Config.width;
const STAGE_HEIGHT = Config.height;

export default class SceneOne extends Scene {
  constructor(stack, context) {
    super(stack, context);

    this.hero = new Hero();
    this.hero.apply(this.context.width / 2, this.context.height / 2, 90);
    this.actors.push(this.hero);

    this.mouse = undefined;
    this.destination = undefined;

    this.handleUpdateHeroMove = this.handleUpdateHeroMove.bind(this);
    this.handleUpdateCircle = this.handleUpdateCircle.bind(this);
  }

  handleUpdateHeroMove(position, ready) {
    if (!ready) {
      const x = Math.min(STAGE_WIDTH, Math.max(0, position.x));
      const y = Math.min(STAGE_HEIGHT, Math.max(0, position.y));

      this.hero.apply(x, y);
      this.hero.moving = true;
    } else {
      this.hero.moving = false;
    }
  }

  handleUpdateCircle(radius) {
    if (this.destination !== undefined) {
      this.context.destination(this.destination, radius);
    }
  }

  update() {
    const hero = this.hero;
    const stack = this.stack;
    let item;

    const followModifier = stack.isModified(CommandModifiers.FOLLOW);

    const linearSumableTo = { x: 0, y: 0 };

    do {
      item = stack.get();

      if (item !== undefined) {
        if (item.actor === hero.name) {
          if (item.action === ActionNames.MOVE) {
            Keeper.add(
              new Linear(hero, item.to, hero.step, this.handleUpdateHeroMove)
            ).executeIn = Ease.EXECUTE_IN_UPDATE;

            this.destination = { x: item.to.x, y: item.to.y };
            Keeper.add(
              new Simple(TARGET_CIRCLE, 0, CIRCLE_RADIUS, CIRCLE_RADIUS_STEP, this.handleUpdateCircle)
            ).executeIn = Ease.EXECUTE_IN_DRAW;
          } else if (item.action === ActionNames.SHIFT) {
            if (followModifier) {
              if (item.to.x === 0 && item.to.y < 0) {
                Keeper.add(new Linear(
                  hero,
                  Tools.offsetWithStep(hero.position, hero.rotation, hero.step),
                  hero.step,
                  this.handleUpdateHeroMove
                )).executeIn = Ease.EXECUTE_IN_UPDATE;
              }
            } else {
              linearSumableTo.x += item.to.x;
              linearSumableTo.y += item.to.y;
            }
          } else if (item.action === ActionNames.TURN) {
            hero.apply(hero.x, hero.y, Tools.angleBetweenPoints(hero.position, item.to));

            this.mouse = { x: item.to.x, y: item.to.y };
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
      )).executeIn = Ease.EXECUTE_IN_UPDATE;
    }

    Keeper.walk(Ease.EXECUTE_IN_UPDATE);

    super.update();
  }

  draw(interpolation) {
    super.draw(interpolation);

    const hero = this.hero;
    const position = hero.position;
    const mouse = this.mouse;

    if (interpolation === 1 && mouse !== undefined) {
      this.context.tracer(
        Tools.sumPoints(
          Tools.rotatePoint(
            hero.gunTip,
            hero.angle
          ),
          position
        ),
        mouse
      );
    }

    Keeper.walk(Ease.EXECUTE_IN_DRAW);
  }
}
