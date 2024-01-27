export default class Pillow {
    constructor(game) {
        this.game = game;
        this.totalOfAttacks = 5;
        this.isDefending = false;
        this.lifeHealth = 100;
        this.isReloading = false; // Adicionando uma flag para controlar o recarregamento
    }

    preload() {
        this.game.load.spritesheet('pillow', '../assets/Pillowsprite.png', {
            frameWidth: 300, frameHeight: 400
        });
        this.game.load.audio('pillowAttackAudio',['../assets/Golpe aplicado travesseiro.m4a']);
    }

    create() {
        this.player = this.game.physics.add.sprite(200, 200, 'pillow').setScale(0.75).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.setCollideWorldBounds(true);
        this.createPillowAnims();
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.attackSound = this.game.sound.add('pillowAttackAudio');

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on("down", function(event) {
            if (this.totalOfAttacks === 0 && !this.isReloading) {
                this.isReloading = true; 
                this.game.time.addEvent({
                    delay: 3000,
                    callback: this.recharge,
                    callbackScope: this
                });
            }

            if (this.totalOfAttacks > 0) {
                this.launchPillowSpecialAttack();
                this.attackSound.play();
                this.totalOfAttacks -= 1;
                this.launchPillowSpecialAttack();
            }
        }, this);
        var downKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        downKey.on('down', (event) => {
            this.isDefending = true;
            this.player.anims.play('pillow-defend', true);
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
        this.isReloading = false; 
    }

    update() {
        this.handlePillowMovements();
        this.checkWorldBounds();
    }

    launchPillowSpecialAttack() {
        var attackDirection = (this.player.scaleX > 0) ? 1 : -1;
        var attackStartX = this.player.x + (attackDirection === 1 ? 100 : -100);

        this.pillowSpecialAttack = this.game.physics.add.sprite(attackStartX, this.player.y, 'pillowSpecialAttack');
        this.pillowSpecialAttack.setScale(1);

        var attackSpeed = 1500 * attackDirection;
        var attackAcceleration = -2600;

        this.pillowSpecialAttack.setVelocityX(attackSpeed);
        this.pillowSpecialAttack.setAccelerationY(attackAcceleration)
        this.game.time.delayedCall(1500, function () {
            this.pillowSpecialAttack.destroy();
        }, [], this);
    }

    createPillowAnims() {
        this.game.anims.create({
            key: 'pillow-walk',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'pillow-steady',
            frames: this.game.anims.generateFrameNumbers('pillow', {
                start: 16, end: 19
            }),
            frameRate: 10
        });

        this.game.anims.create({
            key: 'pillow-jump',
            frames: this.game.anims.generateFrameNumbers('pillow', {
                start: 8, end: 11
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.game.anims.create({
            key: 'pillow-fall',
            frames: this.game.anims.generateFrameNumbers('pillow', {
                start: 12, end: 15
            }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'pillow-punch',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 20, end: 23 }),
            frameRate: 20,
            repeat: 1,
        });

        this.game.anims.create({
            key: 'pillow-defend',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 20, end: 23 }),
            frameRate: 30,
        });

    }

    attacking() {
        this.player.play('pillow-punch', true);
    }

    handlePillowMovements() {
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(550);
            this.player.scaleX = 0.75;
            this.player.play('pillow-walk', true);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-550);
            this.player.scaleX = -0.75;
            this.player.anims.play('pillow-walk', true);
        } 
        // else if (this.cursors.down.isDown) {
        //     this.isDefending = false;
        //     this.player.setVelocityX(0);
        //     this.player.anims.play('pillow-defend', true);
        // }
        else {
            this.player.setVelocityX(0);
            if(!this.isDefending){
                this.player.play('pillow-steady', true);
            }
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.isDefending = false;
            this.player.setVelocityY(-1400);
        } else if (this.player.body.velocity.y < 0) {
            this.player.play('pillow-jump', true);
        }

        if(this.player.body.velocity.y > 0){
            this.player.play('pillow-fall', true);
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

    checkIfAttackedOtherPlayer(otherPlayer) {
        if(!otherPlayer.isDefending) {
            
        }
    }

}
