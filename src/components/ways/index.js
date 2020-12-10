/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { nanoid } from 'nanoid';
import Phaser from 'phaser';
import PathFollower from 'phaser3-rex-plugins/plugins/pathfollower';

import IAbstarct from '../interface';

import PoliceCar from '../cars/police';
import PoliceCar2 from '../cars/police-2';
import TaxiCar from '../cars/taxi';
import TaxiCar2 from '../cars/taxi-2';
import TaxiCar3 from '../cars/taxi-3';
import BlueCar from '../cars/blue-car';
import BlueCar2 from '../cars/blue-car-2';
import OrangeCar from '../cars/orange-car';
import RacingCar2 from '../cars/racing-car-2';

import Human from '../bots/human';
import Human2 from '../bots/human-2';
import Human3 from '../bots/human-3';
import Human4 from '../bots/human-4';
import Human5 from '../bots/human-5';
import Human6 from '../bots/human-6';
import Human7 from '../bots/human-7';
import Human8 from '../bots/human-8';
import Human9 from '../bots/human-9';

import PARAMS from './constants';

class Ways extends IAbstarct {
  static id = nanoid();

  create(scene, featureMap) {
    this.policeCar = featureMap[PoliceCar.id].object;
    this.policeCar2 = featureMap[PoliceCar2.id].object;
    this.taxiCar = featureMap[TaxiCar.id].object;
    this.taxiCar2 = featureMap[TaxiCar2.id].object;
    this.taxiCar3 = featureMap[TaxiCar3.id].object;
    this.orangeCar = featureMap[OrangeCar.id].object;
    this.blueCar = featureMap[BlueCar.id].object;
    this.blueCar2 = featureMap[BlueCar2.id].object;
    this.racingCar2 = featureMap[RacingCar2.id].object;

    this.Human = featureMap[Human.id].object;
    this.Human2 = featureMap[Human2.id].object;
    this.Human3 = featureMap[Human3.id].object;
    this.Human4 = featureMap[Human4.id].object;
    this.Human5 = featureMap[Human5.id].object;
    this.Human6 = featureMap[Human6.id].object;
    this.Human7 = featureMap[Human7.id].object;
    this.Human8 = featureMap[Human8.id].object;
    this.Human9 = featureMap[Human9.id].object;

    this.path = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.bigCircle);
    this.path2 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.zigzag);
    this.path3 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.square);
    this.path4 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay1);
    this.path5 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay2);
    this.path6 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay3);
    this.path7 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay4);
    this.path8 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay5);
    this.path9 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.carWay6);
    this.path10 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay1);
    this.path11 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay2);
    this.path12 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay3);
    this.path13 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay4);
    this.path14 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay5);
    this.path15 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay6);
    this.path16 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay7);
    this.path17 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay8);
    this.path18 = new Phaser.Curves.Spline(PARAMS.WAYPOINTS.botWay9);

    const pathFollower = new PathFollower(this.taxiCar, {
      path: this.path,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower2 = new PathFollower(this.policeCar, {
      path: this.path2,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower3 = new PathFollower(this.orangeCar, {
      path: this.path3,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower4 = new PathFollower(this.blueCar, {
      path: this.path4,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower5 = new PathFollower(this.blueCar2, {
      path: this.path5,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower6 = new PathFollower(this.taxiCar2, {
      path: this.path6,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower7 = new PathFollower(this.taxiCar3, {
      path: this.path7,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower8 = new PathFollower(this.policeCar2, {
      path: this.path8,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower9 = new PathFollower(this.racingCar2, {
      path: this.path9,
      rotateToPath: true,
      rotationOffset: Math.PI / 2,
    });

    const pathFollower10 = new PathFollower(this.Human, {
      path: this.path10,
      rotateToPath: true,
    });

    const pathFollower11 = new PathFollower(this.Human2, {
      path: this.path11,
      rotateToPath: true,
    });

    const pathFollower12 = new PathFollower(this.Human3, {
      path: this.path12,
      rotateToPath: true,
    });

    const pathFollower13 = new PathFollower(this.Human4, {
      path: this.path13,
      rotateToPath: true,
    });

    const pathFollower14 = new PathFollower(this.Human5, {
      path: this.path14,
      rotateToPath: true,
    });

    const pathFollower15 = new PathFollower(this.Human6, {
      path: this.path15,
      rotateToPath: true,
    });

    const pathFollower16 = new PathFollower(this.Human7, {
      path: this.path16,
      rotateToPath: true,
    });

    const pathFollower17 = new PathFollower(this.Human8, {
      path: this.path17,
      rotateToPath: true,
    });

    const pathFollower18 = new PathFollower(this.Human9, {
      path: this.path18,
      rotateToPath: true,
    });

    scene.tweens.add({
      targets: [
        pathFollower,
        pathFollower2,
        pathFollower3,
        pathFollower4,
        pathFollower5,
        pathFollower6,
        pathFollower7,
        pathFollower8,
        pathFollower9,
      ],
      t: 1,
      ease: 'Linear',
      duration: 35000,
      repeat: -1,
      yoyo: false,
      repeatDelay: 0,
    });

    scene.tweens.add({
      targets: [
        pathFollower10,
        pathFollower11,
        pathFollower12,
        pathFollower13,
        pathFollower14,
        pathFollower15,
        pathFollower16,
        pathFollower17,
        pathFollower18,
      ],
      t: 1,
      ease: 'Linear',
      duration: 90000,
      repeat: -1,
      yoyo: true,
      repeatDelay: 0,
    });
  }
}

export default Ways;
