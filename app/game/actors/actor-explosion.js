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

    this.ready = false;

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);

    this.image = new Image();
    this.image.onload = this.handleOnLoad;
    this.image.onerror = this.handleOnError;
    this.image.src = ConfigExplosion.asset;

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  handleOnLoad() {
    this.ready = true;
  }

  handleOnError() {
    console.log('Explosion asset cannot be loaded.');
  }

  apply(x, y) {
    if (x !== undefined) {
      this.x = x;
    }

    if (y !== undefined) {
      this.y = y;
    }
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
