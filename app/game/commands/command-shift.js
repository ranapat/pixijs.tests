import Command from './command';
import CommandNames from './command-names';

export default class CommandShift extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.SHIFT, to);
  }
}
