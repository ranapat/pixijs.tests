import Controller from './controller';

import ConfigHero from '../../config/config-hero';
import ConfigKeyboard from '../../config/config-keyboard';

import CommandNames from '../commands/command-names';
import CommandModifiers from '../commands/command-modifiers';
import ActorNames from '../actors/actor-names';

const OFFSET = ConfigHero.step * 10;

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
      case ConfigKeyboard.keyboardShiftUp: return { x: 0, y: -OFFSET };
      case ConfigKeyboard.keyboardShiftDown: return { x: 0, y: OFFSET };
      case ConfigKeyboard.keyboardShiftLeft: return { x: -OFFSET, y: 0 };
      case ConfigKeyboard.keyboardShiftRight: return { x: OFFSET, y: 0 };
      default: return undefined;
    }
  }

  setShiftState(keyCode, state) {
    let changed = false;

    switch (keyCode) {
      case ConfigKeyboard.keyboardShiftUp: changed = this.shiftUp !== state; this.shiftUp = state; break;
      case ConfigKeyboard.keyboardShiftDown: changed = this.shiftDown !== state; this.shiftDown = state; break;
      case ConfigKeyboard.keyboardShiftLeft: changed = this.shiftLeft !== state; this.shiftLeft = state; break;
      case ConfigKeyboard.keyboardShiftRight: changed = this.shiftRight !== state; this.shiftRight = state; break;
      default: /**/
    }

    return changed;
  }

  handleKeyUp(e) {
    if (this.started) {
      if (this.setShiftState(e.keyCode, false)) {
        this.emit(CommandNames.UNSHIFT, ActorNames.HERO, this.getShift(e.keyCode));
      }

      if (e.keyCode === ConfigKeyboard.keyboardSteer && this.steerModifier) {
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

      if (e.keyCode === ConfigKeyboard.keyboardSteer && !this.steerModifier) {
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
