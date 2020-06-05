import Phaser from '../node_modules/phaser';

import skyBg from "./assets/sky.png";
// import heroImg from './assets/dude.png';
import heroImg from './assets/walking.png';

let player;
let control;

const config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 850,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

const game = new Phaser.Game(config);


function preload() {
    this.load.image('sky', skyBg);

    this.load.spritesheet('hero', heroImg,
        { frameWidth: 80, frameHeight: 100 }
    );
}


function create() {
    this.add.image(700, 300, 'sky').setScale(3);

    player = this.physics.add.sprite(520, 200, "hero");
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "walking",
        frames: this.anims.generateFrameNumbers("hero",
            {
                start: 0, end: 5
            }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "stop",
        frames: this.anims.generateFrameNumbers("hero",
            {
                start: 0, end: 0
            }),
        frameRate: 10,
        repeat: -1,
    });


    // Get keys object
    control = {
        keyObjLeft: this.input.keyboard.addKey('A'),
        keyObjRight: this.input.keyboard.addKey('D'),
        keyObjUp: this.input.keyboard.addKey('W'),
        keyObjDown: this.input.keyboard.addKey('S'),
        keyObjRun: this.input.keyboard.addKey('SPACE'),
        keyObjAction: this.input.keyboard.addKey('ENTER'),
    }

    // keys = this.input.keyboard.addKeys({
    //     up: 'W',
    //     down: 'S',
    //     left: 'A',
    //     right: 'D'
    // });
}


function update() {
    if (control.keyObjLeft.isDown) {
        player.setVelocityX(-160);
        player.anims.play("walking", true);
        player.rotation = -1.5;
    }
    if (control.keyObjRight.isDown) {
        player.setVelocityX(160);
        player.anims.play("walking", true);
        player.rotation = 1.5;
    }
    if (control.keyObjUp.isDown) {
        if (control.keyObjRight.isDown) {
            player.rotation = 0.75;
        } else if (control.keyObjLeft.isDown) {
            player.rotation = -0.75;
        } else {
            player.rotation = 0;
        }
        player.setVelocityY(-160);
        player.anims.play("walking", true);        
    }
    if (control.keyObjDown.isDown) {
        if (control.keyObjRight.isDown) {
            player.rotation = 2.5;
        } else if (control.keyObjLeft.isDown) {
            player.rotation = 3.75;
        } else {
            player.rotation = 3.14;
        }
        player.setVelocityY(160);
        player.anims.play("walking", true);        
    }

    if (!control.keyObjLeft.isDown && !control.keyObjRight.isDown && !control.keyObjUp.isDown && !control.keyObjDown.isDown) {
        player.setVelocityY(0);
        player.setVelocityX(0);
        player.anims.play("stop");
    }
}
