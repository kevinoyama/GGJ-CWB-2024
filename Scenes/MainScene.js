import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
    }

    preload() {
        this.load.image('bed', '../assets/bed-example.jpg');
        this.load.image('pillowSpecialAttack', '../assets/sprite_31.png');
        this.load.spritesheet('pillow', '../assets/pillow-sprite.png', {
            frameWidth: 280, frameHeight: 270
        });
    }

    create() {
        this.add.image(512, 200, 'bed');
        this.pillowSpecialAttack = this.physics.add.image(512,400, 'pillowSpecialAttack').setScale(0.75).refreshBody();
        this.pillow = this.physics.add.sprite(200,200,'pillow');
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pillow', { start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'pillow', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pillow', { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'punch-right',
            frames: this.anims.generateFrameNumbers('pillow', { start: 10, end: 10}),
            frameRate: 30,
            repeat: -1,
            duration: 1000 
        })

        this.pillowSpecialAttack .setCollideWorldBounds(true);
        this.pillow.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.A_key = this.input.keyboard.addKey('A');
        this.D_key = this.input.keyboard.addKey('D');
        this.W_key = this.input.keyboard.addKey('W');
        this.F_key = this.input.keyboard.addKey('F');
    }

    update() {

        this.pillowSpecialAttack.rotation += 0.1;

        // // player 1
        // if (this.A_key.isDown) {
        //     if (this.counter >= 40) {
        //         this.counter = 0;
        //     }else {this.counter += 1} 

        //     this.pillow.setVelocityX(-180);
        //     this.pillow.setRotation(-this.counter*3.15/20);
        
        // }else if (this.D_key.isDown){
            
        //     if (this.counter >= 40) {
        //         this.counter = 0;
        //     }else {this.counter += 1} 
        //     this.pillow.setVelocityX(180);
        //     this.pillow.setRotation(this.counter*3.15/20);

        // }
        // else {
        //     this.pillow.setVelocityX(0);
        //     this.pillow.setRotation(0);

        // }
        // if (this.W_key.isDown){ //  && this.pillow.body.touching.down
        //     this.pillow.setVelocityY(-500);
        // }

        // player 2
        if (this.cursors.left.isDown) {
           /*  if (this.counter2 >= 40) {
                this.counter2 = 0;
            }else {this.counter2 += 1} 

            this.pillow2.setVelocityX(-180);
            this.pillow2.setRotation(-this.counter2*3.15/20); */

            this.pillow.setVelocityX(-180);
            this.pillow.anims.play('left', true);

        }else if (this.cursors.right.isDown){
            /* if (this.counter2 >= 40) {
                this.counter2 = 0;
            }else {this.counter2 += 1} 
            this.pillow2.setVelocityX(180);
            this.pillow2.setRotation(this.counter2*3.15/20); */
            this.pillow.setVelocityX(180);
            this.pillow.anims.play('right', true);
        }
        else {
            //this.pillow2.setVelocityX(0);
            this.pillow.setVelocityX(0);
            this.pillow.play('turn');
        }
        if (this.cursors.up.isDown){ //  && this.pillow.body.touching.down
            this.pillow.setVelocityY(-500);
        }

        if(this.cursors.space.isDown) {
            this.pillow.play('punch-right');
        }

        if (this.physics.collide(this.pillowSpecialAttack, this.pillow) && this.F_key.isDown) {
            this.pillow.setVelocity(2000,-2000);
        } 
    }

}
