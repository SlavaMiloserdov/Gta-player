/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { nanoid } from 'nanoid';

import IAbstarct from '../interface';

import Citizen from '../bots/citizens';
import Human from '../bots/human';
import Human2 from '../bots/human-2';
import Human3 from '../bots/human-3';
import Human4 from '../bots/human-4';
import Human5 from '../bots/human-5';
import Human6 from '../bots/human-6';
import Human7 from '../bots/human-7';
import Human8 from '../bots/human-8';
import Human9 from '../bots/human-9';
import Rednecks from '../bots/rednecks';

import TaxiCar from '../cars/taxi';
import TaxiCar2 from '../cars/taxi-2';
import TaxiCar3 from '../cars/taxi-3';
import PoliceCar from '../cars/police';
import PoliceCar2 from '../cars/police-2';
import RacingCar from '../cars/racing-car';
import RacingCar2 from '../cars/racing-car-2';
import Car from '../cars/orange-car-2';
import Car2 from '../cars/orange-car';
import BlueCar from '../cars/blue-car';
import BlueCar2 from '../cars/blue-car-2';

import Pistol from '../weapons/pistol';
import MachineGun from '../weapons/machine gun';
import Chaingun from '../weapons/chaingun';
import Bullet from '../weapons/bullet';

import TimeQuest from '../quests/time-quest';

import { PARAMS } from './constants';

import Map from '../map';
import Player from '../player';

import currentPlayer from '../../player-state';

class Interactions extends IAbstarct {
  static id = nanoid();

  preload(scene) {
    const sprites = Object.values(PARAMS.IMAGES.WEAPONS);

    sprites.forEach((sprite) => {
      scene.load.spritesheet(sprite.id, sprite.img, sprite.frameSize);
    });

    const snd = Object.values(PARAMS.SOUNDS);

    snd.forEach((element) => scene.load.audio(element.id, element.file));
  }

