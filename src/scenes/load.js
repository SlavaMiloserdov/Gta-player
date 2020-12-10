/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import Phaser from 'phaser';

import PARAMS from './constants';

class LoadScene extends Phaser.Scene {
  constructor() {
    super(PARAMS.SCENES.loadScene);
  }

  preload() {
    this.loadImages();
    this.loadAudio();
    this.addLoader();
  }

  create() {
    this.scene.start(PARAMS.SCENES.menuScene);
  }

  loadImages() {
    const img = Object.values(PARAMS.IMAGES);

    img.forEach((element) => this.load.image(element.id, element.img));
  }

  loadAudio() {
    const snd = Object.values(PARAMS.SOUNDS);

    snd.forEach((element) => this.load.audio(element.id, element.file));
  }

  addLoader() {
    const boxColor = [0xffa500, 0.8];
    const barColor = [0xffffff, 1];
    const box = [500, 370, 320, 50];
    const barCoord = [510, 380];
    const textCoord = [660, 300];
    const jokesCoord = [660, 500];
    const textStyle = {
      font: '60px gta',
      fill: '#ffa500',
    };
    const filesStyle = {
      font: '30px gta',
      fill: '#ffffff',
    };

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(...boxColor);
    progressBox.fillRect(...box);

    const loadingText = this.make
      .text({
        x: textCoord[0],
        y: textCoord[1],
        style: textStyle,
      })
      .setOrigin(...PARAMS.originCenter);

    const loadingJokes = this.make
      .text({
        x: jokesCoord[0],
        y: jokesCoord[1],
        style: filesStyle,
      })
      .setOrigin(...PARAMS.originCenter);

    this.load.on('progress', (percent) => {
      const loadText = Math.round(percent * 100);
      loadingText.setText(`${loadText}%`);

      progressBar.clear();
      progressBar.fillStyle(...barColor);
      progressBar.fillRect(...barCoord, 300 * percent, 30);

      if (percent < 0.1) {
        loadingJokes.setText('Optimizing the optimizer...');
      }
      if (percent > 0.1 && percent < 0.3) {
        loadingJokes.setText('Pushing pixels...');
      }
      if (percent > 0.3 && percent < 0.5) {
        loadingJokes.setText('Updating the updater...');
      }
      if (percent > 0.5 && percent < 0.7) {
        loadingJokes.setText('Shooting in feet...');
      }
      if (percent > 0.7 && percent < 0.9) {
        loadingJokes.setText('Dividing by zero...');
      }
      if (percent > 0.9 && percent < 1) {
        loadingJokes.setText('Mining some bitcoins...');
      }
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      loadingJokes.destroy();
    });
  }
}

export default LoadScene;
