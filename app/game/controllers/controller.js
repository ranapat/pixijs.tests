import CommandFactory from '../commands/command-factory';

export default class Controller {
  constructor(stack) {
    if (new.target === Controller) {
      throw new TypeError('Cannot construct Controller directly');
    }

    this.stack = stack;
    this.started = false;
  }

  start() {
    this.started = true;
  }

  stop() {
    this.started = false;
  }

  emit(name, ...args) {
    this.stack.add(CommandFactory.get(name, ...args));
  }
}