  create(scene, interactionMap) {
    this.sceneUI = scene.game.scene.scenes[4];
    this.timeQuestScene = scene.game.scene.scenes[5];

    scene.scene.launch(this.timeQuestScene);
    const map = interactionMap[Map.id].object;

    this.player = interactionMap[Player.id];

    this.score = this.sceneUI.add.text(
      PARAMS.textCoords[0],
      PARAMS.textCoords[2],
      `Score: ${currentPlayer.score}`,
      PARAMS.textStyle,
    );

    this.name = this.sceneUI.add.text(
      PARAMS.textCoords[1],
      PARAMS.textCoords[2],
      `${localStorage.currentPlayerName || currentPlayer.name}`,
      PARAMS.textStyle,
    );

    this.health = this.sceneUI.add.text(
      PARAMS.textCoords[0],
      PARAMS.textCoords[3],
      `Health: ${this.player.state.health}`,
      PARAMS.textStyle,
    );

    this.ammo = this.sceneUI.add.text(
      PARAMS.textCoords[0],
      PARAMS.textCoords[4],
      `Ammo: ${this.player.state.ammo}`,
      PARAMS.textStyle,
    );

    this.interactionMap = interactionMap;
    this.carContainer = scene.add.container();
    this.carContainer.visible = false;
    this.timeQuestContainer = scene.add.container();
    this.timeQuestContainer.visible = false;

    this.citizen = interactionMap[Citizen.id];
    this.human = interactionMap[Human.id];
    this.human2 = interactionMap[Human2.id];
    this.human3 = interactionMap[Human3.id];
    this.human4 = interactionMap[Human4.id];
    this.human5 = interactionMap[Human5.id];
    this.human6 = interactionMap[Human6.id];
    this.human7 = interactionMap[Human7.id];
    this.human8 = interactionMap[Human8.id];
    this.human9 = interactionMap[Human9.id];
    this.rednecks = interactionMap[Rednecks.id];

    this.taxiCar = interactionMap[TaxiCar.id];
    this.taxiCar2 = interactionMap[TaxiCar2.id];
    this.taxiCar3 = interactionMap[TaxiCar3.id];
    this.policeCar = interactionMap[PoliceCar.id];
    this.policeCar2 = interactionMap[PoliceCar2.id];
    this.racingCar = interactionMap[RacingCar.id];
    this.racingCar2 = interactionMap[RacingCar2.id];
    this.car = interactionMap[Car.id];
    this.car2 = interactionMap[Car2.id];
    this.blueCar = interactionMap[BlueCar.id];
    this.blueCar2 = interactionMap[BlueCar2.id];

    this.allCars = [
      this.taxiCar,
      this.taxiCar2,
      this.taxiCar3,
      this.policeCar,
      this.policeCar2,
      this.racingCar,
      this.racingCar2,
      this.car,
      this.car2,
      this.blueCar,
      this.blueCar2,
    ];
    this.allCarsObjects = this.allCars.map((car) => car.object);
    this.allCitizens = [
      this.citizen,
      this.human,
      this.human2,
      this.human3,
      this.human4,
      this.human5,
      this.human6,
      this.human7,
      this.human8,
      this.human9,
      this.rednecks,
    ];
    this.allCitizensObjects = this.allCitizens.map((citizen) => citizen.object);

    this.bullet = interactionMap[Bullet.id];
    this.pistol = interactionMap[Pistol.id];
    this.machineGun = interactionMap[MachineGun.id];
    this.chaingun = interactionMap[Chaingun.id];

    this.timeQuest = interactionMap[TimeQuest.id];

    scene.physics.add.collider(map, [
      this.citizen.object,
      this.rednecks.object,
    ]);

    scene.physics.add.collider(this.player.object, [
      ...this.allCitizensObjects,
      ...this.allCarsObjects,
      map,
    ]);

    this.pistolSoundEffect = scene.sound.add(PARAMS.SOUNDS.pistol.id, {
      volume: 0.01,
    });

    scene.physics.add.collider(this.player.object, this.pistol.object, () => {
      this.player.state.currentWeapon = this.player.WEAPONS.pistol;

      this.pistolSoundEffect.play();

      interactionMap[Pistol.id].object.destroy();
      this.player.state.ammo = interactionMap[Pistol.id].state.ammo;
      if (this.player.state.currentWeaponIcon) {
        this.player.state.currentWeaponIcon.destroy(this.sceneUI);
      }
      this.player.state.currentWeaponIcon = this.sceneUI.add
        .image(220, 150, PARAMS.IMAGES.WEAPONS.pistol.id)
        .setScale(0.2);
    });

    this.macGunSoundEffect = scene.sound.add(PARAMS.SOUNDS.macgun.id, {
      volume: 0.01,
    });

    scene.physics.add.collider(
      this.player.object,
      this.machineGun.object,
      () => {
        this.player.state.currentWeapon = this.player.WEAPONS.machineGun;

        this.macGunSoundEffect.play();

        interactionMap[MachineGun.id].object.destroy();
        this.player.state.ammo = interactionMap[MachineGun.id].state.ammo;
        if (this.player.state.currentWeaponIcon) {
          this.player.state.currentWeaponIcon.destroy(this.sceneUI);
        }
        this.player.state.currentWeaponIcon = this.sceneUI.add
          .image(220, 150, PARAMS.IMAGES.WEAPONS.machineGun.id)
          .setScale(0.2);
      },
    );

    scene.physics.add.collider(this.player.object, this.chaingun.object, () => {
      this.player.state.currentWeapon = this.player.WEAPONS.chaingun;

      this.macGunSoundEffect.play();

      interactionMap[Chaingun.id].object.destroy();

      this.player.state.ammo = interactionMap[Chaingun.id].state.ammo;
      if (this.player.state.currentWeaponIcon) {
        this.player.state.currentWeaponIcon.destroy(this.sceneUI);
      }
      this.player.state.currentWeaponIcon = this.sceneUI.add
        .image(220, 150, PARAMS.IMAGES.WEAPONS.chaingun.id)
        .setScale(0.2);
    });

    this.allCars.forEach((car) => {
      scene.physics.add.collider(
        car.object,
        [...this.allCitizensObjects, this.player, map],
        () => {
          // TODO урон ботам когда на них наезжают
        },
      );

      scene.physics.add.collider(
        car.object,
        this.allCars.reduce((acc, currCar) => {
          acc.push(currCar.object);
          return acc;
        }, []),
        () => {
          // TODO урон машинам при аварии
        },
      );
    });
  }

  actionsWithQuests(scene) {
    this.startSoundEffect = scene.sound.add(PARAMS.SOUNDS.start.id, {
      volume: 0.01,
    });

    this.finishSoundEffect = scene.sound.add(PARAMS.SOUNDS.finish.id, {
      volume: 0.01,
    });

    if (this.timeQuest.startObj.visible) {
      scene.physics.add.collider(
        this.player.object,
        this.timeQuest.startObj,
        () => {
          this.startSoundEffect.play();

          this.timeQuest.state.isStarted = true;
        },
      );
    }
    if (this.timeQuest.finishObj.visible) {
      scene.physics.add.collider(
        this.player.object,
        this.timeQuest.finishObj,
        () => {
          this.finishSoundEffect.play();

          this.timeQuest.state.isFinished = true;
          if (this.timeQuest.state.time > 0) {
            scene.scene.remove(this.timeQuestScene);
            currentPlayer.score += 1000;
            this.timeQuest.state.isActive = false;
          }
          this.timeQuest.finishObj.destroy();
          this.timeQuest.startObj.destroy();
        },
      );
    }
  }

  actionsWithUI() {
    this.score.setText(`Score: ${currentPlayer.score}`);
    this.health.setText(`Health: ${this.player.state.health}`);
    this.ammo.setText(`Ammo: ${this.player.state.ammo}`);
  }

  actionWithBulletsAndCars(bullet, car) {
    bullet.destroy();
    car.state.health -= 15;
  }

