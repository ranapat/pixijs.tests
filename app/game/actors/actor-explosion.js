import * as PIXI from 'pixi.js';

import Actor from './actor';
import ActorNames from './actor-names';

import ConfigExplosion from '../../config/config-explosion';

const SKIP_FRAMES = ConfigExplosion.skipFrames;
const REGIONS = ConfigExplosion.regions;
const WIDTH = ConfigExplosion.width;
const HEIGHT = ConfigExplosion.height;

export default class ActorExplosion extends Actor {
  constructor() {
    super(ActorNames.EXPLOSION);

    this.texture = PIXI.loader.resources[this.asset].texture;
    this.hero = new PIXI.Sprite(this.texture);

    this.applyInternals();

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  hop() {
    this.applyInternals();
  }

  applyInternals() {
    this.texture.frame = this.clip;
  }

  get asset() {
    return ConfigExplosion.asset;
  }

  get sprite() {
    return this.hero;
  }

  apply(x, y) {
    const position = this.hero.position;

    if (x !== undefined) {
      position.x = x;
      this.x = x;
    }

    if (y !== undefined) {
      position.y = y;
      this.y = y;
    }

    this.applyInternals();
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
