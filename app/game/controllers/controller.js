import CommandFactory from '../commands/command-factory';

export default class Controller {
  constructor(stack) {
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

  modify(modifier) {
    this.stack.modify(modifier);
  }

  unmodify(modifier) {
    this.stack.unmodify(modifier);
  }
}
