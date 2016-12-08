import Actor from './actor';
import ActorNames from './actor-names';

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

  apply(position) {
    console.log(position);
  }
}
