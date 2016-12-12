import ConfigDestination from '../../config/config-destination';

const TO_RADIANS = Math.PI / 180;
const CIRCLE_RADIUS = ConfigDestination.circleRadius;

export default class Painter {
  constructor(context) {
    this.context = context;
    this.width = this.context.width;
    this.height = this.context.height;
  }

  clip(image, clip, x, y, angle) {
    const context = this.context;

    if (angle !== undefined) {
      context.save();

      context.translate(x, y);
      context.rotate(angle * TO_RADIANS);
      context.drawImage(
        image,
        clip.x, clip.y, clip.width, clip.height,
        -clip.width / 2, -clip.height / 2,
        clip.width, clip.height
      );

      context.restore();
    } else {
      context.drawImage(image, clip.x, clip.y, clip.width, clip.height, x, y, clip.width, clip.height);
    }
  }

  draw(image, x, y, angle) {
    const context = this.context;

    if (angle !== undefined) {
      context.save();

      context.translate(x, y);
      context.rotate(angle * TO_RADIANS);
      context.drawImage(image, -image.width / 2, -image.height / 2);

      context.restore();
    } else {
      context.drawImage(image, x, y);
    }
  }

  clear() {
    const context = this.context;

    context.clearRect(0, 0, this.width, this.height);

    context.beginPath();

    context.rect(0, 0, this.width, this.height);
    context.fillStyle = '#2f2f2f';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#2f2f2f';

    context.stroke();
  }

  tracer(from, to) {
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
  }

  destination(position, radius) {
    const context = this.context;
    const alpha = 1 - (radius / CIRCLE_RADIUS);

    context.beginPath();

    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = `rgba(255, 0, 0, ${alpha})`;

    context.stroke();
  }
}
