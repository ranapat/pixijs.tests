import Actor from './actor';
import ActorNames from './actor-names';

import ConfigRocket from '../../config/config-rocket';

const STEP = ConfigRocket.step;
const FIRE_OFFSET = ConfigRocket.fireOffset;
const SKIP_FRAMES = ConfigRocket.skipFrames;
const REGIONS = ConfigRocket.regions;
const WIDTH = ConfigRocket.width;
const HEIGHT = ConfigRocket.height;

export default class ActorRocket extends Actor {
  constructor() {
    super(ActorNames.ROCKET);

    this.ready = false;

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);

    this.image = new Image();
    this.image.onload = this.handleOnLoad;
    this.image.onerror = this.handleOnError;
    this.image.src = ConfigRocket.asset;

    this.frame = undefined;
    this.skipFrames = undefined;
  }

  handleOnLoad() {
    this.ready = true;
  }

  handleOnError() {
    console.log('Rocket asset cannot be loaded.');
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
    return this.rotation + 10;
  }

  get fireAngle() {
    return FIRE_OFFSET;
  }

  get step() {
    return STEP;
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
