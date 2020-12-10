/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import Phaser from 'phaser';

import PARAMS from './constants';

import { featuresMap, featuresId } from '../components';

class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: PARAMS.SCENES.gameScene,
    });
  }

  preload() {
    featuresId.forEach((id) => featuresMap[id].preload(this, featuresMap));
  }

  create() {
    this.cameras.main.fadeIn(PARAMS.CAMERA.fadeTime);

    featuresId.forEach((id) => featuresMap[id].create(this, featuresMap));

    this.scene.launch(PARAMS.SCENES.buttonsScene);
    this.scene.launch(PARAMS.SCENES.UIScene);
  }

  update() {
    featuresId.forEach((id) => featuresMap[id].update(this, featuresMap));
  }
}

export default MainScene;
