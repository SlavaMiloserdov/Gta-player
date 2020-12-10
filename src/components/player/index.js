/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';

import IAbstarct from '../interface';

import {
  PARAMS, MOVING_PARAMS, controlKeys, WEAPONS,
} from './constants';

import currentPlayer from '../../player-state';

class Player extends IAbstarct {
  static id = nanoid();

  state = {
    isRunning: false,
    isShooting: false,
    isInsideCar: false,
    health: 100,
    ammo: 0,
    currentWeapon: '',
    currentWeaponIcon: '',
    score: 0,
    name: currentPlayer.name,
  };

  preload(scene) {
    const sprites = Object.values(PARAMS.IMAGES.PLAYER);
    const spritesWeapons = Object.values(PARAMS.IMAGES.WEAPONS);

    sprites.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });
    spritesWeapons.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });
  }

  create(scene, featureMap) {
    this.featureMap = featureMap;

    this.WEAPONS = WEAPONS;

    this.object = scene.physics.add
      .sprite(...PARAMS.INITIAL_COORDINATES, this.constructor.id)
      .setScale(0.7)
      .setDepth(1)
      .enableBody()
      .setSize(15, 25)
      .setOffset(10, 15)
      .setMass(90);

    this.object.setCollideWorldBounds(true);

    scene.cameras.main.setZoom(0.6);
    scene.cameras.main.zoomTo(1, 550);
    scene.cameras.main.startFollow(this.object, true);

    this.addAnimation(scene);
  }

  update(scene) {
    this.actionsWithPlayer(scene);
  }

  addAnimation(scene) {
    this.animations = {
      stand: {
        key: 'stand',
        frames: scene.anims.generateFrameNumbers(PARAMS.IMAGES.PLAYER.walk.id, {
          start: 0,
          end: 0,
        }),
        frameRate: 10,
        repeat: -1,
      },
      walk: {
        key: 'walking',
        frames: scene.anims.generateFrameNumbers(PARAMS.IMAGES.PLAYER.walk.id, {
          start: 0,
          end: 5,
        }),
        frameRate: 10,
        repeat: -1,
      },
      run: {
        key: 'run',
        frames: scene.anims.generateFrameNumbers(PARAMS.IMAGES.PLAYER.run.id, {
          start: 0,
          end: 5,
        }),
        frameRate: 10,
        repeat: -1,
      },
      pistol: {
        key: 'shoot_pistol',
        frames: scene.anims.generateFrameNumbers(
          PARAMS.IMAGES.PLAYER.pistol.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      machineGun: {
        key: 'shoot_machinegun',
        frames: scene.anims.generateFrameNumbers(
          PARAMS.IMAGES.PLAYER.machineGun.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      chaingun: {
        key: 'stand_chaingun',
        frames: scene.anims.generateFrameNumbers(
          PARAMS.IMAGES.PLAYER.chaingun.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      chaingunShoot: {
        key: 'shoot_chaingun',
        frames: scene.anims.generateFrameNumbers(
          PARAMS.IMAGES.PLAYER.chaingunShoot.id,
          {
            start: 0,
            end: 1,
          },
        ),
        frameRate: 10,
        repeat: -1,
      },
    };

    const animConfig = Object.values(this.animations);

    animConfig.forEach((a) => scene.anims.create(a));
  }

  actionsWithPlayer(scene, featureMap) {
    if (this.state.health <= 0) {
      this.object.destroy();
    }

    this.controller = {
      moveUp: scene.input.keyboard.addKey(controlKeys.up),
      moveRight: scene.input.keyboard.addKey(controlKeys.rigth),
      moveDown: scene.input.keyboard.addKey(controlKeys.down),
      moveLeft: scene.input.keyboard.addKey(controlKeys.left),
      run: scene.input.keyboard.addKey(controlKeys.run),
      doAction: scene.input.keyboard.addKey(controlKeys.action),
    };

    if (this.controller.moveLeft.isDown && !this.state.isRunning) {
      this.object.setVelocityX(-MOVING_PARAMS.PLAYER_SPEED);
      this.object.anims.play(this.animations.walk.key, true);
      this.object.rotation = MOVING_PARAMS.ROTATION.rotateLeft;
    }

    if (this.controller.moveRight.isDown && !this.state.isRunning) {
      this.object.setVelocityX(MOVING_PARAMS.PLAYER_SPEED);
      this.object.anims.play(this.animations.walk.key, true);
      this.object.rotation = MOVING_PARAMS.ROTATION.rotateRight;
    }

    if (this.controller.moveUp.isDown && !this.state.isRunning) {
      if (this.controller.moveRight.isDown) {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateUpAndRight;
      } else if (this.controller.moveLeft.isDown) {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateUpAndLeft;
      } else {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateUp;
      }

      this.object.setVelocityY(-MOVING_PARAMS.PLAYER_SPEED);

      this.object.anims.play(this.animations.walk.key, true);
    }

    if (this.controller.moveDown.isDown && !this.state.isRunning) {
      if (this.controller.moveRight.isDown) {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateDownAndRight;
      } else if (this.controller.moveLeft.isDown) {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateDownAndLeft;
      } else {
        this.object.rotation = MOVING_PARAMS.ROTATION.rotateDown;
      }

      this.object.setVelocityY(MOVING_PARAMS.PLAYER_SPEED);

      this.object.anims.play(this.animations.walk.key, true);
    }

    if (
      !this.controller.moveLeft.isDown
      && !this.controller.moveRight.isDown
      && !this.controller.moveUp.isDown
      && !this.controller.moveDown.isDown
    ) {
      this.object.anims.play(this.animations.stand.key);
    }

    if (!this.controller.moveLeft.isDown && !this.controller.moveRight.isDown) {
      this.object.setVelocityX(0);
    }
    if (!this.controller.moveUp.isDown && !this.controller.moveDown.isDown) {
      this.object.setVelocityY(0);
    }

    if (this.controller.run.isDown) {
      this.state.isRunning = true;

      if (this.object.body.velocity.x > 0) {
        this.object.setVelocityX(
          MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF,
        );
      }
      if (this.object.body.velocity.x < 0) {
        this.object.setVelocityX(
          -(MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF),
        );
      }
      if (this.object.body.velocity.y > 0) {
        this.object.setVelocityY(
          MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF,
        );
      }
      if (this.object.body.velocity.y < 0) {
        this.object.setVelocityY(
          -(MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF),
        );
      }
    }

    if (this.controller.run.isUp) {
      this.state.isRunning = false;
    }
  }
}

export default Player;
