import Phaser from 'phaser';

import skyBg from "./assets/sky.png";
import bomb from './assets/bomb.png';
import heroImg from './assets/walking.png';
import aimImg from './assets/star.png';

let player;
let control;
let bullet;
let speedPlayer = 160;
let worldBounds;
let aim;

const config = {
    type: Phaser.AUTO,
    width: 1200,
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
        update: update
    }
};

const game = new Phaser.Game(config);


function preload() {
    this.load.image('sky', skyBg);
    this.load.image('bullet', bomb);
    this.load.image('aim', aimImg);

    this.load.spritesheet('hero', heroImg,
        { frameWidth: 80, frameHeight: 100 }
    );
}

function create() {
    worldBounds = this.physics.world.bounds;

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
    let pointer = this.input.activePointer;
    if (control.keyObjLeft.isDown) {
        player.setVelocityX(-speedPlayer);
        player.anims.play("walking", true);
        player.rotation = -1.5;
    }
    if (control.keyObjRight.isDown) {
        player.setVelocityX(speedPlayer);
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
        player.setVelocityY(-speedPlayer);
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
        player.setVelocityY(speedPlayer);
        player.anims.play("walking", true);
    }

    if (!control.keyObjLeft.isDown && !control.keyObjRight.isDown && !control.keyObjUp.isDown && !control.keyObjDown.isDown) {
        player.anims.play("stop");
    }

    if (!control.keyObjLeft.isDown && !control.keyObjRight.isDown) {
        player.setVelocityX(0);
    }
    if (!control.keyObjUp.isDown && !control.keyObjDown.isDown) {
        player.setVelocityY(0);
    }

    if (control.keyObjRun.isDown) {
        if (player.body.velocity.x > 0) {
            player.setVelocityX(speedPlayer * 2);
        }
        if (player.body.velocity.x < 0) {
            player.setVelocityX(-speedPlayer * 2);
        }
        if (player.body.velocity.y > 0) {
            player.setVelocityY(speedPlayer * 2);
        }
        if (player.body.velocity.y < 0) {
            player.setVelocityY(-speedPlayer * 2);
        }
    }


    // SHOOTING

    if (pointer.rightButtonDown()) {
        // aim = this.physics.add.sprite(pointer.x, pointer.y, 'aim');
        
        if (pointer.leftButtonDown()) {
            // angle between mouse and bullet
            let angle = Phaser.Math.Angle.Between(player.x, player.y, this.input.x, this.input.y);
            //rotation cannon
            player.setRotation(angle + Math.PI / 2);
    
            bullet = this.physics.add.sprite(player.x, player.y, 'bullet');
            this.physics.moveTo(bullet, pointer.x, pointer.y, 500);
        }
    }    

}
