import { nanoid } from 'nanoid';

import walk from './assets/player_walk.png';
import run from './assets/player_run.png';
import playerWithPistol from './assets/player_pistol.png';
import playerWithMachineGun from './assets/player_hk_stand.png';
import playerWithChaingun from './assets/player_chaingun.png';
import chaingunShoot from './assets/player_chaingun_shoot.png';

import pistol from '../weapons/assets/pistol.png';
import machineGun from '../weapons/assets/hk.png';
import chaingun from '../weapons/assets/chaingun.png';

const PARAMS = {
  INITIAL_COORDINATES: [6200, 6300],
  IMAGES: {
    PLAYER: {
      walk: {
        id: nanoid(),
        img: walk,
        frameSize: {
          frameWidth: 35,
          frameHeight: 57,
        },
      },
      run: {
        id: nanoid(),
        img: run,
        frameSize: {
          frameWidth: 80,
          frameHeight: 87,
        },
      },
      pistol: {
        id: nanoid(),
        img: playerWithPistol,
        frameSize: {
          frameWidth: 60,
          frameHeight: 60,
        },
      },
      machineGun: {
        id: nanoid(),
        img: playerWithMachineGun,
        frameSize: {
          frameWidth: 56,
          frameHeight: 57,
        },
      },
      chaingun: {
        id: nanoid(),
        img: playerWithChaingun,
        frameSize: {
          frameWidth: 54,
          frameHeight: 32,
        },
      },
      chaingunShoot: {
        id: nanoid(),
        img: chaingunShoot,
        frameSize: {
          frameWidth: 53,
          frameHeight: 30,
        },
      },
    },
    WEAPONS: {
      pistol: {
        id: nanoid(),
        img: pistol,
        frameSize: {
          frameWidth: 600,
          frameHeight: 600,
        },
      },
      machineGun: {
        id: nanoid(),
        img: machineGun,
        frameSize: {
          frameWidth: 1000,
          frameHeight: 460,
        },
      },
      chaingun: {
        id: nanoid(),
        img: chaingun,
        frameSize: {
          frameWidth: 920,
          frameHeight: 400,
        },
      },
    },
  },
};

const controlKeys = {
  up: 'W',
  down: 'S',
  left: 'A',
  rigth: 'D',
  run: 'SPACE',
  action: 'ENTER',
};

const MOVING_PARAMS = {
  PLAYER_SPEED: 160,
  SPEED_COF: 2,
  ROTATION: {
    rotateRight: 0,
    rotateLeft: Math.PI,
    rotateUpAndRight: -0.75,
    rotateUpAndLeft: (Math.PI * 5) / 4,
    rotateUp: -(Math.PI / 2),
    rotateDownAndRight: Math.PI / 4,
    rotateDownAndLeft: 2.5,
    rotateDown: Math.PI / 2,
  },
};

const WEAPONS = {
  pistol: 'pistol',
  machineGun: 'machine gun',
  chaingun: 'chaingun',
};

export {
  PARAMS, WEAPONS, MOVING_PARAMS, controlKeys,
};
