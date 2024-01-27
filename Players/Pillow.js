export default class Pillow {
    constructor(game) {
        this.game = game;
        this.totalOfAttacks = 5;
        this.isDefending = false;
        this.lifeHealth = 100;
    }

    preload() {
        this.game.load.spritesheet('pillow', '../assets/pillow.png', {
            frameWidth: 300, frameHeight: 400
        });
    }

    create() {
        this.player = this.game.physics.add.sprite(800, 200, 'pillow').setScale(0.75).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.setCollideWorldBounds(true);
        this.createPillowAnims();
        this.cursors = this.game.input.keyboard.createCursorKeys();

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
                this.launchPillowSpecialAttack();
                this.totalOfAttacks -= 1;
            }
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

        pillowSpecialAttack.setVelocityX(attackSpeed);
        pillowSpecialAttack.setAccelerationY(attackAcceleration)
        this.game.time.delayedCall(1500, function () {
            pillowSpecialAttack.destroy();
        }, [], this);
    }

    createPillowAnims() {
        this.game.anims.create({
            key: 'pillow-walk',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'pillow-turn',
            frames: [{ key: 'pillow', frame: 0 }],
            frameRate: 20
        });

        this.game.anims.create({
            key: 'pillow-jump',
            frames: this.game.anims.generateFrameNumbers('pillow', {
                start: 8, end: 15
            }),
            frameRate: 0.01,
            repeat: 1,
        });

        this.game.anims.create({
            key: 'pillow-punch',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 20, end: 23 }),
            frameRate: 20,
            repeat: 1,
        });

        this.game.anims.create({
            key: 'pillow-defend',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: 1
        });
    }

    attacking() {
        this.player.play('pillow-punch', true);
    }

    handlePillowMovements() {

        if (this.cursors.right.isDown) {
            this.isDefending = true;
            this.player.setVelocityX(550);
            this.player.scaleX = 0.75;
            this.player.play('pillow-walk', true);
        } else if (this.cursors.left.isDown) {
            this.isDefending = true;
            this.player.setVelocityX(-550);
            this.player.scaleX = -0.75;
            this.player.anims.play('pillow-walk', true);
        } else if (this.cursors.down.isDown) {
            this.isDefending = false;
            this.player.setVelocityX(0);
            this.player.anims.play('pillow-defend', true);
        }else {
            this.isDefending = true;
            this.player.setVelocityX(0);
            this.player.play('pillow-turn');
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.isDefending = false;
            this.player.setVelocityY(-1400);
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