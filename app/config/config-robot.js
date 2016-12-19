import ConfigHero from './config-hero';

export default class ConfigRobot extends ConfigHero {
  static get step() { return 2; }
  static get asset() { return '../../shared/images/actors/robot.png'; }
}
