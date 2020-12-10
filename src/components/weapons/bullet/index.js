/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';
import PARAMS from './constants';

class Bullet {
  static id = nanoid();

  preload(scene) {
    scene.load.spritesheet(
      PARAMS.IMAGES.BULLET.bullet.id,
      PARAMS.IMAGES.BULLET.bullet.img,
      PARAMS.IMAGES.BULLET.bullet.frameSize,
    );
  }

  create(scene) {
    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, PARAMS.IMAGES.BULLET.bullet.id)
      .setDepth(1);

    this.object.setCollideWorldBounds(true);
  }

  getBullet(scene, gunner) {
    this.newBullet = scene.physics.add
      .sprite(
        gunner.object.x + Math.cos(gunner.object.rotation) * 20,
        gunner.object.y + Math.sin(gunner.object.rotation) * 20,
        PARAMS.IMAGES.BULLET.bullet.id,
      )
      .setScale(0.33);
    this.newBullet.rotation = gunner.object.rotation;
    return this.newBullet;
  }

  update(scene) {}
}

export default Bullet;
