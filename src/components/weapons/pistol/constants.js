import { nanoid } from 'nanoid';

import pistol from '../assets/pistol.png';
import bullet from '../assets/bullet.png';
import shot from '../assets/1shot.mp3';

const PARAMS = {
  INITIAL_COORDINATES: [6250, 6500],
  IMAGES: {
    PISTOL: {
      id: nanoid(),
      img: pistol,
      frameSize: { frameWidth: 600, frameHeight: 600 },
    },
    BULLET: {
      bullet: {
        id: nanoid(),
        img: bullet,
      },
    },
  },
  SOUNDS: {
    pistol: {
      id: nanoid(),
      file: shot,
    },
  },
};

export default PARAMS;
