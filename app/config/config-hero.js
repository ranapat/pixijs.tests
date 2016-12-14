export default class ConfigHero {
  static get step() { return 5; }
  static get skipFrames() { return 3; }
  static get gunTip() { return { x: -11, y: -30 }; }
  static get asset() { return '../../../shared/images/actors/sniper.png'; }
  static get regions() {
    return {
      standing: [
        { x: 0, y: 0, width: 52, height: 63 },
      ],
      moving: [
        { x: 53, y: 0, width: 52, height: 63 },
        { x: 105, y: 0, width: 52, height: 63 },
        { x: 157, y: 0, width: 52, height: 63 },
        { x: 211, y: 0, width: 52, height: 63 },
        { x: 265, y: 0, width: 52, height: 63 },
        { x: 317, y: 0, width: 52, height: 63 },
        { x: 370, y: 0, width: 52, height: 63 },
      ],
    };
  }
}
