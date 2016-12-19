import Initialize from './stage/initialize';
import Stage from './stage/stage';

import Game from './game/game';

const initialize = new Initialize(window.document, () => {
  const game = new Game(initialize.renderer, initialize.stage, initialize.handleRightMouseClick);
  const stage = new Stage(game);

  stage.start();
});
