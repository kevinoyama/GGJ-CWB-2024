import Phaser from 'phaser';

import Player from '../Players/Player';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
        this.timerTime = 5;
        this.configProfiles = [{
            name: 'capy  ',
            spritesheet: '../assets/capysprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            hitted_audio: '../assets/Golpe tomado Capivara.m4a',
            backgroud: '../assets/Capybaras_3.jpg',
            special_attack_image: '../assets/sprite_31.png',
            start_y: 400,
            defend_frame_start: 20,
            defend_frame_end: 22
        }, {
            name: 'pizza ',
            spritesheet: '../assets/pizzasprite.png',
            attack_audio: '../assets/Golpe aplicado pizza.m4a',
            hitted_audio: '../assets/Golpe tomado pizza.m4a',
            backgroud: '../assets/pizza_background.jpg',
            special_attack_image: '../assets/sprite_31.png',
            start_y: 400,
            defend_frame_start: 20,
            defend_frame_end: 23
        }, {
            name: 'pillow',
            spritesheet: '../assets/Pillowsprite.png',
            attack_audio: '../assets/Golpe tomado travesseiro.m4a',
            hitted_audio: '../assets/Golpe tomado travesseiro.m4a',
            backgroud: '../assets/pillow_background.jpg',
            start_y: 400,
            special_attack_image: '../assets/sprite_31.png',
            defend_frame_start: 20,
            defend_frame_end: 23
        }];

        this.player1ProfileNumber = this.getRandomInt(3);
        this.player2ProfileNumber = this.player1ProfileNumber;
        while (this.player2ProfileNumber == this.player1ProfileNumber) {
            this.player2ProfileNumber = this.getRandomInt(3);
        }
        this.player1Profile = this.configProfiles[this.player1ProfileNumber];
        this.player2Profile = this.configProfiles[this.player2ProfileNumber];
        this.player1 = new Player(this, { ...this.player1Profile, start_x: 200 }, 1);
        this.player2 = new Player(this, { ...this.player2Profile, start_x: 824 }, 2);
    }

    preload() {
        this.load.image('title', '../assets/title.png');
        this.load.image('background', this.player1Profile.backgroud);
        this.load.audio('audioFarm', ['../assets/Farm effect mp3.mp3']);

        this.player1.preload();
        this.player2.preload();
    }

    create() {
        this.initalBox = this.add.rectangle(512, 330, 1024, 660, 0x0000);
        this.initalBox.setAlpha(0.5);
        this.title = this.add.image(this.cameras.main.centerX, 250, 'title').setScale(0.5);
        this.headerGroup = this.add.group();
        this.player1HealthBack = this.add.rectangle(220, 80, 400, 30,0xFF5733);
        this.player2HealthBack = this.add.rectangle(804, 80, 400, 30,0xFF5733);
        this.player1Health = this.add.rectangle(220, 80, 400, 30,0x068928 );
        this.player2Health = this.add.rectangle(804, 80, 400, 30,0x068928 );
        this.player1Name = this.add.text(23, 38, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        });
        this.player2Name = this.add.text(607, 38, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        });

        this.headerGroup.addMultiple([this.player1Health, this.player2Health, this.player1HealthBack, this.player2HealthBack, this.player1Name, this.player2Name]);
        this.headerGroup.setVisible(false);
        this.add.image(512, 200, 'background');
        this.musicFarm = this.sound.add('audioFarm', {
            loop: true
        });
        this.sound.pauseOnBlur = true;

        this.startButton = this.add.text(this.cameras.main.centerX, 500, 'Start', {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            backgroundColor: '#8B4513',
            padding: {
                x: 20,
                y: 10
            },
            borderRadius: 10
        }).setOrigin(0.5).setInteractive();

        this.startButton.on('pointerdown', () => {
            if (!this.gameStarted && !this.gameOver) {
                this.startGame();
            } else if (this.gameOver) {
                this.restartGame();
            }
        });

        this.timeLeft = this.timerTime;
        this.timerText = this.add.text(this.cameras.main.centerX, 80, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);
        // this.player1.create();
        // this.player2.create();
        

    }

    update() {
        if(this.gameStarted){
            this.player1.update();
            this.player2.update();
        }
    }

    handlePlayer1HittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);

        this.player1.hittedSound.play();

        if (!this.player1.isDefending) {
            this.player1.lifeHealth -= 5;
            var xAxis = 20 + 2 * this.player1.lifeHealth;
            var size = 4 * this.player1.lifeHealth;
            this.player1Health.setSize(size, 30);
            this.player1Health.setPosition(xAxis, 80);
        }
        console.log('Player 1: ', this.player1.lifeHealth);
    }

    handlePlayer2HittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);

        if (!this.player2.isDefending) {
            this.player2.lifeHealth -= 5;
            var xAxis = 1004 - 2 * this.player2.lifeHealth;
            var size = 4 * this.player2.lifeHealth;
            this.player2Health.setSize(size, 30);
            this.player2Health.setPosition(xAxis, 80);
        }
        console.log('Player 2: ', this.player2.lifeHealth);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    startGame() {
        this.initalBox.setVisible(false);
        this.title.setVisible(false);
        this.player1Health.setSize(400, 30);
        this.player1Health.setPosition(220, 80);
        this.player2Health.setSize(400, 30);
        this.player2Health.setPosition(804, 80);
        this.headerGroup.setVisible(true);
        this.gameStarted = true;
        this.musicFarm.play();
        this.startButton.setVisible(false);
        this.player1.create();
        this.player2.create();
        this.player1Name.setText(this.player1.config.name);
        this.player2Name.setText(this.player2.config.name);
        this.physics.add.collider(this.player1.player, this.player2.player);
        this.physics.add.overlap(this.player2.specialAttacks, this.player1.player, this.handlePlayer1HittedBySpecialAttack, null, this);
        this.physics.add.overlap(this.player1.specialAttacks, this.player2.player, this.handlePlayer2HittedBySpecialAttack, null, this);

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
            paused: false
        });
        this.timerText.setVisible(true);
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`Time left: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.headerGroup.setVisible(false);
        this.timerText.setVisible(false);
        this.timer.paused = true;
        this.musicFarm.stop();
        this.initalBox.setVisible(true);
        this.title.setVisible(true);
        this.startButton.setText('Play Again');
        this.startButton.on('pointerdown', () => {
        if (!this.gameStarted && !this.gameOver) {
            this.startGame();
        } else if (this.gameOver) {
            this.restartGame();
        }
    });

        this.startButton.setVisible(true);
        this.gameStarted = false;
        this.gameOver = true;

        this.fadeOutCharacters();
    }

    fadeOutCharacters() {
        if (this.player1.player.body.enable) {this.tweens.add({
            targets: [this.player1.player, this.player2.player],
            alpha: 0,
            duration: 2000,
            onComplete: () => {
                this.player1.player.disableBody(true, true);
                this.player2.player.disableBody(true, true);
            }
        });
    }
        
    }


    restartGame() {
        this.timeLeft = this.timerTime;
        this.timerText.setText('');
        this.gameOver = false;
        this.player1.player.alpha = 1;
        this.player2.player.alpha = 1;
    
        if (!this.gameStarted) {
            this.startButton.setVisible(true);
        }
    
        this.startGame();
    }

}


