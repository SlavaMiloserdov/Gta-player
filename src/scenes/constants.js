import { nanoid } from 'nanoid';

import logo from './assets/images/logo.png';
import cover from './assets/images/cover.jpg';
import stats from './assets/images/statsbg.jpg';
import music from './assets/sounds/title.mp3';
import effect from './assets/sounds/menu.mp3';
import start from './assets/sounds/RespectIs.mp3';
import city from './assets/sounds/goroda.mp3';

import controlSprite from '../components/screen-controller/assets/control.png';
import directionThumpSprite from '../components/screen-controller/assets/directionThump.png';
import shootThumpSprite from '../components/screen-controller/assets/shootThump.png';
import actionSprite from '../components/screen-controller/assets/action.png';
import runSprite from '../components/screen-controller/assets/run.png';

const PARAMS = {
  SCENES: {
    gameScene: nanoid(),
    loadScene: nanoid(),
    menuScene: nanoid(),
    gameOverScene: nanoid(),
    UIScene: nanoid(),
    buttonsScene: nanoid(),
    timeQuestScene: nanoid(),
    score: nanoid(),
    instructionScene: nanoid(),
  },
  IMAGES: {
    LOGO: {
      id: nanoid(),
      img: logo,
      coord: [680, 160],
      size: [400, 500],
    },
    COVER: {
      id: nanoid(),
      img: cover,
      coord: [0, 0],
      size: [1360, 768],
    },
    STATS: {
      id: nanoid(),
      img: stats,
      coord: [0, 0],
      size: [1360, 768],
    },
  },
  SOUNDS: {
    MENU: {
      id: nanoid(),
      file: music,
    },
    EFFECT: {
      id: nanoid(),
      file: effect,
    },
    START: {
      id: nanoid(),
      file: start,
    },
    CITY: {
      id: nanoid(),
      file: city,
    },
  },
  LINES: {
    horizontal: [0, 660, 1360, 660],
    vertical: [1170, 0, 1170, 768],
    style: [2, 0xff0000, 0.3],
  },
  CIRCLE: [1170, 660, 50],
  STATS: {
    RECT: {
      size: [300, 60, 820, 650, 10],
      style: { color: 0x000000, alpha: 0.5 },
    },
    name: {
      font: '32px gta',
      fill: '#ffa500',
    },
    score: {
      font: '32px gta',
      fill: '#ffffff',
    },
  },
  BUTTONS: {
    color: {
      red: '#ff0000',
      green: '#004d00',
      yellow: '#ffa500',
    },
    coord: [660, 350, 420, 520, 570, 700, 820, 470, 620],
    text: {
      start: 'START GAME',
      fullscreen: 'FULLSCREEN:',
      off: 'off',
      on: 'on',
      score: 'SCORE',
      login: 'SIGN IN',
      sound: 'MUSIC:',

      instruction: 'CONTROLS',
    },
    switchStyle: {
      font: '60px gta',
      fill: '#ff0000',
    },
    switchMusicStyle: {
      font: '60px gta',
      fill: '#004d00',
    },
    loginStyle: {
      font: '90px gta',
      fill: '#ffffff',
    },
    startStyle: {
      font: '80px gta',
      fill: '#ffa500',
    },
    textStyle: {
      font: '60px gta',
      fill: '#ffa500',
    },
    textControlsStyle: {
      font: '44px gta',
      fill: '#ffffff',
    },
    shadow: [3, 1, '#000000'],
  },
  CAMERA: {
    fadeTime: 650,
  },
  originCenter: [0.5, 0.5],

  spritesJoystick: {
    controlId: nanoid(),
    controlPath: controlSprite,

    directionId: nanoid(),
    directionPath: directionThumpSprite,

    shootId: nanoid(),
    shootPath: shootThumpSprite,

    actionId: nanoid(),
    actionPath: actionSprite,

    runId: nanoid(),
    runPath: runSprite,
  },

  textJoystick: {
    firstJoystick: 'control character movement',
    secondJoystick: 'line of fire',
    actionButton: 'action',
    runButton: 'run',
  },
};

export default PARAMS;
