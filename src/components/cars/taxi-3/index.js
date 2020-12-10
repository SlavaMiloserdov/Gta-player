/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';
import Taxi from '../taxi';

import { PARAMS, controlKeys } from './constants';

class TaxiCar3 extends Taxi {
  static id = nanoid();

  state = {
    health: 100,
    isPlayerInside: false,
    speed: 0,
    isDestroyed: false,
  };

  preload(scene) {
    const sprites = Object.values(PARAMS.IMAGES);
    sprites.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });
  }

  create(scene) {
    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, PARAMS.IMAGES.PLAYER_CAR.id)
      .setDepth(1)
      .setImmovable()
      .setScale(0.5);

    this.object.body.setSize(90, 120);

    this.object.setCollideWorldBounds(true);

    this.animations = {
      explosion: {
        key: 'explosion',
        frames: scene.anims.generateFrameNumbers(PARAMS.IMAGES.EXPLOSION.id, {
          start: 0,
          end: 11,
        }),
        frameRate: 10,
      },
    };
    const animConfig = Object.values(this.animations);

    animConfig.forEach((a) => scene.anims.create(a));
  }
}

export default TaxiCar3;
