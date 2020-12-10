import { nanoid } from 'nanoid';

import bullet from '../assets/bullet.png';

const PARAMS = {
  INITIAL_COORDINATES: [-100, -100],
  IMAGES: {
    BULLET: {
      bullet: {
        id: nanoid(),
        img: bullet,
        frameSize: { frameWidth: 25, frameHeight: 8 },
      },
    },
  },
};

export default PARAMS;
