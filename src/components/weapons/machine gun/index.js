/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';

import IAbstarct from '../../interface';
import Bullet from '../bullet';
import PARAMS from './constants';

class MachineGun extends IAbstarct {
  static id = nanoid();

  state = {
    ammo: 100,
  };

  preload(scene) {
    scene.load.spritesheet(
      PARAMS.IMAGES.HK.id,
      PARAMS.IMAGES.HK.img,
      PARAMS.IMAGES.HK.frameSize,
    );
    scene.load.image(
      PARAMS.IMAGES.BULLET.bullet.id,
      PARAMS.IMAGES.BULLET.bullet.img,
    );

    scene.load.audio(PARAMS.SOUNDS.pistol.id, PARAMS.SOUNDS.pistol.file);
  }

  create(scene) {
    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, PARAMS.IMAGES.HK.id)
      .setDepth(1)
      .setScale(0.05);

    this.object.setCollideWorldBounds(true);
  }

  update(scene) {
    this.actionsWithWeapon(scene);
  }

  actionsWithWeapon() {}

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
        700,
      );
      gunner.state.ammo -= 1;
    }
  }
}

export default MachineGun;
