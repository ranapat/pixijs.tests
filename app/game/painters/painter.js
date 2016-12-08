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
}
