import CommandNames from './command-names';

const SINGLE_COMMANDS = [
  CommandNames.MOVE,
  CommandNames.SHIFT,
  CommandNames.TURN,
];

export default class CommandStack {
  constructor() {
    this.queue = [];
  }

  pushCommand(command) {
    this.queue.push(command);
  }

  keepSingleCommand(command) {
    let i;
    const queue = this.queue;
    const length = queue.length;
    let item;
    for (i = 0; i < length; i += 1) {
      item = queue[i];
      if (item.isSimilar(command)) {
        item.merge(command);

        return;
      }
    }

    this.pushCommand(command);
  }

  tryToPushCommand(command) {
    if (SINGLE_COMMANDS.indexOf(command.action) !== -1) {
      this.keepSingleCommand(command);
    } else {
      this.pushCommand(command);
    }
  }

  add(command) {
    this.tryToPushCommand(command);
  }

  get() {
    return this.queue.length > 0 ? this.queue.shift() : undefined;
  }

  get length() {
    return this.queue.length;
  }
}
