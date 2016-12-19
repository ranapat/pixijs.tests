import * as PIXI from 'pixi.js';

import Actor from './actor';
import ActorNames from './actor-names';

import ConfigHero from '../../config/config-hero';

const ROTATION_SHIFT = (80 * Math.PI) / 180;
const STEP = ConfigHero.step;
const SKIP_FRAMES = ConfigHero.skipFrames;
const REGIONS = ConfigHero.regions;
const STANDING = REGIONS.standing;
const MOVING = REGIONS.moving;
const GUN_TIP = ConfigHero.gunTip;

export default class ActorHero extends Actor {
  constructor() {
    super(ActorNames.HERO);

    this.texture = PIXI.loader.resources[this.asset].texture;
    this.hero = new PIXI.Sprite(this.texture);
    this.hero.anchor.x = 0.5;
    this.hero.anchor.y = 0.5;

    this.applyInternals();

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  get sprite() {
    return this.hero;
  }

  get asset() {
    return ConfigHero.asset;
  }

  apply(x, y, rotation) {
    const position = this.hero.position;

    if (x !== undefined) {
      position.x = x;
      this.x = x;
    }

    if (y !== undefined) {
      position.y = y;
      this.y = y;
    }

    if (rotation !== undefined) {
      this.hero.rotation = rotation + this.rotationShift;
      this.rotation = rotation;
    }

    this.applyInternals();
  }

  get rotationShift() {
    return ROTATION_SHIFT;
  }

  get step() {
    return STEP;
  }

  get gunTip() {
    return GUN_TIP;
  }

  applyInternals() {
    this.texture.frame = this.clip;
  }

  get clip() {
    let frame = this.frame;
    let skipFrames = this.skipFrames;
    let clip;
    let nextFrame;

    frame = frame === undefined ? 0 : frame;
    skipFrames = skipFrames === undefined ? 0 : skipFrames;
    nextFrame = frame;

    if (this.isMoving) {
      frame = frame >= MOVING.length ? 0 : frame;
    } else {
      frame = frame >= STANDING.length ? 0 : frame;
    }

    if (skipFrames === 0 || skipFrames > SKIP_FRAMES) {
      skipFrames = skipFrames > SKIP_FRAMES ? 0 : skipFrames;
      nextFrame = frame + 1;
    }

    if (this.isMoving) {
      clip = MOVING[frame];
    } else {
      clip = STANDING[frame];
    }

    this.frame = nextFrame;
    this.skipFrames = skipFrames + 1;

    return clip;
  }

  set moving(value) {
    if (value !== super.moving) {
      super.moving = value;

      this.frame = 0;
      this.skipFrames = 0;

      this.applyInternals();
    }
  }

}
