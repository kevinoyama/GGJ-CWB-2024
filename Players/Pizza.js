export default class Pizza {
    constructor(game) {
        this.game = game;
        this.totalOfAttacks = 5;
        this.isDefending = false;
        this.lifeHealth = 100;
    }
    //pillow

    preload() {
        this.game.load.spritesheet('pizza', '../assets/pizzasprite.png', {
            frameWidth: 300, frameHeight: 400 // 
        });
        this.game.load.audio('pizzaAttackAudio',['../assets/Golpe aplicado pizza.m4a']);
    }

    create() {
        this.player = this.game.physics.add.sprite(200, 200, 'pizza').setScale(0.5).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.setCollideWorldBounds(true);
        this.createPizzaAnims();
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.attackSound = this.game.sound.add('pizzaAttackAudio');

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on("down", function(event) {
            if (this.totalOfAttacks == 0) {
                this.game.time.addEvent({
                    delay: 3000,
                    callback: this.recharge,
                    callbackScope: this
                });
            }

            if (this.totalOfAttacks > 0) {
                this.launchPizzaSpecialAttack();
                this.attackSound.play();
                this.totalOfAttacks -= 1;
            }
        }, this);
        var downKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        downKey.on('down', (event) => {
            this.isDefending = true;
            this.player.anims.play('pizza-defend', true);
        }, this)

        downKey.on('up', () => {
            this.isDefending = false;
        }, this);
        this.CTRL_key = this.game.input.keyboard.addKey('CTRL');
        this.CTRL_key.on("down",() => {
            this.attacking();
        }, this);

    }
    recharge() {
        this.totalOfAttacks = 5; 
    }

    update() {
        this.handlePizzaMovements();
        this.checkWorldBounds();
    }

/*     launchPizzaSpecialAttack() {
        var attackDirection = (this.player.scaleX > 0) ? 1 : -1;

        var attackStartX = this.player.x + (attackDirection === 1 ? 100 : -100);

        this.pizzaSpecialAttack = this.game.physics.add.sprite(attackStartX, this.player.y, 'pizzaSpecialAttack');
        this.pizzaSpecialAttack.setScale(1);

        var attackSpeed = 1500 * attackDirection;
        var attackAcceleration = -2600;

        this.pizzaSpecialAttack.setVelocityX(attackSpeed);
        this.pizzaSpecialAttack.setAccelerationY(attackAcceleration)
        this.game.time.delayedCall(1500, function () {
            this.pizzaSpecialAttack.destroy();
        }, [], this);
    } */

    createPizzaAnims() {
        this.game.anims.create({
            key: 'pizza-walk',
            frames: this.game.anims.generateFrameNumbers('pizza', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'pizza-steady',
            frames: this.game.anims.generateFrameNumbers('pizza', {
                start: 16, end: 19
            }),
            frameRate: 10
        });

        this.game.anims.create({
            key: 'pizza-jump',
            frames: this.game.anims.generateFrameNumbers('pizza', {
                start: 8, end: 11
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.game.anims.create({
            key: 'pizza-fall',
            frames: this.game.anims.generateFrameNumbers('pizza', {
                start: 12, end: 15
            }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'pizza-punch',
            frames: this.game.anims.generateFrameNumbers('pizza', { start: 20, end: 23 }),
            frameRate: 20,
            repeat: 1,
        });

        this.game.anims.create({
            key: 'pizza-defend',
            frames: this.game.anims.generateFrameNumbers('pizza', { start: 20, end: 23 }),
            frameRate: 30,
        });

    }

    attacking() {
        this.player.play('pizza-punch', true);
    }

    handlePizzaMovements() {

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(550);
            this.player.scaleX = 0.75;
            this.player.play('pizza-walk', true);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-550);
            this.player.scaleX = -0.75;
            this.player.anims.play('pizza-walk', true);
        } 
        // else if (this.cursors.down.isDown) {
        //     this.isDefending = false;
        //     this.player.setVelocityX(0);
        //     this.player.anims.play('pizza-defend', true);
        // }
        else {
            this.player.setVelocityX(0);
            if(!this.isDefending){
                this.player.play('pizza-steady', true);
            }
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.isDefending = false;
            this.player.setVelocityY(-1400);
        } else if (this.player.body.velocity.y < 0) {
            this.player.play('pizza-jump', true);
        }

        if(this.player.body.velocity.y > 0){
            this.player.play('pizza-fall', true);
        }
    }

    checkWorldBounds() {
        if (this.player.x < 0) {
            this.player.x = 0;
            this.player.setVelocityX(1);
        } else if (this.player.x > this.game.game.config.width) {
            this.player.x = this.game.config.width;
            this.player.setVelocityX(0);
        }

    }

    hittedBySpecialAttack(player, attack) {
         attack.disableBody(true, true);
         this.lifeHealth =- 10;
    }

/*     checkIfAttackedOtherPlayer(otherPlayer) {
        if(!otherPlayer.isDefending) {
            
        } 
    }*/

}