import Controller from './controller';

import Config from '../../config/config';
import CommandNames from '../commands/command-names';
import CommandModifiers from '../commands/command-modifiers';
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

    this.steerModifier = false;

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.initializeEvents();
  }

  getShift(keyCode) {
    switch (keyCode) {
      case Config.keyboardShiftUp: return { x: 0, y: -offset };
      case Config.keyboardShiftDown: return { x: 0, y: offset };
      case Config.keyboardShiftLeft: return { x: -offset, y: 0 };
      case Config.keyboardShiftRight: return { x: offset, y: 0 };
      default: return undefined;
    }
  }

  setShiftState(keyCode, state) {
    let changed = false;

    switch (keyCode) {
      case Config.keyboardShiftUp: changed = this.shiftUp !== state; this.shiftUp = state; break;
      case Config.keyboardShiftDown: changed = this.shiftDown !== state; this.shiftDown = state; break;
      case Config.keyboardShiftLeft: changed = this.shiftLeft !== state; this.shiftLeft = state; break;
      case Config.keyboardShiftRight: changed = this.shiftRight !== state; this.shiftRight = state; break;
      default: /**/
    }

    return changed;
  }

  handleKeyUp(e) {
    if (this.started) {
      if (this.setShiftState(e.keyCode, false)) {
        this.emit(CommandNames.UNSHIFT, ActorNames.HERO, this.getShift(e.keyCode));
      }

      if (e.keyCode === Config.keyboardSteer && this.steerModifier) {
        this.steerModifier = false;

        this.unmodify(CommandModifiers.FOLLOW);
      }
    }
  }

  handleKeyDown(e) {
    if (this.started) {
      if (this.setShiftState(e.keyCode, true)) {
        this.emit(CommandNames.SHIFT, ActorNames.HERO, this.getShift(e.keyCode));
      }

      if (e.keyCode === Config.keyboardSteer && !this.steerModifier) {
        this.steerModifier = true;

        this.modify(CommandModifiers.FOLLOW);
      }
    }
  }

  initializeEvents() {
    this.window.addEventListener('keydown', this.handleKeyDown, false);
    this.window.addEventListener('keyup', this.handleKeyUp, false);
  }
}
