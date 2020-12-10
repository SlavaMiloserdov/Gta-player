/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';

import IAbstarct from '../../interface';

import Player from '../../player';

import PARAMS from './constants';

class TimeQuest extends IAbstarct {
  static id = nanoid();

  state = {
    time: PARAMS.TIME_FOR_QUEST,
    isStarted: false,
    isCreated: false,
    isFinished: false,
    isActive: true,
  };

  preload(scene) {
    const sprites = Object.values(PARAMS.IMAGES);
    sprites.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });
  }

  create(scene, interactionMap) {
    this.player = interactionMap[Player.id];

    this.startObj = scene.physics.add
      .sprite(
        ...PARAMS.INITIAL_COORDINATES_START,
        PARAMS.IMAGES.TIME_QUEST_START_ICON.id,
      )
      .setDepth(1)
      .setImmovable();
    this.finishObj = scene.physics.add
      .sprite(
        ...PARAMS.INITIAL_COORDINATES_FINISH,
        PARAMS.IMAGES.TIME_QUEST_FINISH_ICON.id,
      )
      .setDepth(1)
      .setImmovable();
    this.finishObj.visible = false;

    this.timeQuestScene = scene.game.scene.scenes[5];
    this.container = scene.add.container();
  }

  showArrow() {
    const diffX = this.finishObj.x - this.player.object.x;
    const diffY = this.finishObj.y - this.player.object.y;
    const angle = Math.atan(Math.abs(diffX / diffY));
    if (diffX > 0 && diffY < 0) {
      this.arrow.rotation = -Math.PI / 2 + angle;
    }
    if (diffX < 0 && diffY < 0) {
      this.arrow.rotation = -Math.PI / 2 - angle;
    }
    if (diffX > 0 && diffY > 0) {
      this.arrow.rotation = Math.PI / 2 - angle;
    }
    if (diffX < 0 && diffY > 0) {
      this.arrow.rotation = Math.PI / 2 + angle;
    }
  }

  questActive() {
    this.time.setText(`time: ${this.state.time}`);
    this.showArrow();
  }

  restartQuest() {
    this.time.destroy();
    this.arrow.destroy();
    this.state.isStarted = false;
    this.state.isCreated = false;
    this.state.isFinished = false;
    this.state.time = PARAMS.TIME_FOR_QUEST;
    this.startObj.body.enable = true;
    this.startObj.visible = true;
    this.finishObj.body.enable = false;
    this.finishObj.visible = false;
  }

  update(scene) {
    if (this.state.isActive) {
      if (this.state.time <= 0) {
        this.restartQuest(scene);
        clearInterval(this.timeInterval);
      }
      if (this.state.isStarted && !this.state.isCreated) {
        this.startObj.body.enable = false;
        this.startObj.visible = false;
        this.finishObj.visible = true;
        this.finishObj.body.enable = true;

        this.time = this.timeQuestScene.add.text(
          PARAMS.textCoords[0],
          PARAMS.textCoords[1],
          `Time: ${this.state.time}`,
          PARAMS.textStyle,
        );
        this.timeInterval = setInterval(() => {
          this.state.time -= 1;
        }, 1000);

        this.state.isCreated = true;
        this.arrow = this.timeQuestScene.add
          .image(700, 200, PARAMS.IMAGES.ARROW_ICON.id)
          .setScale(0.15);
      }

      if (this.state.isStarted && this.state.isCreated) {
        this.questActive();
      }
    }
  }
}

export default TimeQuest;
