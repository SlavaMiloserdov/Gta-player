/* eslint-disable no-console */

import Phaser from 'phaser';
import PARAMS from './constants';

class ButtonsScene extends Phaser.Scene {
  constructor() {
    super(PARAMS.SCENES.buttonsScene);
  }

  create() {
    this.gameScene = this.scene.get(PARAMS.SCENES.gameScene);

    this.addButtonaBack();
    this.addButtonPause();

    this.soundEffectMenu = this.sound.add(PARAMS.SOUNDS.EFFECT.id, {
      volume: 0.01,
    });
  }

  addButtonaBack() {
    this.btnBack = this.make
      .text({
        x: 90,
        y: 32,
        text: '<BACK',
        style: PARAMS.BUTTONS.textStyle,
      })
      .setDepth(2)
      .setOrigin(...PARAMS.originCenter)
      .setShadow(...PARAMS.BUTTONS.shadow)
      .setInteractive();

    this.btnBack.on('pointerover', () => {
      this.btnBack.setScale(1.05);

      this.soundEffectMenu.play();
    });

    this.btnBack.on('pointerout', () => {
      this.btnBack.setScale(1);
    });

    this.btnBack.on('pointerup', () => {
      this.gameScene.scene.switch(PARAMS.SCENES.menuScene);
      this.scene.setVisible(false);
    });
  }

  addButtonPause() {
    this.btnPause = this.make
      .text({
        x: 90,
        y: 85,
        text: 'PAUSE',
        style: PARAMS.BUTTONS.textStyle,
      })
      .setDepth(2)
      .setOrigin(...PARAMS.originCenter)
      .setShadow(...PARAMS.BUTTONS.shadow)
      .setInteractive();

    this.btnPause.on('pointerover', () => {
      this.btnPause.setScale(1.05);

      this.soundEffectMenu.play();
    });

    this.btnPause.on('pointerout', () => {
      this.btnPause.setScale(1);
    });

    let isPaused = false;
    this.btnPause.on('pointerup', () => {
      if (isPaused) {
        this.btnPause.setColor(PARAMS.BUTTONS.color.yellow);
        this.gameScene.scene.resume();
        isPaused = false;
      } else {
        this.btnPause.setColor(PARAMS.BUTTONS.color.green);
        this.gameScene.scene.pause();
        isPaused = true;
      }
    });
  }
}

export default ButtonsScene;
