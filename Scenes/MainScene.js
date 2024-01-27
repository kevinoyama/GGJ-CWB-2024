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
        this.load.spritesheet('pillow', '../assets/pillow.png', {
            frameWidth: 300, frameHeight: 400
        });
        this.load.spritesheet('capy', '../assets/capy_sprite.png', {
            frameWidth: 32, frameHeight: 32
        });

    }

    create() {
        this.add.image(512, 200, 'bed');
        this.pillow = this.physics.add.sprite(200, 200, 'pillow').setScale(0.75).refreshBody(); //.setScale(7).refreshBody();
        this.capy = this.physics.add.sprite(560, 200, 'capy', 4).setScale(10).refreshBody();

        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on("down", function (event) {
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
            frames: this.anims.generateFrameNumbers('pillow', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'pillow', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('pillow', {
                start: 8, end: 15
            }),
            frameRate: 0.01,
            repeat: 1,
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('pillow', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'punch-right',
            frames: this.anims.generateFrameNumbers('pillow', { start: 20, end: 23 }),
            frameRate: 30,
            repeat: -1,
            duration: 1000
        });

        //animação para a capivara

        this.anims.create({
            key: 'capy-right',
            frames: this.anims.generateFrameNumbers('capy', { start: 6, end: 9 }),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'capy-left',
            frames: this.anims.generateFrameNumbers('capy', { start: 6, end: 9 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'capy-turn',
            frames: [{key: 'capy', frame: 4}],
            frameRate: 20,
            repeat: -1
        });

        this.pillow.setCollideWorldBounds(true);
        this.capy.setCollideWorldBounds(true);
        this.physics.add.collider(this.pillow, this.capy);

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
 

