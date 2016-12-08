export default class Command {
  constructor(actor, action, to) {
    if (new.target === Command) {
      throw new TypeError('Cannot construct Command directly');
    }

    this.actor = actor;
    this.action = action;
    this.to = to;
  }

  isSimilar(command) {
    return this.actor === command.actor && this.action === command.action;
  }

  merge(command) {
    this.to = command.to;
  }
}
