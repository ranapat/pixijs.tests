export default class ConfigRocket {
  static get skipFrames() { return 1; }
  static get step() { return 10; }
  static get homingStep() { return 2; }
  static get fireOffset() { return 80; }
  static get width() { return 26; }
  static get height() { return 49; }
  static get asset() { return '../../shared/images/actors/rocket.png'; }
  static get regions() {
    const result = [];
    let i;

    for (i = 0; i < 4; i += 1) {
      result.push({
        x: i * 26,
        y: 0,
        width: 26,
        height: 49,
      });
    }

    return result;
  }
}
