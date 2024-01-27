import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
    }

    preload() {
        this.load.image('bed', '../assets/bed-example.jpg');
        this.load.image('pillowSpecialAttack', '../assets/sprite_31.png');
        this.load.spritesheet('pillow', '../assets/pillow-sprite.png', {
            frameWidth: 28, frameHeight: 27
        });
    }

    create() {

        this.add.image(512, 200, 'bed');
        this.pillow = this.physics.add.sprite(200,200,'pillow').setScale(5).refreshBody();
        this.pillow2 = this.physics.add.sprite(200,200,'pillow').setScale(5).refreshBody();

        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on("down", function(event) {
            this.launchPillowSpecialAttack();
        }, this);

        var rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        rightKey.on("down", function(event) {
            this.pillow.setVelocityX(550)
            this.pillow.scaleX = 4
        }, this);

        var leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        leftKey.on("down", function(event) {
            this.pillow.setVelocityX(-550)
            this.pillow.scaleX = -4
        }, this);


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('pillow', { start: 0, end: 4}),
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
            frames: this.anims.generateFrameNumbers('pillow', { start: 5, end: -8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'punch-right',
            frames: this.anims.generateFrameNumbers('pillow', { start: 9, end: 9}),
            frameRate: 30,
            repeat: -1,
            duration: 1000 
        });
        
        this.pillow.setCollideWorldBounds(true);
        this.pillow2.setCollideWorldBounds(true);
        this.physics.add.collider(this.pillow, this.pillow2);
        
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.A_key = this.input.keyboard.addKey('A');
        this.D_key = this.input.keyboard.addKey('D');
        this.W_key = this.input.keyboard.addKey('W');
        this.F_key = this.input.keyboard.addKey('F');
    }

    
    launchPillowSpecialAttack() {
        var attackDirection = (this.pillow.scaleX > 0) ? 1 : -1; 
    
        
        var attackStartX = this.pillow.x + (attackDirection === 1 ? 100 : -100);
    
        var pillowSpecialAttack = this.physics.add.sprite(attackStartX, this.pillow.y, 'pillowSpecialAttack');
        pillowSpecialAttack.setScale(1); 
        
        var attackSpeed = 1500 * attackDirection;
        var attackAcceleration = -2600;

        pillowSpecialAttack.setVelocityX(attackSpeed);
        pillowSpecialAttack.setAccelerationY(attackAcceleration)
        this.time.delayedCall(5000, function() {
            pillowSpecialAttack.destroy(); 
        }, [], this);
    }
    
    

    update() {
        this.handlePlayerMovement();
    this.checkWorldBounds();
    // Restante do seu código de atualização...
}

handlePlayerMovement() {
    // Lógica existente para movimento...
}

checkWorldBounds() {
    if (this.pillow.x < 0) {
        this.pillow.x = 0;
        this.pillow.setVelocityX(1);
    } else if (this.pillow.x > this.game.config.width) {
        this.pillow.x = this.game.config.width;
        this.pillow.setVelocityX(0);
    }
        // this.pillowSpecialAttack.rotation += 0.1;
 
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
 
             this.pillow.setVelocityX(-780);
             this.pillow.anims.play('left', true);
 
         }else if (this.cursors.right.isDown){
             /* if (this.counter2 >= 40) {
                 this.counter2 = 0;
             }else {this.counter2 += 1} 
             this.pillow2.setVelocityX(180);
             this.pillow2.setRotation(this.counter2*3.15/20); */
             this.pillow.setVelocityX(780);
             this.pillow.anims.play('right', true);
         }
         else {
             //this.pillow2.setVelocityX(0);
             this.pillow.setVelocityX(0);
             this.pillow.play('turn');
         }
         if (this.cursors.up.isDown && this.pillow.body.blocked.down){
             this.pillow.setVelocityY(-1400);

         }
         
 
         if(this.cursors.space.isDown) {
             this.pillow.play('punch-right');
         }
         
         
         //if (this.physics.collide(this.pillowSpecialAttack, this.pillow) && this.F_key.isDown) {
         //    this.pillow.setVelocity(2000,-2000);
 
 
 
         //if (this.physics.collide(this.pillowSpecialAttack, this.pillow) && this.F_key.isDown) {
         //} 
     }
 
 }
 
 

