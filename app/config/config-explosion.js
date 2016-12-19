export default class ConfigExplosion {
  static get skipFrames() { return 1; }
  static get width() { return 128; }
  static get height() { return 128; }
  static get asset() { return '../../shared/images/actors/explosion.png'; }
  static get regions() {
    const result = [];
    let i;

    for (i = 0; i < 40; i += 1) {
      result.push({
        x: i * 128,
        y: 0,
        width: 128,
        height: 128,
      });
    }

    return result;
  }
}
