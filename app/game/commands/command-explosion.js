import Command from './command';
import CommandNames from './command-names';

export default class CommandExplosion extends Command {
  constructor(actor, to) {
    super(actor, CommandNames.EXPLOSTION, to);
  }
}
