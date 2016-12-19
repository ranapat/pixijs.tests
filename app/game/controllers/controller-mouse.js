import Controller from './controller';

import CommandNames from '../commands/command-names';
import ActorNames from '../actors/actor-names';

export default class ControllerMouse extends Controller {
  constructor(stack, renderer, stage) {
    super(stack);

    this.renderer = renderer;
    this.stage = stage;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);

    this.renderer.view.addEventListener('contextmenu', this.handleOnContextMenu, false);

    this.initializeEvents();
  }

  handleOnContextMenu() {
    this.emit(CommandNames.MOVE, ActorNames.HERO, this.getPoint());
  }

  getPoint() {
    const global = this.renderer.plugins.interaction.mouse.global;
    const x = global.x;
    const y = global.y;

    return { x, y };
  }

  handleMouseMove() {
    if (this.started) {
      this.emit(CommandNames.TURN, ActorNames.HERO, this.getPoint());
    }
  }

  handleMouseDown() {
    if (this.started) {
      this.emit(CommandNames.FIRE, ActorNames.ROCKET, this.getPoint());
    }
  }

  initializeEvents() {
    this.stage.on('mousemove', this.handleMouseMove);
    this.stage.on('mousedown', this.handleMouseDown);
  }
}
