import ConfigHero from './config-hero';
import ConfigRobot from './config-robot';

export default class ConfigResources {
  static get requiredResources() {
    return [
      '../../shared/images/actors/explosion.png',
      ConfigRobot.asset,
      '../../shared/images/actors/rocket.png',
      ConfigHero.asset,
    ];
  }
}
