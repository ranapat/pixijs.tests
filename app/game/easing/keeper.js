export default class Keeper {
  static queue = [];

  static add(ease) {
    let i;
    let item;
    const queue = Keeper.queue;
    const length = queue.length;

    for (i = 0; i < length; i += 1) {
      item = queue[i];
      if (item.target === ease.target) {
        queue.splice(i, 1);

        break;
      }
    }

    Keeper.queue.push(ease);
  }

  static walk() {
    let ease;
    const queue = Keeper.queue;
    let i;

    for (i = 0; i < queue.length; i += 1) {
      ease = queue[i];

      if (!ease.ready) {
        ease.poke();
      } else {
        queue.splice(i, 1);

        i -= 1;
      }
    }
  }
}
