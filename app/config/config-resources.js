import ConfigHero from './config-hero';
import ConfigRobot from './config-robot';
import ConfigRocket from './config-rocket';
import ConfigExplosion from './config-explosion';

export default class ConfigResources {
  static get requiredResources() {
    return [
      ConfigExplosion.asset,
      ConfigRobot.asset,
      ConfigRocket.asset,
      ConfigHero.asset,
    ];
  }
}
