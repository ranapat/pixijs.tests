import Command from './command';
import CommandNames from './command-names';

export default class CommandTurn extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.TURN, to);
  }
}
