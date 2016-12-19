/*
import ConfigDestination from '../../config/config-destination';

const CIRCLE_RADIUS = ConfigDestination.circleRadius;
*/

export default class Painter {
  constructor(renderer, stage) {
    this.renderer = renderer;
    this.stage = stage;
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

  tracer(/* from, to */) {
    /*
    const context = this.context;

    const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0.0)');

    context.beginPath();

    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);

    context.lineWidth = 1;
    context.strokeStyle = gradient;

    context.stroke();
    */
  }

  destination(/* position, radius */) {
    /*
    const context = this.context;
    const alpha = 1 - (radius / CIRCLE_RADIUS);

    context.beginPath();

    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = `rgba(255, 0, 0, ${alpha})`;

    context.stroke();
    */
  }
}
