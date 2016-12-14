import Command from './command';
import CommandNames from './command-names';

export default class CommandFire extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.FIRE, to);
  }
}