  actionsWithBullets(scene, interactionMap) {
    if (this.bullet.newBullet) {
      scene.physics.add.collider(this.bullet.newBullet, this.car.object, () => {
        this.actionWithBulletsAndCars(this.bullet.newBullet, this.car);
      });

      scene.physics.add.collider(
        this.bullet.newBullet,
        this.policeCar.object,
        () => {
          this.actionWithBulletsAndCars(this.bullet.newBullet, this.policeCar);
        },
      );

      scene.physics.add.collider(
        this.bullet.newBullet,
        this.racingCar.object,
        () => {
          this.actionWithBulletsAndCars(this.bullet.newBullet, this.racingCar);
        },
      );

      scene.physics.add.collider(
        this.bullet.newBullet,
        this.taxiCar.object,
        () => {
          this.actionWithBulletsAndCars(this.bullet.newBullet, this.taxiCar);
        },
      );

      scene.physics.add.collider(
        this.bullet.newBullet,
        interactionMap[Map.id].object,
        () => {
          this.bullet.newBullet.destroy();
        },
      );

      this.allCitizensObjects.forEach((citizen) => {
        scene.physics.add.collider(citizen, this.bullet.newBullet, () => {
          currentPlayer.score += 10;
          this.bullet.newBullet.destroy();
        });
      });
    }
  }

  update(scene, interactionMap) {
    this.actionsWithBullets(scene, interactionMap);
    this.actionsWithPlayer(scene);
    this.actionsWithUI();
    this.actionsWithQuests(scene);
  }

  getClosestCar(arrayOfCars) {
    let closestCar;

    const arrayOfDiffX = arrayOfCars.reduce((acc, car) => {
      acc.push(Math.abs(this.player.object.x - car.object.x));
      return acc;
    }, []);
    const arrayOfDiffY = arrayOfCars.reduce((acc, car) => {
      acc.push(Math.abs(this.player.object.y - car.object.y));
      return acc;
    }, []);
    let minDiff = arrayOfDiffX[0] + arrayOfDiffY[0];
    for (let i = 0; i < arrayOfCars.length; i++) {
      const currentDiff = arrayOfDiffX[i] + arrayOfDiffY[i];
      if (currentDiff <= minDiff) {
        minDiff = currentDiff;
        closestCar = arrayOfCars[i];
      }
    }
    return closestCar;
  }

  isCarClose(car) {
    if (
      car.x + 50 < this.player.object.x
      || car.x - 50 > this.player.object.x
    ) {
      return false;
    }
    if (
      car.y + 50 < this.player.object.y
      || car.y - 50 > this.player.object.y
    ) {
      return false;
    }
    return true;
  }

  changePosition() {
    this.state.isInsideCar = true;
  }

  changeCurrentCar(car) {
    if (car === undefined) {
      return true;
    }
    this.player.currentCar = car;
    return true;
  }

  actionsWithPlayer(scene) {
    this.getCarSoundEffect = scene.sound.add(PARAMS.SOUNDS.car.id, {
      volume: 0.01,
    });

    const pointer = scene.input.activePointer;
    this.player.closestCar = this.getClosestCar(this.allCars);

    if (
      this.player.controller.doAction.isDown
      && !this.player.state.isInsideCar
      && this.changeCurrentCar(this.player.closestCar)
      && this.isCarClose(this.player.currentCar.object)
    ) {
      this.getCarSoundEffect.play();

      this.player.object.body.enable = false;
      this.carContainer.add(this.player.object);
      this.player.currentCar.state.isPlayerInside = true;
      scene.cameras.main.startFollow(this.player.currentCar.object);
      setTimeout(this.changePosition.bind(this.player), 1000);
      this.player.currentCar.object.setImmovable(false);
    }

    if (
      this.player.controller.doAction.isDown
      && this.player.state.isInsideCar
    ) {
      this.player.object.body.enable = true;
      this.player.object = this.carContainer.getAt(0);
      this.carContainer.removeAll();
      this.player.currentCar.state.isPlayerInside = false;
      scene.add.existing(this.player.object);
      scene.cameras.main.startFollow(this.player.object);
      this.player.object.x = this.player.currentCar.object.x + 51;
      this.player.object.y = this.player.currentCar.object.y + 51;
      this.player.state.isInsideCar = false;
    }

    if (
      pointer.isDown
      && this.player.state.ammo
      && !this.player.state.isShooting
    ) {
      this.player.state.isShooting = true;

      switch (this.player.state.currentWeapon) {
        case this.player.WEAPONS.pistol:
          this.player.object.anims.play(
            this.player.animations.pistol.key,
            true,
          );
          Pistol.shooting(scene, this.player, this.interactionMap);
          setTimeout(() => {
            this.player.state.isShooting = false;
          }, 750);
          break;
        case this.player.WEAPONS.machineGun:
          this.player.object.anims.play(
            this.player.animations.machineGun.key,
            true,
          );
          MachineGun.shooting(scene, this.player, this.interactionMap);
          setTimeout(() => {
            this.player.state.isShooting = false;
          }, 500);
          break;
        case this.player.WEAPONS.chaingun:
          this.player.object.anims.play(
            this.player.animations.chaingunShoot.key,
            true,
          );
          Chaingun.shooting(scene, this.player, this.interactionMap);
          setTimeout(() => {
            this.player.state.isShooting = false;
          }, 350);
          break;
        default:
          break;
      }
    }
  }
}

export default Interactions;
