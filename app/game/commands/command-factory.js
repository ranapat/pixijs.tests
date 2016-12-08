import CommandNames from './command-names';

import CommandTurn from './command-turn';
import CommandMove from './command-move';

export default class CommandFactory {
  static move(actor, to) {
    return new CommandMove(actor, to);
  }

  static turn(actor, to) {
    return new CommandTurn(actor, to);
  }

  static get(name, ...args) {
    switch (name) {
      case CommandNames.TURN: return CommandFactory.turn(...args);
      case CommandNames.MOVE: return CommandFactory.move(...args);
      default: return null;
    }
  }
}
