/* eslint-disable no-unused-vars */
import { nanoid } from 'nanoid';

import Player from '../player';

import IAbstarct from '../interface';
import PARAMS from './constants';

class Map extends IAbstarct {
  static id = nanoid();

  preload(scene) {
    scene.load.image(PARAMS.id, PARAMS.pic);
    scene.load.tilemapTiledJSON(this.constructor.id, PARAMS.mapJSON);
    scene.load.spritesheet(PARAMS.waterID, PARAMS.waterPic, PARAMS.frameSize);
  }

  create(scene) {
    const config = {
      key: PARAMS.waterAnimationID,
      frames: scene.anims.generateFrameNumbers(
        PARAMS.waterID,
        PARAMS.frameWater,
      ),
      frameRate: 1,
      repeat: -1,
      repeatDelay: 2,
    };

    const map = scene.add.tilemap(this.constructor.id);

    scene.anims.create(config);

    const waterLayer = map.layers[0].data;

    for (let pointArr = 0; pointArr < waterLayer.length; pointArr++) {
      for (let tile = 0; tile < waterLayer[pointArr].length; tile++) {
        const tileInfo = waterLayer[pointArr][tile];
        if (tileInfo.index !== -1) {
          const width = tileInfo.x * PARAMS.frameSize.frameWidth;
          const height = tileInfo.y * PARAMS.frameSize.frameHeight;
          const delay = 500;

          const water = scene.add
            .sprite(width, height, PARAMS.waterID)
            .setOrigin(0, 0);

          water.anims.delayedPlay(delay, PARAMS.waterAnimationID);
        }
      }
    }

    const terrain = map.addTilesetImage(PARAMS.mainTilesID, PARAMS.id);

    map.createStaticLayer(PARAMS.groundID, [terrain]);
    map.createStaticLayer(PARAMS.roadsID, [terrain]);

    this.object = map.createStaticLayer(PARAMS.boxID, [terrain]);

    this.object.setCollisionByProperty({
      collides: true,
    });

    scene.physics.world.setBounds(
      640,
      640,
      map.widthInPixels - 1000,
      map.heightInPixels - 1000,
    );

    this.border = scene.cameras
      .add(
        PARAMS.positionBorder.x,
        PARAMS.positionBorder.y,
        PARAMS.sizeBorder.width,
        PARAMS.sizeBorder.height,
      )
      .setZoom(PARAMS.minimapZoom)
      .setName(PARAMS.nameBorder);
    this.border.transparent = PARAMS.transparentMinimap;
    this.border.setBackgroundColor(
      PARAMS.backgroundBorder.r,
      PARAMS.backgroundBorder.g,
      PARAMS.backgroundBorder.b,
      PARAMS.backgroundBorder.a,
    );
    this.border.setScene(scene);
    this.border.scrollX = PARAMS.scrollXMinimap;
    this.border.scrollY = PARAMS.scrollYMinimap;
    this.border.fadeOut(
      PARAMS.fadeTimeBorder,
      PARAMS.backgroundBorder.r,
      PARAMS.backgroundBorder.g,
      PARAMS.backgroundBorder.b,
    );
    this.border.alpha = PARAMS.alphaBorder;

    this.minimap = scene.cameras
      .add(
        PARAMS.positionMinimap.x,
        PARAMS.positionMinimap.y,
        PARAMS.sizeMinimap.width,
        PARAMS.sizeMinimap.height,
      )
      .setZoom(PARAMS.minimapZoom)
      .setName(PARAMS.nameMinimap);
    this.minimap.transparent = PARAMS.transparentMinimap;
    this.minimap.setBackgroundColor(
      PARAMS.backgroundMinimap.r,
      PARAMS.backgroundMinimap.g,
      PARAMS.backgroundMinimap.b,
      PARAMS.backgroundMinimap.a,
    );
    this.minimap.setScene(scene);
    this.minimap.scrollX = PARAMS.scrollXMinimap;
    this.minimap.scrollY = PARAMS.scrollYMinimap;
    this.minimap.tintFill = PARAMS.tintFillMinimap;
    this.minimap.setTint(
      PARAMS.tintMinimap.topLeft,
      PARAMS.tintMinimap.topRight,
      PARAMS.tintMinimap.bottomLeft,
      PARAMS.tintMinimap.bottomRight,
    );
    this.minimap.fadeIn();
    this.minimap.alpha = PARAMS.alphaMinimap;
  }

  update(scene, featureMap) {
    const gameObject = featureMap[Player.id];
    const player = gameObject.object;

    this.minimap.scrollX = player.x - 100;
    this.minimap.scrollY = player.y - 100;
  }
}

export default Map;
