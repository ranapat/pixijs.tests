import Initialize from './stage/initialize';
import Stage from './stage/stage';

import Game from './game/game';

const initialize = new Initialize(window.document);

if (initialize.generate()) {
  const game = new Game(initialize.canvas, initialize.context);
  const stage = new Stage(game);

  stage.start();
  setTimeout(stage.stop, 1000 * 60);
}
