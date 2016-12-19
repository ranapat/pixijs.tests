import * as PIXI from 'pixi.js';

import Actor from './actor';
import ActorNames from './actor-names';

import ConfigRocket from '../../config/config-rocket';

const STEP = ConfigRocket.step;
const HOMING_STEP = ConfigRocket.homingStep;
const FIRE_OFFSET = ConfigRocket.fireOffset;
const SKIP_FRAMES = ConfigRocket.skipFrames;
const REGIONS = ConfigRocket.regions;
const WIDTH = ConfigRocket.width;
const HEIGHT = ConfigRocket.height;

export default class ActorRocket extends Actor {
  constructor() {
    super(ActorNames.ROCKET);

    this.texture = PIXI.loader.resources[this.asset].texture;
    this.hero = new PIXI.Sprite(this.texture);
    this.hero.anchor.x = 0.5;
    this.hero.anchor.y = 0.5;

    this.applyInternals();

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  applyInternals() {
    this.texture.frame = this.clip;
  }

  get asset() {
    return ConfigRocket.asset;
  }

  get sprite() {
    return this.hero;
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
      this.hero.rotation = rotation;
      this.rotation = rotation;
    }

    this.applyInternals();
  }

  get fireAngle() {
    return FIRE_OFFSET * (Math.PI / 180);
  }

  get step() {
    return STEP;
  }

  get homingStep() {
    return HOMING_STEP;
  }

  get clip() {
    let frame = this.frame;
    let skipFrames = this.skipFrames;
    let nextFrame;

    frame = frame === undefined ? 0 : frame;
    skipFrames = skipFrames === undefined ? 0 : skipFrames;
    nextFrame = frame;

    frame = frame >= REGIONS.length ? 0 : frame;

    if (skipFrames === 0 || skipFrames > SKIP_FRAMES) {
      skipFrames = skipFrames > SKIP_FRAMES ? 0 : skipFrames;
      nextFrame = frame + 1;
    }

    const clip = REGIONS[frame];

    this.frame = nextFrame;
    this.skipFrames = skipFrames + 1;

    return clip;
  }

  get width() {
    return WIDTH;
  }

  get height() {
    return HEIGHT;
  }

  get finished() {
    return this.frame === REGIONS.length;
  }
}
