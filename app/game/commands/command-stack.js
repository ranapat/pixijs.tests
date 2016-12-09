import CommandNames from './command-names';

const SINGLE_SIMILAR_COMMANDS = [
  CommandNames.MOVE,
  CommandNames.TURN,
];
const SINGLE_EXACT_COMMANDS = [
  CommandNames.SHIFT,
];
const APPLY_BACK_COMMANDS = [
  CommandNames.SHIFT,
];

export default class CommandStack {
  constructor() {
    this.queue = [];

    this.reapply = [];
  }

  pushCommand(command) {
    this.queue.push(command);
  }

  keepSingleSimilarCommand(command) {
    let item;
    const queue = this.queue;
    for (item of queue) {
      if (item.isSimilar(command)) {
        item.merge(command);

        return;
      }
    }

    this.pushCommand(command);
  }

  keepSingleExactCommand(command) {
    let item;
    const queue = this.queue;
    for (item of queue) {
      if (item.isExact(command)) {
        return;
      }
    }

    this.pushCommand(command);
  }

  tryToPushCommand(command) {
    if (SINGLE_SIMILAR_COMMANDS.indexOf(command.action) !== -1) {
      this.keepSingleSimilarCommand(command);
    } else if (SINGLE_EXACT_COMMANDS.indexOf(command.action) !== -1) {
      this.keepSingleExactCommand(command);
    } else {
      this.pushCommand(command);
    }
  }

  removeMatchingShiftCommand(command) {
    let i;
    let item;
    const queue = this.queue;
    const length = queue.length;
    for (i = 0; i < length; i += 1) {
      item = queue[i];
      console.log(item.to);
      console.log(command.to);

      if (item.action === CommandNames.SHIFT && item.isToExact(command)) {
        queue.splice(i, 1);

        return;
      }
    }
  }

  tryExceptionalCommand(command) {
    let handled = false;

    if (command.action === CommandNames.UNSHIFT) {
      this.removeMatchingShiftCommand(command);

      handled = true;
    }

    return handled;
  }

  add(command) {
    if (!this.tryExceptionalCommand(command)) {
      this.tryToPushCommand(command);
    }

    console.log(this.queue.length);
  }

  get() {
    let result;

    const queue = this.queue;
    if (queue.length > 0) {
      const item = queue[0];

      if (APPLY_BACK_COMMANDS.indexOf(item.action) !== -1) {
        this.reapply.push(item);
      }

      result = queue.shift();
    }

    return result;
  }

  rest() {
    const queue = this.queue;
    const reapply = this.reapply;

    while (reapply.length !== 0) {
      queue.push(reapply.shift());
    }
  }

  get length() {
    return this.queue.length;
  }
}
