export default class Player {
    constructor(game, config, playerId) {
        this.game = game;
        this.config = config;
        this.playerId = playerId;
        this.totalOfAttacks = 5;
        this.isDefending = false;
        this.isAttacking = false;
        this.lifeHealth = 100;
        this.attack_audio_key = this.config.name + 'attack_audio';
        // anims keys
        this.walk_key = this.config.name + '-walk';
        this.steady_key = this.config.name + '-steady';
        this.defend_key = this.config.name + '-defend';
        this.jump_key = this.config.name + '-jump';
        this.fall_key = this.config.name + '-fall';
        this.attack_key = this.config.name + '-attack';
        this.special_attack_key = this.config.name + '-special-attack';

    }


    preload() {
        this.game.load.spritesheet(this.config.name, this.config.spritesheet, {
            frameWidth: 300, frameHeight: 400 // 
        });
        this.game.load.audio(this.attack_audio_key, [this.config.attack_audio]);
        this.game.load.image(this.special_attack_key, this.config.special_attack_image);
    }

    create() {
        this.player = this.game.physics.add.sprite(this.config.start_x, this.config.start_y, this.config.name).setScale(0.75).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.setCollideWorldBounds(true);
        this.createAnims();
        this.commands = {
            right: this.playerId == 1 ? this.game.input.keyboard.addKey('D') : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            left: this.playerId == 1 ? this.game.input.keyboard.addKey('A') : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            jump: this.playerId == 1 ? this.game.input.keyboard.addKey('W') : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            defend: this.playerId == 1 ? this.game.input.keyboard.addKey('S') : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            special_attack: this.playerId == 1 ? this.game.input.keyboard.addKey('F') : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            attack: this.playerId == 1 ? this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) : this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
        }

        this.attackSound = this.game.sound.add(this.attack_audio_key);

        //var spaceKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.commands.special_attack.on("down", function (event) {
            if (this.totalOfAttacks == 0) {
                this.game.time.addEvent({
                    delay: 3000,
                    callback: this.recharge,
                    callbackScope: this
                });
            }

            if (this.totalOfAttacks > 0) {
                this.launchSpecialAttack();
                this.attackSound.play();
                this.totalOfAttacks -= 1;
            }
        }, this);
        //var downKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.commands.defend.on('down', (event) => {
            this.isDefending = true;
            this.player.anims.play(this.defend_key, true);
        }, this)

        this.commands.defend.on('up', () => {
            this.isDefending = false;
        }, this);
    }
    update() {
        this.handleMovements();
        // this.checkWorldBounds();
    }
    launchSpecialAttack() {
        var attackDirection = (this.player.scaleX > 0) ? 1 : -1;
        var attackStartX = this.player.x + (attackDirection === 1 ? 100 : -100);

        var specialAttack = this.game.physics.add.sprite(attackStartX, this.player.y, this.special_attack_key);
        specialAttack.setScale(0.3);
        specialAttack.rotation = 1;
        this.specialAttacks.add(specialAttack);

        var attackSpeed = 1200 * attackDirection;
        var attackAcceleration = -2600;

        specialAttack.setVelocityX(attackSpeed);
        specialAttack.setAccelerationY(attackAcceleration)
        this.game.time.delayedCall(1500, function () {
            specialAttack.destroy();
        }, [], this);
    }

    recharge() {
        this.totalOfAttacks = 5;
    }

    createAnims() {
        this.game.anims.create({
            key: this.walk_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: this.steady_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, {
                start: 16, end: 19
            }),
            frameRate: 10
        });

        this.game.anims.create({
            key: this.jump_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, {
                start: 8, end: 11
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.game.anims.create({
            key: this.fall_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, {
                start: 12, end: 15
            }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: this.attack_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, { start: 20, end: 23 }),
            frameRate: 20,
            repeat: 1,
        });

        this.game.anims.create({
            key: this.defend_key,
            frames: this.game.anims.generateFrameNumbers(this.config.name, { start: this.config.defend_frame_start, end: this.config.defend_frame_end }),
            frameRate: 30,
            repeat: 0
        });

    }

    /*     attacking() {
            this.player.play('pizza-punch', true);
        } */

    handleMovements() {

        if (this.commands.right.isDown) {
            this.isDefending = false;
            this.player.setVelocityX(550);
            //this.player.scaleX = 0.75;
            this.player.play(this.walk_key, true);
            this.player.flipX = false;
        } else if (this.commands.left.isDown) {
            this.isDefending = false;
            this.player.setVelocityX(-550);
            //this.player.scaleX = -0.75;
            this.player.anims.play(this.walk_key, true);
            this.player.flipX = true;
        }
        else {
            this.player.setVelocityX(0);
            if (!this.isDefending) {
                this.player.play(this.steady_key, true);
            }
        }

        if (this.commands.jump.isDown && this.player.body.blocked.down) {
            this.isDefending = false;
            this.player.setVelocityY(-1400);
        } else if (this.player.body.velocity.y < 0) {
            this.isDefending = false;
            this.player.play(this.jump_key, true);
        }

        if (this.player.body.velocity.y > 0) {
            this.isDefending = false;
            this.player.play(this.fall_key, true);
        }
    }

}

