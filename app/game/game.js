import Config from '../config/config';

import CommandStack from './commands/command-stack';
import ControllerMouse from './controllers/controller-mouse';

import Painter from './painters/painter';

import SceneOne from './scenes/scene-one';

const skipTicks = 1000 / Config.fps;
const maxFrameSkip = Config.maxFrameSkip;

export default class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.stack = new CommandStack();
    this.mouse = new ControllerMouse(this.stack, this.canvas);
    this.painter = new Painter(this.context);
    this.scene = new SceneOne(this.stack, this.painter);

    this.nextGameTick = Date.now();

    this.mouse.start();
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

    while (now > this.nextGameTick && loops < maxFrameSkip) {
      this.update();

      this.nextGameTick += skipTicks;
      loops += 1;
    }

    if (loops === 0) {
      this.draw(1 - ((this.nextGameTick - now) / skipTicks));
    } else {
      this.draw(1);
    }
  }
}
