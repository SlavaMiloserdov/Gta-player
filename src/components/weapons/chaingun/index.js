/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';

import IAbstarct from '../../interface';
import Bullet from '../bullet';
import PARAMS from './constants';

class Chaingun extends IAbstarct {
  static id = nanoid();

  state = {
    ammo: 1000,
  };

  preload(scene) {
    scene.load.spritesheet(
      PARAMS.IMAGES.CHAINGUN.id,
      PARAMS.IMAGES.CHAINGUN.img,
      PARAMS.IMAGES.CHAINGUN.frameSize,
    );

    scene.load.audio(PARAMS.SOUNDS.pistol.id, PARAMS.SOUNDS.pistol.file);
  }

  create(scene, featureMap) {
    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, PARAMS.IMAGES.CHAINGUN.id)
      .setDepth(1)
      .setScale(0.05);

    this.object.setCollideWorldBounds(true);
  }

  update(scene) {
    this.actionsWithWeapon(scene);
  }

  actionsWithWeapon(scene) {}

  static shooting(scene, gunner, featureMap) {
    if (gunner.state.ammo) {
      this.soundEffect = scene.sound.add(PARAMS.SOUNDS.pistol.id, {
        volume: 0.01,
      });
      this.soundEffect.play();
      this.bullet = featureMap[Bullet.id].getBullet(scene, gunner);

      scene.physics.moveTo(
        this.bullet,
        gunner.object.x + Math.cos(gunner.object.rotation) * 1000,
        gunner.object.y + Math.sin(gunner.object.rotation) * 1000,
        800,
      );
      gunner.state.ammo -= 1;
    }
  }
}

export default Chaingun;
