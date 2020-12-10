/* eslint-disable class-methods-use-this */

import Phaser from 'phaser';

import PARAMS from './constants';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: PARAMS.SCENES.gameOverScene,
    });
  }

  init() {}

  preload() {}

  create() {
    this.scene.start(PARAMS.SCENES.menuScene, 'Want to restart?');
  }
}

export default GameOverScene;
