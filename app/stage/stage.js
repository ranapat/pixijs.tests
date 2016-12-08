import Config from '../config/config';

export default class Stage {
  constructor(game) {
    this.game = game;
    this.interval = undefined;
    this.onEachFrame = undefined;
    this.cancelOnEachFrame = undefined;

    this.stop = this.stop.bind(this);

    this.handleWindowRequestAnimationFrame = this.handleWindowRequestAnimationFrame.bind(this);
    this.handleWindowSetTimeout = this.handleWindowSetTimeout.bind(this);
    this.handleWindowCancelAnimationFrame = this.handleWindowCancelAnimationFrame.bind(this);
    this.handleWindowClearTimeout = this.handleWindowClearTimeout.bind(this);

    this.initializeOnEachFrame();
    this.initializeCancelOnEachFrame();
  }

  handleWindowRequestAnimationFrame() {
    this.game.loop();

    this.interval = window.requestAnimationFrame(this.handleWindowRequestAnimationFrame);
  }

  handleWindowSetTimeout() {
    this.game.loop();

    this.interval = window.setTimeout(this.handleWindowSetTimeout, Config.stageTimeoutDelta);
  }

  handleWindowCancelAnimationFrame() {
    if (this.interval !== undefined) {
      window.cancelAnimationFrame(this.interval);

      this.interval = undefined;
    }
  }

  handleWindowClearTimeout() {
    if (this.interval !== undefined) {
      window.clearTimeout(this.interval);

      this.interval = undefined;
    }
  }

  initializeOnEachFrame() {
    if (Config.enableNativeFrameAnimation && window.requestAnimationFrame) {
      this.onEachFrame = this.handleWindowRequestAnimationFrame;
    } else {
      this.onEachFrame = this.handleWindowSetTimeout;
    }
  }

  initializeCancelOnEachFrame() {
    if (Config.enableNativeFrameAnimation && window.cancelAnimationFrame) {
      this.cancelOnEachFrame = this.handleWindowCancelAnimationFrame;
    } else {
      this.cancelOnEachFrame = this.handleWindowClearTimeout;
    }
  }

  start() {
    if (this.game !== undefined) {
      this.stop();

      this.onEachFrame();
    }
  }

  stop() {
    this.cancelOnEachFrame();
  }
}
