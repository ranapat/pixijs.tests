import Controller from './controller';

import CommandNames from '../commands/command-names';
import ActorNames from '../actors/actor-names';

export default class ControllerMouse extends Controller {
  constructor(stack, canvas) {
    super(stack);

    this.canvas = canvas;
    this.rectangle = undefined;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);

    this.initializeRectangle();
    this.initializeEvents();
  }

  getPoint(e) {
    return {
      x: e.clientX - this.rectangle.left,
      y: e.clientY - this.rectangle.top,
    };
  }

  handleMouseMove(e) {
    if (this.started) {
      this.emit(CommandNames.TURN, ActorNames.HERO, this.getPoint(e));
    }
  }

  handleMouseDown(e) {
    if (this.started) {
      if (e.button > 0) {
        this.emit(CommandNames.MOVE, ActorNames.HERO, this.getPoint(e));
      } else {
        this.emit(CommandNames.FIRE, ActorNames.ROCKET, this.getPoint(e));
      }
    }
  }

  initializeRectangle() {
    this.rectangle = this.canvas.getBoundingClientRect();
  }

  initializeEvents() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove, false);
    this.canvas.addEventListener('mousedown', this.handleMouseDown, false);
  }
}
