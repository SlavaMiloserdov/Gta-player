/* eslint-disable no-unused-vars */

import Phaser from 'phaser';
import { nanoid } from 'nanoid';
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components';

import PARAMS from './constants';
import currentPlayer from '../player-state';

class StatisticsScene extends Phaser.Scene {
  constructor() {
    super(PARAMS.SCENES.score);
  }

  init() {
    this.leaderboard = new LeaderBoard({
      root: 'leaderboard',
    });

    this.leaderboard.setUser({
      userID: nanoid(),
      userName: localStorage.currentPlayerName,
    });

    this.newScore = currentPlayer.score || 0;
  }

  async create() {
    this.cameras.main.fadeIn(PARAMS.CAMERA.fadeTime);

    await this.leaderboard.post(this.newScore);
    this.scores = await this.leaderboard.loadFirstPage();

    this.add
      .graphics({ fillStyle: PARAMS.STATS.RECT.style })
      .fillRoundedRect(...PARAMS.STATS.RECT.size)
      .setDepth(1);

    const x = 350;
    let y = 100;
    const tableRows = 15;
    const padding = 10;
    const verticalGap = 40;

    for (let i = 0; i < tableRows; ++i) {
      const num = this.add
        .text(x, y, `${i + 1}.`, PARAMS.STATS.score)
        .setOrigin(0, 0.5)
        .setDepth(2);

      if (i < this.scores.length) {
        const scoreItem = this.scores[i];

        const name = this.add
          .text(
            num.x + num.width + padding,
            y,
            scoreItem.userName,
            PARAMS.STATS.name,
          )
          .setOrigin(0, 0.5)
          .setDepth(2);

        const nameWidth = 400;
        this.add
          .text(
            name.x + nameWidth + padding,
            y,
            scoreItem.score.toString(),
            PARAMS.STATS.score,
          )
          .setOrigin(0, 0.5)
          .setDepth(2);
      }

      y += verticalGap;
    }

    this.showBackground();
    this.backToMenu();
  }

  showBackground() {
    this.add
      .image(...PARAMS.IMAGES.STATS.coord, PARAMS.IMAGES.STATS.id)
      .setDepth(0)
      .setOrigin(0)
      .setSize(...PARAMS.IMAGES.COVER.size);
  }

  backToMenu() {
    this.btnBack = this.make
      .text({
        x: 110,
        y: 700,
        text: '<BACK',
        style: PARAMS.BUTTONS.textStyle,
      })
      .setDepth(2)
      .setOrigin(...PARAMS.originCenter)
      .setShadow(...PARAMS.BUTTONS.shadow)
      .setInteractive();

    this.btnBack.on('pointerover', () => {
      this.btnBack.setScale(1.05);
    });

    this.btnBack.on('pointerout', () => {
      this.btnBack.setScale(1);
    });

    this.btnBack.on('pointerup', () => {
      this.scene.switch(PARAMS.SCENES.menuScene);
    });
  }
}

export default StatisticsScene;
