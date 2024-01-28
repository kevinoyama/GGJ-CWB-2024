export default class Capy {

    constructor(game) {
        this.game = game;
        this.lifeHealth = 100;
        this.isDefending = false;
    }

    preload() {
        this.game.load.spritesheet('capy', '../assets/capysprite.png', {
            frameWidth: 300, frameHeight: 400
        });
    }

    create() {
        this.player = this.game.physics.add.sprite(800, 200, 'capy', 4).setScale(0.7).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.flipX = true;
        this.player.setCollideWorldBounds(true);
        this.createCapyAnims();
        this.A_key = this.game.input.keyboard.addKey('A');
        this.D_key = this.game.input.keyboard.addKey('D');
        this.W_key = this.game.input.keyboard.addKey('W');
        this.S_key = this.game.input.keyboard.addKey('S');
        this.F_key = this.game.input.keyboard.addKey('F');

        this.S_key.on('down', () => {
            console.log('here');
            this.isDefending = true;
            this.player.anims.play('capy-defend', true);
        });
        this.S_key.on('up', () => {
            this.isDefending = false;
        }, this);
    }

    update() {
        this.handleCapyMovements();
        this.checkWorldBounds();
    }

    createCapyAnims() {
        this.game.anims.create({
            key: 'capy-walk',
            frames: this.game.anims.generateFrameNumbers('capy', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'capy-steady',
            frames: this.game.anims.generateFrameNumbers('capy', { start: 16, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'capy-jump',
            frames: this.game.anims.generateFrameNumbers('capy',  { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'capy-fall',
            frames: this.game.anims.generateFrameNumbers('capy',  { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.game.anims.create({
            key: 'capy-defend',
            frames: this.game.anims.generateFrameNumbers('capy',  { start: 20, end: 22 }),
            frameRate: 30
        });
    }

    handleCapyMovements() {
        if(this.D_key.isDown){
            this.player.flipX = false;
            this.player.setVelocityX(550);
            this.player.play('capy-walk', true);
        }
        else if(this.A_key.isDown){
            this.player.flipX = true;
            this.player.setVelocityX(-550);
            this.player.play('capy-walk', true);
        } else {
            this.player.setVelocityX(0);
            if(!this.isDefending){
                this.player.play('capy-steady', true);
            }
        }

        if(this.W_key.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-1400);
        } else if (this.player.body.velocity.y < 0) {
            this.player.play('capy-jump', true);
        }

        if(this.player.body.velocity.y > 0) {
            this.player.play('capy-fall', true);
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