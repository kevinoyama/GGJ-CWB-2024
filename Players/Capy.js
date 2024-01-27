export default class Capy {

    constructor(game) {
        this.game = game;
        this.lifeHealth = 100;
    }

    preload() {
        this.game.load.spritesheet('capy', '../assets/capy_sprite.png', {
            frameWidth: 32, frameHeight: 32
        });
    }

    create() {
        this.player = this.game.physics.add.sprite(200, 200, 'capy', 4).setScale(10).refreshBody();
        this.specialAttacks = this.game.physics.add.group();
        this.player.flipX = true;
        this.player.setCollideWorldBounds(true);
        this.createCapyAnims();
        this.A_key = this.game.input.keyboard.addKey('A');
        this.D_key = this.game.input.keyboard.addKey('D');
        this.W_key = this.game.input.keyboard.addKey('W');
        this.F_key = this.game.input.keyboard.addKey('F');
    }

    update() {
        this.handleCapyMovements();
        this.checkWorldBounds();
    }

    createCapyAnims() {
        this.game.anims.create({
            key: 'capy-walk',
            frames: this.game.anims.generateFrameNumbers('capy', { start: 6, end: 9 }),
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'capy-turn',
            frames: [{ key: 'capy', frame: 4 }],
            frameRate: 20,
            repeat: -1
        });

        this.game.anims.create({
            key: 'capy-jump',
            frames: this.game.anims.generateFrameNumbers('capy',  { start: 9, end: 14 }),
            frameRate: 10,
            repeat: 1
        });
    }

    handleCapyMovements() {
        if(this.D_key.isDown){
            this.player.flipX = true;
            this.player.setVelocityX(550);
            this.player.play('capy-walk', true);
        }
        else if(this.A_key.isDown){
            this.player.flipX = false;
            this.player.setVelocityX(-550);
            this.player.play('capy-walk', true);
        } else {
            this.player.setVelocityX(0);
            this.player.play('capy-turn');
        }

        if(this.W_key.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-1400);
        } else if (this.W_key.isDown) {
            this.player.play('capy-jump', true);
        }

        
    }

    hittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);
        this.lifeHealth =- 10;
        console.log(this.lifeHealth);
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