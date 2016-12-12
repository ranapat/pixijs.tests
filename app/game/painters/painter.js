const TO_RADIANS = Math.PI / 180;

export default class Painter {
  constructor(context) {
    this.context = context;
    this.width = this.context.width;
    this.height = this.context.height;
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
    this.context.clearRect(0, 0, this.width, this.height);
  }

  tracer(from, to) {
    const context = this.context;

    const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0.1)');

    context.beginPath();

    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);

    context.lineWidth = 1;
    context.strokeStyle = gradient;

    context.stroke();
  }
}
