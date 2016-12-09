import Command from './command';
import CommandNames from './command-names';

export default class CommandUnshift extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.UNSHIFT, to);
  }
}
