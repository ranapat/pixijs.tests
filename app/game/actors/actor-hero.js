import Actor from './actor';
import ActorNames from './actor-names';

import ConfigHero from '../../config/config-hero';

const STEP = ConfigHero.step;
const SKIP_FRAMES = ConfigHero.skipFrames;
const REGIONS = ConfigHero.regions;
const STANDING = REGIONS.standing;
const MOVING = REGIONS.moving;
const GUN_TIP = ConfigHero.gunTip;

export default class ActorHero extends Actor {
  constructor() {
    super(ActorNames.HERO);

    this.ready = false;

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);

    this.image = new Image();
    this.image.onload = this.handleOnLoad;
    this.image.onerror = this.handleOnError;
    this.image.src = this.asset;

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  get asset() {
    return ConfigHero.asset;
  }

  handleOnLoad() {
    this.ready = true;
  }

  handleOnError() {
    console.log('Hero asset cannot be loaded.');
  }

  apply(x, y, rotation) {
    if (x !== undefined) {
      this.x = x;
    }

    if (y !== undefined) {
      this.y = y;
    }

    if (rotation !== undefined) {
      this.rotation = rotation;
    }
  }

  get angle() {
    return this.rotation + 80;
  }

  get step() {
    return STEP;
  }

  get gunTip() {
    return GUN_TIP;
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
    }
  }
}
