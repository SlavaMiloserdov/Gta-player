/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';
import IAbstract from '../../interface';

import { PARAMS, controlKeys } from './constants';

class PoliceCar extends IAbstract {
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

  create(scene, featureMap) {
    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, PARAMS.IMAGES.PLAYER_CAR.id)
      .setDepth(1)
      .setScale(0.5)
      .enableBody()
      .setSize(90, 120)
      .setImmovable()
      .setMass(1200);

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

  update(scene) {
    this.actionsWithCar(scene);
  }

  actionsWithCar(scene) {
    if (this.state.health > 0) {
      this.controller = {
        moveUp: scene.input.keyboard.addKey(controlKeys.up),
        moveRight: scene.input.keyboard.addKey(controlKeys.rigth),
        moveDown: scene.input.keyboard.addKey(controlKeys.down),
        moveLeft: scene.input.keyboard.addKey(controlKeys.left),
        stop: scene.input.keyboard.addKey(controlKeys.stop),
        doMainAttack: scene.input.keyboard.addKey(controlKeys.attackMain),
        doAction: scene.input.keyboard.addKey(controlKeys.action),
      };

      if (
        this.controller.moveUp.isDown
        && this.state.isPlayerInside
        && this.state.speed <= PARAMS.MAX_SPEED
      ) {
        this.state.speed += 0;
      }

      if (
        this.controller.moveDown.isDown
        && this.state.isPlayerInside
        && this.state.speed > -PARAMS.MAX_SPEED / 2
      ) {
        this.state.speed -= 5;
      }

      if (this.controller.stop.isDown && this.state.isPlayerInside) {
        this.state.speed += (0 - this.state.speed) * 0.07;
        this.object.setAngularVelocity(0);
      }

      if (this.controller.moveRight.isUp && this.controller.moveLeft.isUp) {
        this.object.setAngularVelocity(0);
      }

      if (this.controller.moveLeft.isDown && this.state.isPlayerInside) {
        this.object.setAngularVelocity(-30 * (this.state.speed / 100));
      }

      if (this.controller.moveRight.isDown && this.state.isPlayerInside) {
        this.object.setAngularVelocity(30 * (this.state.speed / 100));
      }

      this.object.setVelocityY(
        -this.state.speed
          * Math.cos(((this.object.rotation * 180) / Math.PI - 360) * 0.01745),
      );

      this.object.setVelocityX(
        this.state.speed
          * Math.sin(((this.object.rotation * 180) / Math.PI - 360) * 0.01745),
      );

      if (this.controller.moveUp.isUp && this.controller.moveDown.isUp) {
        this.state.speed += 0;
      }
    } else {
      if (!this.state.isDestroyed) {
        this.object.anims.play(this.animations.explosion.key, true);
      }
      setTimeout(() => {
        this.object.destroy();
        this.state.isDestroyed = true;
      }, 1000);
    }
  }
}

export default PoliceCar;
