import { nanoid } from 'nanoid';

import car from '../assets/Mini_truck.png';
import explosion from '../assets/explosion.png';

const PARAMS = {
  IMAGES: {
    BLUE: {
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
};

export default PARAMS;
