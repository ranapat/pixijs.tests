export default class Command {
  constructor(actor, action, to) {
    this.actor = actor;
    this.action = action;
    this.to = to;
  }

  isSimilar(command) {
    return this.actor === command.actor && this.action === command.action;
  }

  isToExact(command) {
    return this.to.x === command.to.x && this.to.y === command.to.y;
  }

  isExact(command) {
    return this.isSimilar(command) && this.isToExact(command);
  }

  merge(command) {
    this.to = command.to;
  }
}
