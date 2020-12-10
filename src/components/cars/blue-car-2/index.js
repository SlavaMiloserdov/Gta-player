/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';
import IAbstarct from '../../interface';

import PARAMS from './constants';

class BlueCar2 extends IAbstarct {
  static id = nanoid();

  state = {
    health: 150,
    isDestroyed: false,
  };

  preload(scene) {
    const sprites = Object.values(PARAMS.IMAGES);
    sprites.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });
  }

  create(scene, featureMap) {
    this.object = scene.physics.add
      .sprite(0, 0, PARAMS.IMAGES.BLUE.id)
      .setDepth(1)
      .setScale(0.5)
      .enableBody()
      .setSize(105, 125)
      .setImmovable()
      .setMass(1700)
      .setBounce(1, 1);

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

export default BlueCar2;
