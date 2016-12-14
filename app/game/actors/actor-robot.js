import ActorHero from './actor-hero';
import ActorNames from './actor-names';

import ConfigRobot from '../../config/config-robot';

const STEP = ConfigRobot.step;

export default class ActorRobot extends ActorHero {
  constructor() {
    super();

    this.name = ActorNames.ROBOT;
  }

  get asset() {
    return ConfigRobot.asset;
  }

  handleOnError() {
    console.log('Robot asset cannot be loaded.');
  }

  get step() {
    return STEP;
  }
}
