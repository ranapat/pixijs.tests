import CommandNames from './command-names';

import CommandTurn from './command-turn';
import CommandShift from './command-shift';
import CommandUnshift from './command-unshift';
import CommandMove from './command-move';

export default class CommandFactory {
  static move(actor, to) {
    return new CommandMove(actor, to);
  }

  static shift(actor, to) {
    return new CommandShift(actor, to);
  }

  static unshift(actor, to) {
    return new CommandUnshift(actor, to);
  }

  static turn(actor, to) {
    return new CommandTurn(actor, to);
  }

  static get(name, ...args) {
    switch (name) {
      case CommandNames.TURN: return CommandFactory.turn(...args);
      case CommandNames.SHIFT: return CommandFactory.shift(...args);
      case CommandNames.UNSHIFT: return CommandFactory.unshift(...args);
      case CommandNames.MOVE: return CommandFactory.move(...args);
      default: return null;
    }
  }
}
