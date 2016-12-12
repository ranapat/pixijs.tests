import Ease from './ease';

export default class Keeper {
  static queue = [];

  static add(ease) {
    let i;
    let item;
    const queue = Keeper.queue;
    const length = queue.length;

    for (i = 0; i < length; i += 1) {
      item = queue[i];

      if (ease.preferAlone(item)) {
        queue.splice(i, 1);

        break;
      }
    }

    queue.push(ease);

    return ease;
  }

  static walk(executeIn) {
    let ease;
    const queue = Keeper.queue;
    let i;

    for (i = 0; i < queue.length; i += 1) {
      ease = queue[i];
      if (
        executeIn === undefined
        || ease.executeIn === Ease.EXECUTE_IN_BOTH
        || executeIn === ease.executeIn
      ) {
        if (!ease.ready) {
          ease.poke();
        } else {
          ease.finish();
          queue.splice(i, 1);

          i -= 1;
        }
      }
    }
  }
}
