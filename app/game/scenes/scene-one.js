import Scene from './scene';

import Tools from '../easing/tools';

import CommandNames from '../commands/command-names';
import CommandFactory from '../commands/command-factory';
import CommandModifiers from '../commands/command-modifiers';

import ActorNames from '../actors/actor-names';
import Hero from '../actors/actor-hero';
import Robot from '../actors/actor-robot';
import Rocket from '../actors/actor-rocket';
import Explosion from '../actors/actor-explosion';

import Ease from '../easing/ease';
import Keeper from '../easing/keeper';
import Linear from '../easing/linear';
import LinearSumable from '../easing/linear-sumable';
import LinearDynamic from '../easing/linear-dynamic';
import Simple from '../easing/simple';
import Static from '../easing/static';
import Homing from '../easing/homing';

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

    this.robot = new Robot();
    this.robot.apply(STAGE_WIDTH - 50, STAGE_HEIGHT - 50, 270);
    this.actors.push(this.robot);
    this.triggerRobotRotate = false;

    this.mouse = undefined;
    this.destination = undefined;

    this.heroLinearSumable = { x: 0, y: 0 };

    this.handleHeroMove = this.handleHeroMove.bind(this);
    this.handleRobotMove = this.handleRobotMove.bind(this);
    this.handleCircleRedraw = this.handleCircleRedraw.bind(this);
    this.handleRocketMove = this.handleRocketMove.bind(this);
    this.handleHomingRocketMove = this.handleHomingRocketMove.bind(this);
    this.handleExplosionRedraw = this.handleExplosionRedraw.bind(this);

    Keeper.add(
      new Linear(this.robot, { x: this.robot.position.x, y: 50 }, this.robot.step, this.handleRobotMove)
    ).executeIn = Ease.EXECUTE_IN_UPDATE;
  }

  handleHeroMove(position, ready) {
    if (!ready) {
      const x = Math.min(STAGE_WIDTH - 200, Math.max(0, position.x));
      const y = Math.min(STAGE_HEIGHT, Math.max(0, position.y));

      this.hero.apply(x, y);
      this.hero.moving = true;
    } else {
      this.hero.moving = false;
    }
  }

  handleRobotMove(position, ready) {
    if (!ready) {
      const x = Math.min(STAGE_WIDTH, Math.max(0, position.x));
      const y = Math.min(STAGE_HEIGHT, Math.max(0, position.y));

      this.robot.apply(x, y);
      this.robot.moving = true;
    } else {
      this.robot.moving = false;

      this.triggerRobotRotate = true;
    }
  }

  rotateRobot() {
    this.robot.apply(undefined, undefined, this.robot.rotation + 180);
    Keeper.add(
      new Linear(
        this.robot,
        { x: this.robot.position.x, y: this.robot.position.y === 50 ? STAGE_HEIGHT - 50 : 50 },
        this.robot.step,
        this.handleRobotMove
      )
    ).executeIn = Ease.EXECUTE_IN_UPDATE;
  }

  handleCircleRedraw(radius) {
    if (this.destination !== undefined) {
      this.context.destination(this.destination, radius);
    }
  }

  handleRocketMove(rocket, position, complete) {
    if (complete) {
      const stack = this.stack;
      const actors = this.actors;
      const index = actors.indexOf(rocket);

      if (index !== -1) {
        actors.splice(index, 1);
      }

      stack.add(CommandFactory.get(CommandNames.EXPLOSION, ActorNames.EXPLOSION, position));
    } else {
      rocket.apply(position.x, position.y);
    }
  }

  handleHomingRocketMove(rocket, position, angle, complete) {
    if (complete) {
      this.handleRocketMove(rocket, position, complete);
    } else {
      rocket.apply(position.x, position.y, angle + rocket.fireAngle);
    }
  }

  handleExplosionRedraw(explosion, complete) {
    if (complete) {
      const actors = this.actors;
      const index = actors.indexOf(explosion);

      if (index !== -1) {
        actors.splice(index, 1);
      }
    }
  }

  handleHero(item) {
    const hero = this.hero;
    const stack = this.stack;

    const followModifier = stack.isModified(CommandModifiers.FOLLOW);
    const heroLinearSumable = this.heroLinearSumable;

    if (item.action === CommandNames.MOVE) {
      Keeper.add(
        new Linear(hero, item.to, hero.step, this.handleHeroMove)
      ).executeIn = Ease.EXECUTE_IN_UPDATE;

      this.destination = { x: item.to.x, y: item.to.y };
      Keeper.add(
        new Simple(TARGET_CIRCLE, 0, CIRCLE_RADIUS, CIRCLE_RADIUS_STEP, this.handleCircleRedraw)
      ).executeIn = Ease.EXECUTE_IN_DRAW;
    } else if (item.action === CommandNames.SHIFT) {
      if (followModifier) {
        if (item.to.x === 0 && item.to.y < 0) {
          Keeper.add(new Linear(
            hero,
            Tools.offsetWithStep(hero.position, hero.rotation, hero.step),
            hero.step,
            this.handleHeroMove
          )).executeIn = Ease.EXECUTE_IN_UPDATE;
        }
      } else {
        heroLinearSumable.x += item.to.x;
        heroLinearSumable.y += item.to.y;
      }
    } else if (item.action === CommandNames.TURN) {
      hero.apply(hero.x, hero.y, Tools.angleBetweenPoints(hero.position, item.to));

      this.mouse = { x: item.to.x, y: item.to.y };
    }
  }

  handleRocket(item) {
    if (item.action === CommandNames.FIRE) {
      const rocket = new Rocket();
      const hero = this.hero;
      const robot = this.robot;

      const stack = this.stack;
      const homingRocketModifier = stack.isModified(CommandModifiers.HOMING_ROCKET);

      const gunTip = Tools.sumPoints(
        hero.position,
        Tools.rotatePoint(
          hero.gunTip,
          hero.angle
        )
      );

      rocket.apply(
        gunTip.x,
        gunTip.y,
        Tools.angleBetweenPoints(hero.position, item.to) + rocket.fireAngle
      );
      this.actors.push(rocket);

      if (!homingRocketModifier) {
        Keeper.add(new LinearDynamic(
          rocket,
          item.to,
          rocket.step,
          this.handleRocketMove
        )).executeIn = Ease.EXECUTE_IN_UPDATE;
      } else {
        Keeper.add(new Homing(
          rocket,
          robot,
          rocket.homingStep,
          this.handleHomingRocketMove
        )).executeIn = Ease.EXECUTE_IN_UPDATE;
      }
    }
  }

  handleExplosion(item) {
    const explosion = new Explosion();

    explosion.apply(item.to.x - (explosion.width / 2), item.to.y - (explosion.height / 2));
    this.actors.push(explosion);

    Keeper.add(new Static(
      explosion,
      this.handleExplosionRedraw
    )).executeIn = Ease.EXECUTE_IN_UPDATE;
  }

  update() {
    const hero = this.hero;
    const stack = this.stack;

    const heroLinearSumable = this.heroLinearSumable;
    heroLinearSumable.x = 0;
    heroLinearSumable.y = 0;

    let item;

    do {
      item = stack.get();

      if (item !== undefined) {
        switch (item.actor) {
          case hero.name: this.handleHero(item); break;
          case ActorNames.ROCKET: this.handleRocket(item); break;
          case ActorNames.EXPLOSION: this.handleExplosion(item); break;
          default: console.log(`command not handled :: ${item.actor} .. ${item.action}`);
        }
      }
    } while (item !== undefined);

    if (heroLinearSumable.x !== 0 || heroLinearSumable.y !== 0) {
      Keeper.add(new LinearSumable(
        hero,
        { x: hero.position.x + heroLinearSumable.x, y: hero.position.y + heroLinearSumable.y },
        hero.step,
        this.handleHeroMove
      )).executeIn = Ease.EXECUTE_IN_UPDATE;
    }

    if (this.triggerRobotRotate) {
      this.triggerRobotRotate = false;
      this.rotateRobot();
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
