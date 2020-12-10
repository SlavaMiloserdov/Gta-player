/* eslint-disable no-console */

import Phaser from 'phaser';
import PARAMS from './constants';

class UIScene extends Phaser.Scene {
  constructor() {
    super({
      key: PARAMS.SCENES.UIScene,
    });
  }

  create() {
    const respect = this.sound.add(PARAMS.SOUNDS.START.id, {
      volume: 0.01,
    });

    const city = this.sound.add(PARAMS.SOUNDS.CITY.id, {
      volume: 0.007,
      loop: true,
    });

    respect.play();
    city.play();
  }
}

export default UIScene;
