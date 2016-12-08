import Controller from './controller';

import Config from '../../config/config';
import CommandNames from '../commands/command-names';
import ActorNames from '../actors/actor-names';

const offset = Config.heroStep * 10;

export default class ControllerKeyboard extends Controller {
  constructor(stack, window) {
    super(stack);

    this.window = window;

    this.shiftLeft = false;
    this.shiftRight = false;
    this.shiftUp = false;
    this.shiftDown = false;

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.initializeEvents();
  }

  getShift() {
    let x = 0;
    let y = 0;

    if (this.shiftLeft) {
      x = -offset;
    } else if (this.shiftRight) {
      x = offset;
    }

    if (this.shiftUp) {
      y = -offset;
    } else if (this.shiftDown) {
      y = offset;
    }

    return (x !== 0 || y !== 0) ? { x, y } : undefined;
  }

  setShiftState(keyCode, state) {
    switch (keyCode) {
      case Config.keyboardShiftUp: this.shiftUp = state; break;
      case Config.keyboardShiftDown: this.shiftDown = state; break;
      case Config.keyboardShiftLeft: this.shiftLeft = state; break;
      case Config.keyboardShiftRight: this.shiftRight = state; break;
      default: /**/
    }
  }

  handleKeyUp(e) {
    console.log(`up ${e.keyCode}`);
    if (this.started) {
      this.setShiftState(e.keyCode, false);
    }
  }

  handleKeyDown(e) {
    console.log(`down ${e.keyCode}`);
    if (this.started) {
      this.setShiftState(e.keyCode, true);
      const shift = this.getShift();
      if (shift !== undefined) {
        this.emit(CommandNames.SHIFT, ActorNames.HERO, shift);
      }
    }
  }

  initializeEvents() {
    this.window.addEventListener('keydown', this.handleKeyDown, false);
    this.window.addEventListener('keyup', this.handleKeyUp, false);
  }
}
