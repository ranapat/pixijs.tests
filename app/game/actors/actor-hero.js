import Actor from './actor';
import ActorNames from './actor-names';

import ConfigHero from '../../config/config-hero';

const step = ConfigHero.heroStep;

export default class ActorHero extends Actor {
  constructor() {
    super(ActorNames.HERO);

    this.ready = false;

    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnError = this.handleOnError.bind(this);

    this.image = new Image();
    this.image.onload = this.handleOnLoad;
    this.image.onerror = this.handleOnError;
    this.image.src = '../../../shared/images/actors/hero.png';
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
    return step;
  }

  get gunTip() {
    return { x: 15, y: -42 };
  }
}
