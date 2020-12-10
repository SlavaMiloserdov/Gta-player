import Map from './map';
import Player from './player';
import Interactions from './interactions';
import Ways from './ways';

import Pistol from './weapons/pistol';
import MachineGun from './weapons/machine gun';
import Chaingun from './weapons/chaingun';
import Bullet from './weapons/bullet';

import Car from './cars/orange-car-2';
import PoliceCar from './cars/police';
import PoliceCar2 from './cars/police-2';
import TaxiCar from './cars/taxi';
import TaxiCar2 from './cars/taxi-2';
import TaxiCar3 from './cars/taxi-3';
import RacingCar from './cars/racing-car';
import RacingCar2 from './cars/racing-car-2';
import BlueCar from './cars/blue-car';
import BlueCar2 from './cars/blue-car-2';
import OrangeCar from './cars/orange-car';

import Citizens from './bots/citizens';
import Rednecks from './bots/rednecks';
import Human from './bots/human';
import Human2 from './bots/human-2';
import Human3 from './bots/human-3';
import Human4 from './bots/human-4';
import Human5 from './bots/human-5';
import Human6 from './bots/human-6';
import Human7 from './bots/human-7';
import Human8 from './bots/human-8';
import Human9 from './bots/human-9';

import TimeQuest from './quests/time-quest';

const features = [
  Car,
  PoliceCar,
  PoliceCar2,
  TaxiCar,
  TaxiCar2,
  TaxiCar3,
  RacingCar,
  RacingCar2,
  BlueCar,
  BlueCar2,
  OrangeCar,
  Citizens,
  Rednecks,
  Human,
  Human2,
  Human3,
  Human4,
  Human5,
  Human6,
  Human7,
  Human8,
  Human9,
  Player,
  Map,
  Bullet,
  Pistol,
  Chaingun,
  MachineGun,
  TimeQuest,
  Interactions,
  Ways,
];
const featuresId = [];

const featuresMap = features.reduce((acc, FeatureCreater) => {
  acc[FeatureCreater.id] = new FeatureCreater();
  featuresId.push(FeatureCreater.id);
  return acc;
}, {});

export { featuresMap, featuresId };
