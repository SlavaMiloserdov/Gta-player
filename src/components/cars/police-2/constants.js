import { nanoid } from 'nanoid';

import car from '../assets/Police.png';
import explosion from '../assets/explosion.png';

const PARAMS = {
  INITIAL_COORDINATES: [6500, 6450],
  IMAGES: {
    PLAYER_CAR: {
      id: nanoid(),
      img: car,
      frameSize: { frameWidth: 256, frameHeight: 256 },
    },
    EXPLOSION: {
      id: nanoid(),
      img: explosion,
      frameSize: {
        frameWidth: 256,
        frameHeight: 128,
      },
    },
  },
  MAX_SPEED: 500,
};

const controlKeys = {
  up: 'W',
  down: 'S',
  left: 'A',
  rigth: 'D',
  stop: 'SPACE',
  action: 'ENTER',
};

export { PARAMS, controlKeys };
