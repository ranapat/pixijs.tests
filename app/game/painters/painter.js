import * as PIXI from 'pixi.js';

/*
import ConfigDestination from '../../config/config-destination';

const CIRCLE_RADIUS = ConfigDestination.circleRadius;
*/

export default class Painter {
  constructor(renderer, stage) {
    this.renderer = renderer;
    this.stage = stage;

    this.line = undefined;
    this.circle = undefined;
  }

  get width() {
    return this.renderer.width;
  }

  get height() {
    return this.renderer.height;
  }

  addChild(child) {
    this.stage.addChild(child);
  }

  render() {
    this.renderer.render(this.stage);
  }

  tracer(from, to) {
    if (this.line !== undefined) {
      this.line.parent.removeChild(this.line);
    }
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xFF0000);

    graphics.moveTo(from.x, from.y);
    graphics.lineTo(to.x, to.y);

    graphics.endFill();

    this.stage.addChild(graphics);

    this.line = graphics;
  }

  destination(position, radius) {
    if (this.circle !== undefined) {
      this.circle.parent.removeChild(this.circle);
    }

    const graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xFF0000);
    graphics.drawCircle(position.x, position.y, radius);
    graphics.endFill();

    this.stage.addChild(graphics);

    this.circle = graphics;
  }
}
