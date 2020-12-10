import { nanoid } from 'nanoid';

import walk from '../assets/player_walk.png';
import run from '../assets/player_run.png';

const PARAMS = {
  INITIAL_COORDINATES: [6040, 6100],
  IMAGES: {
    CITIZEN: {
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
    },
  },
};

const MOVING_PARAMS = {
  PLAYER_SPEED: 160,
  SPEED_COF: 2,
  ROTATION: {
    noRotate: 0,
    rotate: Math.PI,
  },
};

export { PARAMS, MOVING_PARAMS };
