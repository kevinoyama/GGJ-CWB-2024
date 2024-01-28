import Phaser from 'phaser';

import Player from '../Players/Player';

export default class MainScene extends Phaser.Scene {
    
    constructor() {
        super();
        this.counter = 0;
        this.counter2 = 0;
        this.life = 3;

        this.player1 = new Player(this, {
            name: 'capy',
            spritesheet: '../assets/capysprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            start_x: 200,
            start_y: 400
        }, 1);

        this.player2 = new Player(this, {
            name: 'pizza',
            spritesheet: '../assets/pizzasprite.png',
            attack_audio: '../assets/Golpe aplicado capivara.m4a',
            start_x: 600,
            start_y: 400
        }, 2);


    }

    preload() {
        this.load.image('bed', '../assets/Capybaras_3.jpg');
        this.load.image('pillowSpecialAttack', '../assets/sprite_31.png');
        this.load.audio('audioFarm', ['../assets/Farm effect mp3.mp3']);

        this.player1.preload();
        this.player2.preload();
    }

    create() {
        this.add.image(512, 200, 'bed');
        // this.physics.add.collider(this.Pizza.player, this.Capy.player);
        this.musicFarm = this.sound.add('audioFarm',{
            loop: true
        });
        this.musicFarm.play();
        this.sound.pauseOnBlur = true;
        
        this.player1.create();
        this.player2.create();
    }

    update() {

        this.player1.update();
        this.player2.update();
    }

}


