import { nanoid } from 'nanoid';

import map from './assets/liberty-city.json';
import tileSet from './assets/gta-tiles.jpg';
import waterSet from './assets/water-tiles.png';

const PARAMS = {
  id: nanoid(),
  mapJSON: map,
  pic: tileSet,
  waterPic: waterSet,
  mainTilesID: 'gta-tiles',
  groundID: 'ground',
  roadsID: 'roads',
  boxID: 'box',
  obstacleID: 'obstacle',
  collisionsMap: [894, 609],
  waterID: nanoid(),
  waterAnimationID: nanoid(),
  frameSize: {
    frameWidth: 64,
    frameHeight: 64,
  },
  frameWater: {
    start: 43,
    end: 45,
  },

  nameBorder: 'borderCameras',
  positionBorder: {
    x: 1145,
    y: 5,
  },
  sizeBorder: {
    width: 210,
    height: 210,
  },
  backgroundBorder: {
    r: 255,
    g: 165,
    b: 0,
    a: 1,
  },
  fadeTimeBorder: 500,
  alphaBorder: 1,

  nameMinimap: 'miniCameras',
  positionMinimap: {
    x: 1150,
    y: 10,
  },
  sizeMinimap: {
    width: 200,
    height: 200,
  },
  backgroundMinimap: {
    r: 139,
    g: 69,
    b: 19,
    a: 1,
  },
  tintMinimap: {
    topLeft: 0xf0e68c,
    topRight: 0xf0e68c,
    bottomLeft: 0xf0e68c,
    bottomRight: 0xf0e68c,
  },
  fadeTimeMinimap: 500,
  alphaMinimap: 0.3,

  minimapZoom: 0.09,
  scrollXMinimap: 8000,
  scrollYMinimap: 8000,
  transparentMinimap: false,
  tintFillMinimap: true,
};

export default PARAMS;
