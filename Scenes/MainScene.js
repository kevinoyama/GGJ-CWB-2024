import Phaser from 'phaser';

import Player from '../Players/Player';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;
        this.configProfiles = [{
            name: 'capy',
            spritesheet: '../assets/capysprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            special_attack_image: '../assets/sprite_31.png',
            start_y: 400,
            defend_frame_start: 20 ,
            defend_frame_end: 22
        }, {
            name: 'pizza',
            spritesheet: '../assets/pizzasprite.png',
            attack_audio: '../assets/Golpe aplicado pizza.m4a',
            special_attack_image: '../assets/sprite_31.png',
            start_y: 400,
            defend_frame_start: 20 ,
            defend_frame_end: 23
        },{
            name: 'pillow',
            spritesheet: '../assets/Pillowsprite.png',
            attack_audio: '../assets/Golpe tomado travesseiro.m4a',
            // start_x: 600,
            start_y: 400,
            special_attack_image: '../assets/sprite_31.png',
            defend_frame_start: 20 ,
            defend_frame_end: 23
        }];

        this.player1ProfileNumber = this.getRandomInt(3);
        this.player2ProfileNumber = this.player1ProfileNumber;
        while(this.player2ProfileNumber == this.player1ProfileNumber){
            this.player2ProfileNumber = this.getRandomInt(3);
        }
        this.player1Profile = this.configProfiles[this.player1ProfileNumber];
        this.player2Profile = this.configProfiles[this.player2ProfileNumber];
        this.player1 = new Player(this, {...this.player1Profile, start_x:  200} , 1);
        this.player2 = new Player(this, {...this.player2Profile, start_x:  824}  , 2);
    }

    preload() {
        this.load.image('bed', '../assets/Capybaras_3.jpg');
        this.load.audio('audioFarm', ['../assets/Farm effect mp3.mp3']);

        this.player1.preload();
        this.player2.preload();
    }

    create() {
        this.add.image(512, 200, 'bed');
        // this.physics.add.collider(this.Pizza.player, this.Capy.player);
        this.musicFarm = this.sound.add('audioFarm', {
            loop: true
        });
        //this.musicFarm.play();
        this.sound.pauseOnBlur = true;

        this.player1.create();
        this.player2.create();
        this.physics.add.overlap(this.player2.specialAttacks, this.player1.player, this.handlePlayer1HittedBySpecialAttack, null, this);
        this.physics.add.overlap(this.player1.specialAttacks, this.player2.player, this.handlePlayer2HittedBySpecialAttack, null, this);

    }

    update() {

        this.player1.update();
        this.player2.update();
    }

    handlePlayer1HittedBySpecialAttack(player, attack) {
        attack.disableBody(true, true);

        if (!this.player1.isDefending) {
            this.player1.lifeHealth -= 5;
        }
        console.log('Player 1: ',this.player1.lifeHealth);
    }

    handlePlayer2HittedBySpecialAttack( player, attack) {
       attack.disableBody(true, true);

        if (!this.player2.isDefending) {
            this.player2.lifeHealth -= 5;
        }
        console.log('Player 2: ', this.player2.lifeHealth);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

}


