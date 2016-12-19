import * as PIXI from 'pixi.js';

import Config from '../config/config';
import ConfigResources from '../config/config-resources';

export default class Initialize {
  constructor(_document, callback) {
    this.document = _document;
    this.container = document.getElementById('root');
    this.callback = callback;

    this.renderer = undefined;
    this.stage = undefined;

    this.handleRequiredResourcesComplete = this.handleRequiredResourcesComplete.bind(this);

    this.generate();
  }

  generate() {
    this.renderer = PIXI.autoDetectRenderer(Config.width, Config.height);
    this.container.appendChild(this.renderer.view);
    this.preventContextMenu();

    this.stage = new PIXI.Container();
    this.stage.hitArea = new PIXI.Rectangle(0, 0, Config.width, Config.height);
    this.stage.interactive = true;
    this.stage.buttonMode = true;

    PIXI.loader.add(ConfigResources.requiredResources).load(this.handleRequiredResourcesComplete);
  }

  preventContextMenu() {
    this.renderer.view.addEventListener('contextmenu', this.handleOnContextMenu, false);
  }

  handleOnContextMenu(e) {
    e.preventDefault();
  }

  handleRequiredResourcesComplete() {
    this.callback();
  }
}
