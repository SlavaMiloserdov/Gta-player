import { nanoid } from 'nanoid';

import pistol from '../weapons/assets/pistol.png';
import machineGun from '../weapons/assets/hk.png';
import chaingun from '../weapons/assets/chaingun.png';
import getMGun from '../weapons/assets/MacGun.mp3';
import getPistol from '../weapons/assets/Pistolp.mp3';
import startMission from '../quests/assets/RaceOn.mp3';
import finishMission from '../quests/assets/Respect.mp3';
import getCar from '../cars/assets/GTA.mp3';

const PARAMS = {
  INITIAL_COORDINATES: [6200, 6300],
  IMAGES: {
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
  textCoords: [200, 660, 20, 50, 80],
  textStyle: {
    font: '32px gta',
    fill: '#ffffff',
  },
  SOUNDS: {
    macgun: {
      id: nanoid(),
      file: getMGun,
    },
    pistol: {
      id: nanoid(),
      file: getPistol,
    },
    start: {
      id: nanoid(),
      file: startMission,
    },
    finish: {
      id: nanoid(),
      file: finishMission,
    },
    car: {
      id: nanoid(),
      file: getCar,
    },
  },
};

const WEAPONS = {
  pistol: 'pistol',
  machineGun: 'machine gun',
  chaingun: 'chaingun',
};

export { PARAMS, WEAPONS };
