/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';

import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick';

import IAbstarct from '../interface';

// import JOYSTISK_PARAMS from './constants';

import Player from '../player';

import { PARAMS as PLAYER_PARAM, MOVING_PARAMS } from '../player/constants';

let player;

class ScreenController extends IAbstarct {
  static id = nanoid();

  // preload(scene) {
  //   const sprites = Object.values(PLAYER_PARAM.IMAGES.PLAYER);
  //   scene.load.image(
  //     JOYSTISK_PARAMS.directionId,
  //     JOYSTISK_PARAMS.directionPath,
  //   );
  //   scene.load.image(JOYSTISK_PARAMS.shootId, JOYSTISK_PARAMS.shootPath);
  //   scene.load.image(
  //     JOYSTISK_PARAMS.directionThumbId,
  //     JOYSTISK_PARAMS.directionThumbPath,
  //   );
  //   scene.load.image(
  //     JOYSTISK_PARAMS.shootThumbId,
  //     JOYSTISK_PARAMS.shootThumbPath,
  //   );
  //   scene.load.image(JOYSTISK_PARAMS.actionId, JOYSTISK_PARAMS.actionPath);
  // }

  // create(scene, featureMap) {
  //   player = featureMap[Player.id];

  //   this.directionJoystick = new VirtualJoystickPlugin(scene, {
  //     x: JOYSTISK_PARAMS.directionPosition.x,
  //     y: JOYSTISK_PARAMS.directionPosition.y,
  //     radius: JOYSTISK_PARAMS.directionRadius,
  //     base: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.directionSize.width,
  //         JOYSTISK_PARAMS.directionSize.height,
  //         JOYSTISK_PARAMS.directionId,
  //       )
  //       .setDepth(JOYSTISK_PARAMS.joystickDepth),
  //     thumb: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.directionThumbSize.width,
  //         JOYSTISK_PARAMS.directionThumbSize.height,
  //         JOYSTISK_PARAMS.directionThumbId,
  //       )
  //       .setDepth(JOYSTISK_PARAMS.joystickDepth),
  //     dir: '8dir',
  //     forceMin: 16,
  //     enable: true,
  //   }).on('update', this.dumpDirectionJoystickState, this);

  //   this.shootJoystick = new VirtualJoystickPlugin(scene, {
  //     x: JOYSTISK_PARAMS.shootPosition.x,
  //     y: JOYSTISK_PARAMS.shootPosition.y,
  //     radius: JOYSTISK_PARAMS.shootRadius,
  //     base: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.shootSize.width,
  //         JOYSTISK_PARAMS.shootSize.height,
  //         JOYSTISK_PARAMS.shootId,
  //       )
  //       .setDepth(JOYSTISK_PARAMS.joystickDepth),
  //     thumb: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.shootThumbSize.width,
  //         JOYSTISK_PARAMS.shootThumbSize.height,
  //         JOYSTISK_PARAMS.shootThumbId,
  //       )
  //       .setDepth(JOYSTISK_PARAMS.joystickDepth),
  //     dir: '8dir',
  //     forceMin: 16,
  //     enable: true,
  //   }).on('update', this.dumpShootJoystickState, this);

  //   this.actionJoystick = new VirtualJoystickPlugin(scene, {
  //     x: JOYSTISK_PARAMS.actionPosition.x,
  //     y: JOYSTISK_PARAMS.actionPosition.y,
  //     radius: JOYSTISK_PARAMS.actionRadius,
  //     base: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.actionSize.width,
  //         JOYSTISK_PARAMS.actionSize.height,
  //         JOYSTISK_PARAMS.actionId,
  //       )
  //       .setDepth(JOYSTISK_PARAMS.joystickDepth),
  //     thumb: scene.add
  //       .sprite(
  //         JOYSTISK_PARAMS.shootThumbSize.width,
  //         JOYSTISK_PARAMS.shootThumbSize.height,
  //         JOYSTISK_PARAMS.shootThumbId,
  //       )
  //       .setAlpha(0),
  //     dir: 'up&down',
  //     forceMin: 0,
  //     enable: true,
  //   }).on('update', this.dumpShootJoystickState, this);

  //   this.dumpDirectionJoystickState();
  //   this.dumpShootJoystickState();
  //   this.dumpActionJoystickState();
  // }

  dumpDirectionJoystickState() {}

  dumpShootJoystickState() {}

  dumpActionJoystickState() {}

  addAnimation(scene) {
    this.animations = {
      stand: {
        key: 'stand',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.walk.id,
          {
            start: 0,
            end: 0,
          },
        ),
        frameRate: 10,
        repeat: -1,
      },
      walk: {
        key: 'walking',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.walk.id,
          {
            start: 0,
            end: 5,
          },
        ),
        frameRate: 10,
        repeat: -1,
      },
      run: {
        key: 'run',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.run.id,
          {
            start: 0,
            end: 5,
          },
        ),
        frameRate: 10,
        repeat: -1,
      },
      pistol: {
        key: 'shoot_pistol',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.pistol.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      machineGun: {
        key: 'shoot_machinegun',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.machineGun.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      chaingun: {
        key: 'stand_chaingun',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.chaingun.id,
          {
            start: 0,
            end: 0,
          },
        ),
      },
      chaingunShoot: {
        key: 'shoot_chaingun',
        frames: scene.anims.generateFrameNumbers(
          PLAYER_PARAM.IMAGES.PLAYER.chaingunShoot.id,
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

  update(scene) {
    const pointer = scene.input.activePointer;

    const directionCursorKeys = this.directionJoystick.createCursorKeys();

    for (const name in directionCursorKeys) {
      if (directionCursorKeys[name].isDown) {
        player.state.isRunning = true;

        if (name === 'right') {
          player.object.setVelocityX(
            MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF,
          );
        }
        if (name === 'left') {
          player.object.setVelocityX(
            -(MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF),
          );
        }
        if (name === 'down') {
          player.object.setVelocityY(
            MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF,
          );
        }
        if (name === 'up') {
          player.object.setVelocityY(
            -(MOVING_PARAMS.PLAYER_SPEED * MOVING_PARAMS.SPEED_COF),
          );
        }
        player.object.anims.play(player.animations.run.key, true);
      }
    }

    const shootCursorKeys = this.shootJoystick.createCursorKeys();

    for (const name in shootCursorKeys) {
      if (shootCursorKeys[name].isDown) {
        if (name === 'right') {
          console.log('shooting right');
        }
        if (name === 'left') {
          console.log('shooting left');
        }
        if (name === 'down') {
          console.log('shooting down');
        }
        if (name === 'up') {
          console.log('shooting up');
        }
      }
    }

    const actionCursorKeys = this.actionJoystick.createCursorKeys();
    for (const name in actionCursorKeys) {
      if (actionCursorKeys[name].isDown) {
        console.log('action');
      }
    }
  }
}

export default ScreenController;
