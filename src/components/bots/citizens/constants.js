import { nanoid } from 'nanoid';

import walk from '../assets/player_walk.png';
import run from '../assets/player_run.png';

const PARAMS = {
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

export default PARAMS;
