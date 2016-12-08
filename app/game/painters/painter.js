export default class Painter {
  constructor(context) {
    this.context = context;
    this.width = this.context.width;
    this.height = this.context.height;
  }

  draw(image, x, y) {
    this.context.drawImage(image, x, y);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
