import Phaser from 'phaser';

import Player from '../Players/Player';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
        this.timerTime = 90;
        this.configProfiles = [{
            name: 'Capy',
            spritesheet: '../assets/capysprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            hitted_audio: '../assets/Golpe tomado Capivara.m4a',
            backgroud: '../assets/Capybaras_3.jpg',
            special_attack_image: '../assets/Pinhao.png',
            start_y: 400,
            defend_frame_start: 20,
            defend_frame_end: 22,
            attack_frame_start: 27,
            attack_frame_end: 30
        }, {
            name: 'Pizza',
            spritesheet: '../assets/pizzasprite.png',
            attack_audio: '../assets/Golpe aplicado pizza.m4a',
            hitted_audio: '../assets/Golpe tomado pizza.m4a',
            backgroud: '../assets/pizza_background.jpg',
            special_attack_image: '../assets/Calabresa.png',
            start_y: 400,
            defend_frame_start: 20,
            defend_frame_end: 23,
            attack_frame_start: 27,
            attack_frame_end: 28
        }, {
            name: 'Pillow',
            spritesheet: '../assets/Pillowsprite.png',
            attack_audio: '../assets/Golpe tomado travesseiro.m4a',
            hitted_audio: '../assets/Golpe tomado travesseiro.m4a',
            backgroud: '../assets/pillow_background.jpg',
            start_y: 400,
            special_attack_image: '../assets/pillow-projectile.png',
            defend_frame_start: 20,
            defend_frame_end: 23,
            attack_frame_start: 27,
            attack_frame_end: 28
        }];

        this.player1ProfileNumber = this.getRandomInt(3);
        this.player2ProfileNumber = this.player1ProfileNumber;
        while (this.player2ProfileNumber == this.player1ProfileNumber) {
            this.player2ProfileNumber = this.getRandomInt(3);
        }
        // TODO create a simple menu - be able to choose a figther.
        this.player1Profile = this.configProfiles[this.player1ProfileNumber];
        //this.player1Profile = this.configProfiles[1];
        this.player2Profile = this.configProfiles[this.player2ProfileNumber];
        this.player1 = new Player(this, { ...this.player1Profile, start_x: 200 }, 1);
        this.player2 = new Player(this, { ...this.player2Profile, start_x: 824 }, 2);
        this.gameStarted = false;
        this.gameOver = false;
    }

    preload() {
        this.load.image('title', '../assets/title.png');
        this.load.image('background', this.player1Profile.backgroud);
        this.load.audio('audioBack', ['../assets/2.secret_level_1.mp3']);
        this.load.audio('audioWon', ['../assets/Medieval_Cheers.mp3']);

        this.player1.preload();
        this.player2.preload();
    }

    create() {
        this.add.image(512, 200, 'background');
        this.initalBox = this.add.rectangle(512, 330, 1024, 660, 0x0000);
        this.initalBox.setAlpha(0.5);
        this.title = this.add.image(this.cameras.main.centerX, 250, 'title').setScale(0.5);
        this.headerGroup = this.add.group();
        this.player1HealthBack = this.add.rectangle(220, 80, 400, 30, 0xFF5733);
        this.player2HealthBack = this.add.rectangle(804, 80, 400, 30, 0xFF5733);
        this.player1Health = this.add.rectangle(220, 80, 400, 30, 0x068928);
        this.player2Health = this.add.rectangle(804, 80, 400, 30, 0x068928);
        this.player1Name = this.add.text(23, 38, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000',
            fontWeight: 800,
            backgroundColor: '#FFF',
            padding: {
                x: 20
            },
            borderRadius: 10
        });
        this.player2Name = this.add.text(607, 38, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000',
            fontWeight: 800,
            backgroundColor: '#FFF',
            padding: {
                x: 20
            },
            borderRadius: 10
        });

        this.headerGroup.addMultiple([this.player1Health, this.player2Health, this.player1HealthBack, this.player2HealthBack, this.player1Name, this.player2Name]);
        this.headerGroup.setVisible(false);
        this.musicBack = this.sound.add('audioBack', {
            loop: true
        });
        this.musicWon = this.sound.add('audioWon');
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

        this.GameWonTitle = this.add.text(this.cameras.main.centerX - 10, 330, 'Player 1 won', {
            fontFamily: 'Arial',
            fontSize: 64,
            color: '#ffffff',
            padding: {
                x: 20,
                y: 10
            },
            borderRadius: 10
        }).setOrigin(0.5);

        this.GameWonTitle.setVisible(false);

        this.startButton.on('pointerdown', () => {
            if (!this.gameStarted && !this.gameOver) {
                this.startGame();
            } else if (this.gameOver) {
                this.restartGame();
            }
        });

        this.timeLeft = this.timerTime;
        this.timerText = this.add.text(this.cameras.main.centerX, 80, 'Timer left: 90', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000',
            fontWeight: 800,
            backgroundColor: '#FFF',
            padding: {
                x: 5,
                y: 5
            },
            borderRadius: 10
        }).setOrigin(0.5);
        this.timerText.setVisible(false);
        // this.player1.create();
        // this.player2.create();


    }

    update() {
        if (this.gameStarted) {
            this.player1.update();
            this.player2.update();
        }
    }

    handlePlayer1HittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);

        this.player1.hittedSound.play();

        if (!this.player1.isDefending && !this.gameOver) {
            this.player1.lifeHealth -= 15;
            var xAxis = 20 + 2 * this.player1.lifeHealth;
            var size = 4 * this.player1.lifeHealth;
            this.player1Health.setSize(size, 30);
            this.player1Health.setPosition(xAxis, 80);
            if (this.player1.lifeHealth <= 0) {
                this.endGame();
            }
        }
        console.log('Player 1: ', this.player1.lifeHealth);
    }

    handlePlayer2HittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);

        if (!this.player2.isDefending && !this.gameOver) {
            this.player2.lifeHealth -= 15;
            var xAxis = 1004 - 2 * this.player2.lifeHealth;
            var size = 4 * this.player2.lifeHealth;
            this.player2Health.setSize(size, 30);
            this.player2Health.setPosition(xAxis, 80);
            if (this.player2.lifeHealth <= 0) {
                this.endGame();
            }
        }
        console.log('Player 2: ', this.player2.lifeHealth);
    }

    handleNormalAttackP1() {
        if (!this.player2.isDefending && !this.gameOver && this.player1.isAttacking) {
            this.player2.lifeHealth -= 0.5;
            var xAxis = 1004 - 2 * this.player2.lifeHealth;
            var size = 4 * this.player2.lifeHealth;
            this.player2Health.setSize(size, 30);
            this.player2Health.setPosition(xAxis, 80);
            if (this.player2.lifeHealth <= 0) {
                this.endGame();
            }
        }
        console.log('Player 2: ', this.player2.lifeHealth);
 
  }
     handleNormalAttackP2() {
        if (!this.player1.isDefending && !this.gameOver && this.player2.isAttacking) {
            this.player1.lifeHealth -= 0.5;
            var xAxis = 20 + 2 * this.player1.lifeHealth;
            var size = 4 * this.player1.lifeHealth;
            this.player1Health.setSize(size, 30);
            this.player1Health.setPosition(xAxis, 80);
            if (this.player1.lifeHealth <= 0) {
                this.endGame();
            }
        }
        console.log('Player 1: ', this.player1.lifeHealth);
 
  }
 
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    startGame() {
        this.player1.lifeHealth = 100;
        this.player2.lifeHealth = 100;

        this.GameWonTitle.setVisible(false);
        this.initalBox.setVisible(false);
        this.title.setVisible(false);
        // health bars
        this.player1Health.setSize(400, 30);
        this.player1Health.setPosition(220, 80);
        this.player2Health.setSize(400, 30);
        this.player2Health.setPosition(804, 80);

        this.headerGroup.setVisible(true);
        this.gameStarted = true;
        this.musicBack.play();
        this.startButton.setVisible(false);

        // create players
        this.player1.create();
        this.player2.create();
        this.player1Name.setText(this.player1.config.name);
        this.player2Name.setText(this.player2.config.name);

        // TODO not working players collider check
        this.physics.add.collider(this.player1.player, this.player2.player);
        
        // check if special attack was successful for both players
        this.physics.add.overlap(this.player2.specialAttacks, this.player1.player, this.handlePlayer1HittedBySpecialAttack, null, this);
        this.physics.add.overlap(this.player1.specialAttacks, this.player2.player, this.handlePlayer2HittedBySpecialAttack, null, this);
        
        // check if normal attack was successful for both players

        this.physics.add.overlap(this.player1.player, this.player2.player, this.handleNormalAttackP1, null, this);
        this.physics.add.overlap(this.player2.player, this.player1.player, this.handleNormalAttackP2, null, this);
     //   this.physics.add.overlap(this.player1.specialAttacks, this.player2.player, this.handlePlayer2HittedBySpecialAttack, null, this);


        this.timerText.setVisible(true);
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
        this.musicBack.stop();
        this.initalBox.setVisible(true);
        this.GameWonTitle.setVisible(true);
        var wonTitle = 'It was a tie!';
        if (this.player1.lifeHealth < this.player2.lifeHealth) {
            wonTitle = this.player2.config.name.trim() + ' Won!'
        } else if (this.player1.lifeHealth > this.player2.lifeHealth) {
            wonTitle = this.player1.config.name.trim() + ' Won!'
        }
        this.GameWonTitle.setText(wonTitle);
        this.musicWon.play();
        this.GameWonTitle.setVisible(true);
        // this.title.setVisible(true);
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
        if (this.player1.player.body.enable) {
            this.tweens.add({
                targets: [this.player1.player, this.player2.player],
                alpha: 0,
                duration: 50,
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


