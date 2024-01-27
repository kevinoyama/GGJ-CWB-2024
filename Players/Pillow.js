export default class Pillow {
    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.spritesheet('pillow', '../assets/pillow.png', {
            frameWidth: 300, frameHeight: 400
        });
    }

    create() {
        this.player = this.game.physics.add.sprite(200, 200, 'pillow').setScale(0.75).refreshBody();
        this.player.setCollideWorldBounds(true);
        this.createPillowAnims();
        this.cursors = this.game.input.keyboard.createCursorKeys();

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on("down", function(event) {
            this.launchPillowSpecialAttack();
        }, this);
    }

    update() {
        this.handlePillowMovements();
        this.checkWorldBounds();
    }

    launchPillowSpecialAttack() {
        var attackDirection = (this.player.scaleX > 0) ? 1 : -1;

        var attackStartX = this.player.x + (attackDirection === 1 ? 100 : -100);

        var pillowSpecialAttack = this.game.physics.add.sprite(attackStartX, this.player.y, 'pillowSpecialAttack');
        pillowSpecialAttack.setScale(1);

        var attackSpeed = 1500 * attackDirection;
        var attackAcceleration = -2600;

        pillowSpecialAttack.setVelocityX(attackSpeed);
        pillowSpecialAttack.setAccelerationY(attackAcceleration)
        this.game.time.delayedCall(5000, function () {
            pillowSpecialAttack.destroy();
        }, [], this);
    }

    createPillowAnims() {
        this.game.anims.create({
            key: 'right',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'turn',
            frames: [{ key: 'pillow', frame: 0 }],
            frameRate: 20
        });

        this.game.anims.create({
            key: 'jump',
            frames: this.game.anims.generateFrameNumbers('pillow', {
                start: 8, end: 15
            }),
            frameRate: 0.01,
            repeat: 1,
        });

        this.game.anims.create({
            key: 'left',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'punch-right',
            frames: this.game.anims.generateFrameNumbers('pillow', { start: 20, end: 23 }),
            frameRate: 30,
            repeat: -1,
            duration: 1000
        });
    }

    handlePillowMovements() {

     

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(550);
            this.player.scaleX = 0.75;
            this.player.play('right', true);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-550);
            this.player.scaleX = -0.75;
            this.player.anims.play('left', true);
        } else {
            this.player.setVelocityX(0);
            this.player.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
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

}