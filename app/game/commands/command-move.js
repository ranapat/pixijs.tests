import Command from './command';
import CommandNames from './command-names';

export default class CommandMove extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.MOVE, to);
  }
}
