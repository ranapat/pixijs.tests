import Linear from './linear';

export default class LinearSumable extends Linear {
  preferAlone(ease) {
    let result;

    if (
      this.constructor.name === ease.constructor.name
      && this.target === ease.target
    ) {
      result = true;
    } else if (
      ease.constructor.name === 'Linear'
      && this.target === ease.target
    ) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }
}
