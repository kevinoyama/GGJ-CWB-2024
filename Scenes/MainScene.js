import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
    }

    preload() {
        this.load.image('bed', '../assets/bed-example.jpg');
        this.load.image('pillow', '../assets/pillow.png');
        this.load.image('pillow2', '../assets/pillow2.png');
    }

    create() {
        this.add.image(512, 200, 'bed');
        this.pillow = this.physics.add.image(512,400, 'pillow').setScale(0.2).refreshBody();
        this.pillow2 = this.physics.add.image(200,400, 'pillow2').setScale(0.2).refreshBody();
    
        this.pillow.setCollideWorldBounds(true);
        this.pillow2.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.A_key = this.input.keyboard.addKey('A');
        this.D_key = this.input.keyboard.addKey('D');
        this.W_key = this.input.keyboard.addKey('W');
    }

    update() {
        // player 1
        if (this.A_key.isDown) {
            this.pillow.setVelocityX(-180);
        }else if (this.D_key.isDown){
            this.pillow.setVelocityX(180);
        }
        else {
            this.pillow.setVelocityX(0);
        }
        if (this.W_key.isDown){ //  && this.pillow.body.touching.down
            this.pillow.setVelocityY(-500);
        }

        // player 2
        if (this.cursors.left.isDown) {
            this.pillow2.setVelocityX(-180);
        }else if (this.cursors.right.isDown){
            this.pillow2.setVelocityX(180);
        }
        else {
            this.pillow2.setVelocityX(0);
        }
        if (this.cursors.up.isDown){ //  && this.pillow.body.touching.down
            this.pillow2.setVelocityY(-500);
        }
    }

}
