import Config from '../config/config';

export default class Initialize {
  constructor(_document) {
    this.document = _document;
    this.container = document.getElementById('root');
    this.canvas = undefined;
    this.context = undefined;
  }

  generateError(message) {
    try {
      const element = document.createElement('div');
      element.innerHTML = `error is ${message}`;
      this.container.appendChild(element);
    } catch (e) { /**/ }
  }

  generate2dContext() {
    let success;

    try {
      this.canvas = document.createElement('canvas');
      this.container = this.container.appendChild(this.canvas);

      this.context = this.canvas.getContext('2d');

      success = true;
    } catch (e) {
      this.generateError(e.message);
    }

    return success;
  }

  adjustSize() {
    this.canvas.width = Config.width;
    this.canvas.height = Config.height;

    this.context.width = Config.width;
    this.context.height = Config.height;
  }

  preventContextMenu() {
    this.canvas.addEventListener('contextmenu', this.handleOnContextMenu, false);
  }

  cleanContext() {
    this.context.fillRect(0, 0, this.context.width, this.context.height);
  }

  handleOnContextMenu(e) {
    e.preventDefault();
  }

  generate() {
    const success = this.generate2dContext();

    if (success === true) {
      this.adjustSize();
      this.preventContextMenu();
      this.cleanContext();
    }

    return success;
  }
}
