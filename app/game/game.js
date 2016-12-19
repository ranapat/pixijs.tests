import Config from '../config/config';

import CommandStack from './commands/command-stack';

import ControllerMouse from './controllers/controller-mouse';
import ControllerKeyboard from './controllers/controller-keyboard';

import Painter from './painters/painter';

import SceneOne from './scenes/scene-one';

const SKIP_TICKS = 1000 / Config.fps;
const MAX_FRAME_SKIP = Config.maxFrameSkip;

export default class Game {
  constructor(renderer, stage) {
    this.renderer = renderer;
    this.stage = stage;

    this.stack = new CommandStack();
    this.mouse = new ControllerMouse(this.stack, this.renderer, this.stage);
    this.keyboard = new ControllerKeyboard(this.stack, window);
    this.painter = new Painter(this.renderer, this.stage);
    this.scene = new SceneOne(this.stack, this.painter);

    this.nextGameTick = Date.now();

    this.mouse.start();
    this.keyboard.start();
  }

  update() {
    this.scene.update();
  }

  draw(interpolation) {
    this.scene.draw(interpolation);
  }

  loop() {
    const now = Date.now();
    let loops = 0;

    while (now > this.nextGameTick && loops < MAX_FRAME_SKIP) {
      this.update();

      this.nextGameTick += SKIP_TICKS;
      loops += 1;
    }

    if (loops === 0) {
      this.draw(1 - ((this.nextGameTick - now) / SKIP_TICKS));
    } else {
      this.draw(1);
    }
  }
}
